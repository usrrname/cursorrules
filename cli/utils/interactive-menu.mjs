import { readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { styleText } from 'node:util';
/**
 * Finds all rules in category and prepares them for display in menu
 * @param {Record<string, Array<{name: string, path: string, fullPath: string}>>} rules
 */
export const prepareMenu = (rules) => {
    /** @type {Array<{category: "standards" | "test" | "utils", displayName: string, selected: boolean, name: string, path: string, fullPath: string}>} */
    let allRules = [];
    // Flatten all rules for display in interactive mode
    for (const [category, categoryRules] of Object.entries(rules)) {
        for (const rule of categoryRules) {
            allRules.push({
                name: rule.name,
                path: rule.path,
                fullPath: rule.fullPath,
                category: /** @type {"standards" | "test" | "utils"} */ (category),
                displayName: `[${category}] ${rule.name}`,
                selected: false
            });
        }
    }
    return allRules;
}

/**
 * Utility to render a menu with highlighting and indicators
 * @param {Object} opts
 * @param {string} opts.title - Menu title
 * @param {string[]} opts.items - Array of item display strings
 * @param {number} opts.currentIndex - Index of currently highlighted item
 * @param {string[]} [opts.footerLines] - Array of footer lines
 */
export const createMenu = ({ title, items, currentIndex, footerLines = [] }) => {
    process.stdout.write('\x1B[2J\x1B[0f');
    if (title) {
        console.info(styleText("white", title));
        console.info(styleText("white", '='.repeat(title.length) + '\n'));
    }
    items.forEach((item, idx) => {
        const isCurrent = idx === currentIndex;
        const indicator = isCurrent ? '▶ ' : '  ';
        const highlight = isCurrent ? styleText(['bold', 'black', 'bgWhite'], '\x1B[7m') : '';
        const reset = '\x1B[0m';
        console.info(`${highlight}${indicator}${item}${reset}`);
    });
    if (footerLines.length) {
        footerLines.forEach(line => console.info(line));
    }
}

/**
 * Utility to render a menu with highlighting and indicators
 * @param {string[]} categories
 * @param {number} currentIndex
 */
const renderCategoryMenu = (categories, currentIndex) => {
    const items = categories.concat(['🌈 Save Rules']);
    createMenu({
        title: 'Select rules by category',
        items,
        currentIndex,
        footerLines: [
            '\n↑↓ - Navigate | ⏎ Enter - Select | Esc - Cancel'
        ]
    });
}

/**
 * Utility to set up interactive input for a menu
 * @param {function(string):void} handleKeyPress
 */
export const setupInput = (handleKeyPress) => {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', handleKeyPress);
}

/**
 * Utility to unmount interactive input
 * @param {function(string):void} handleKeyPress
 */
const unmountInput = (handleKeyPress) => {
    process.stdin.setRawMode(false);
    process.stdin.pause();
    process.stdin.removeListener('data', handleKeyPress);
}
/**
 * Interactive category selection
 * @param {Record<string, Array<{name: string, path: string, fullPath: string}>>} rules
 * @returns {Promise<string|null>} Selected category or null if cancelled
 */
export const interactiveCategorySelection = async (rules) => {
    const categories = Object.keys(rules).filter(cat => rules[cat].length > 0);
    if (categories.length === 0) {
        console.log('❌ No rule categories found');
        return null;
    }
    let currentIndex = 0;
    return new Promise((resolve) => {

        /**
         * @param {*} key 
         */
        const handleKeyPress = (key /** @type {string} */) => {
            switch (key) {
                case '\u0003': // Ctrl+C
                case '\u001b': // Escape
                case '\u001b[D': // Left Arrow
                    unmountInput(handleKeyPress);
                    process.stdin.removeListener('data', handleKeyPress);
                    console.log('\n❌ Category selection cancelled');
                    currentIndex = currentIndex;
                    resolve(null);
                    break;
                case '\r': // Enter
                case '\n':
                    unmountInput(handleKeyPress);
                    process.stdin.removeListener('data', handleKeyPress);
                    if (currentIndex === categories.length) {
                        // Finish selection
                        resolve('FINISH');
                    } else {
                        resolve(categories[currentIndex]);
                    }
                    break;
                case '\u001b[A': // Up arrow
                    if (currentIndex > 0) {
                        currentIndex--;
                        renderCategoryMenu(categories, currentIndex);
                    }
                    break;
                case '\u001b[B': // Down arrow
                    if (currentIndex < categories.length) {
                        currentIndex++;
                        renderCategoryMenu(categories, currentIndex);
                    }
                    break;
            }
        };

        setupInput(handleKeyPress);
        renderCategoryMenu(categories, currentIndex);
    });
};

/** 
 * Render rule selection menu for a category
 * @param {Array<{category: string, displayName: string, selected: boolean, name: string, path: string, fullPath: string}>} allRules
 * @param {number} currentIndex
 * @param {number} selectedCount
 */
const renderMenu = (allRules, currentIndex, selectedCount) => {
    const items = allRules.map(rule => {
        const checkbox = rule.selected ? '☑' : '☐';
        return `${checkbox} ${rule.displayName}`;
    });
    createMenu({
        title: `🎯 [${allRules[0]?.category}] Rule Selection Mode ✨`,
        items,
        currentIndex,
        footerLines: [
            `\n☑️ Selected: ${selectedCount}/${allRules.length} rules`,
            '\n↑↓ - Navigate | Space - Toggle selection | ⏎ Enter - Confirm | Esc - Go Back'
        ]
    });
};


/**
 * Enable rule selection inside a category of rules
 * @param {Array<{category: string, displayName: string, selected: boolean, name: string, path: string, fullPath: string}>} rulesInCategory
 * @returns {Promise<Array<{category: string, displayName: string, selected: boolean, name: string, path: string, fullPath: string}>>}
 */
export const selectRules = async (rulesInCategory) => {
    let allRules = rulesInCategory;
    let currentIndex = 0;
    let selectedCount = allRules.filter(r => r.selected).length;

    let skipMenu = false;
    /** @param {function(Array<{category: string, displayName: string, selected: boolean, name: string, path: string, fullPath: string}>?): void} resolve */
    return new Promise((resolve) => {
        /** @param key {string} */
        const handleKeyPress = (key) => {
            if (skipMenu) return;
            switch (key) {
                case '\u0003': // Ctrl+C
                case '\u001b': // Escape
                    unmountInput(handleKeyPress);
                    // Return current state (persist selections)
                    resolve(allRules);
                    break;
                case '\r': // Enter
                case '\n':
                    skipMenu = true;
                    unmountInput(handleKeyPress);
                    resolve(allRules);
                    break;
                case ' ':
                    const currentRule = allRules[currentIndex];
                    if (currentRule) {
                        currentRule.selected = !currentRule.selected;
                        selectedCount += currentRule.selected ? 1 : -1;
                        renderMenu(allRules, currentIndex, selectedCount);
                    }
                    break;
                case '\u001b[A': // Up arrow
                    if (currentIndex > 0) {
                        currentIndex--;
                        renderMenu(allRules, currentIndex, selectedCount);
                    }
                    break;
                case '\u001b[B': // Down arrow
                    if (currentIndex < allRules.length - 1) {
                        currentIndex++;
                        renderMenu(allRules, currentIndex, selectedCount);
                    }
                    break;
            }
        };

        setupInput(handleKeyPress);
        renderMenu(allRules, currentIndex, selectedCount);
    });
};

/**
 * Scan available rules from standards and test directories
 * @param {string} rulesBasePath
 * @returns {Promise<Record<string, Array<{name: string, path: string, fullPath: string}>>>} Object with categorized rules
 */
export const scanAvailableRules = async (rulesBasePath) => {

    const categories = ['standards', 'test', 'utils'];
    /** @type {Record<string, Array<{name: string, path: string, fullPath: string}>>} */
    let rules = {}

    for (const category of categories) {
        const categoryPath = resolve(rulesBasePath, category);
        try {
            const files = await readdirSync(categoryPath, { withFileTypes: true });
            rules[category] = files
                .filter(file => file.isFile() && file.name.endsWith('.mdc'))
                .map(file => ({
                    name: file.name.replace('.mdc', ''),
                    path: join(category, file.name),
                    fullPath: resolve(categoryPath, file.name)
                }));
        } catch (err) {
            rules[category] = [];
        }
    }

    return rules;
};