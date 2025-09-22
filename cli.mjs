#!/usr/bin/env node
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as url from 'node:url';
import { parseArgs } from 'node:util';

export const projectRoot = process.cwd()
export const baseFolder = '.cursor/';

const packageJson = JSON.parse(
  await fs.readFile(
    url.fileURLToPath(url.resolve(import.meta.url, 'package.json')),
    'utf-8',
  )
);

/** 
 * CLI options @type {import('node:util').ParseArgsConfig}
 */
const config = {
  args: process.argv.slice(2),
  tokens: true,
  options: {
    flat: {
      type: 'boolean',
      short: 'f',
    },
    help: {
      type: 'boolean',
      short: 'h',
      default: false,
    },
    interactive: {
      type: 'boolean',
      short: 'i',
      default: false,
    },
    output: {
      type: 'string',
      short: 'o',
    },
    version: {
      type: 'boolean',
      short: 'v',
    },
  },
}

const help = () => {
  const repository = packageJson.repository.url.replace('git+', '').replace('.git', '');
  const version = packageJson.version;
  console.info(`
╔══════════════════════════════════════╗
║  @usrrname/cursorrules v${version}   ║
╚══════════════════════════════════════╝
A standard library of Cursor Rules ...with otaku vibes (✿ᴗ͈ˬᴗ͈)⁾⁾

Usage:
=======================================
npx @usrrname/cursorrules [options]

Options:
-f, --flat: Install without parent directory
-h, --help: Help instructions <----- You are here
-i, --interactive: Interactive rule selection mode
-o, --output: Set output directory (Default: .cursor/)
-v, --version: Show package version

${repository}
`);
}

const version = () => console.log(`${packageJson.name} v${packageJson.version}`);

/**
 * Scan available rules from standards and test directories
 * @returns {Promise<Record<string, Array<{name: string, path: string, fullPath: string}>>>} Object with categorized rules
 */
const scanAvailableRules = async () => {
  const rulesPath = url.fileURLToPath(url.resolve(import.meta.url, baseFolder + 'rules'));

  const categories = ['standards', 'test', 'utils'];
  /** @type {Record<string, Array<{name: string, path: string, fullPath: string}>>} */
  let rules = {}

  for (const category of categories) {
    const categoryPath = path.join(rulesPath, category);
    try {
      const files = await fs.readdir(categoryPath);
      rules[category] = files
        .filter(file => file.endsWith('.mdc'))
        .map(file => ({
          name: file.replace('.mdc', ''),
          path: path.join(category, file),
          fullPath: path.join(categoryPath, file)
        }));
    } catch (err) {
      rules[category] = [];
    }
  }

  return rules;
};

/**
 * Finds all rules in category and prepares them for display in menu
 * @param  {Object} rules - Available rules by category
 * @returns {Array<{
 *    category: 'standards' | 'utils' | 'test'
 *    displayName: string
 *    selected: boolean
 * }>}
 */
/**
 * @param {Record<string, Array<{name: string, path: string, fullPath: string}>>} rules
 * @returns {Array<{category: "standards" | "test" | "utils", displayName: string, selected: boolean, name: string, path: string, fullPath: string}>}
 */
const prepareMenu = (rules) => {
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
function createMenu({ title, items, currentIndex, footerLines = [] }) {
  process.stdout.write('\x1B[2J\x1B[0f');
  if (title) {
    console.log(title);
    console.log('='.repeat(title.length) + '\n');
  }
  items.forEach((item, idx) => {
    const isCurrent = idx === currentIndex;
    const indicator = isCurrent ? '▶ ' : '  ';
    const highlight = isCurrent ? '\x1B[7m' : '';
    const reset = '\x1B[0m';
    console.log(`${highlight}${indicator}${item}${reset}`);
  });
  if (footerLines.length) {
    footerLines.forEach(line => console.log(line));
  }
}

/**
 * Utility to set up interactive input for a menu
 * @param {function(string):void} handleKeyPress
 */
function setupInput(handleKeyPress) {
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', handleKeyPress);
}

/**
 * Interactive category selection
 * @param {Record<string, Array<{name: string, path: string, fullPath: string}>>} rules
 * @returns {Promise<string|null>} Selected category or null if cancelled
 */
const interactiveCategorySelection = async (rules) => {
  const categories = Object.keys(rules).filter(cat => rules[cat].length > 0);
  if (categories.length === 0) {
    console.log('❌ No rule categories found');
    return null;
  }
  let currentIndex = 0;

  return new Promise((resolve) => {
    const renderMenu = () => {
      const items = categories.concat(['🌈 Save Rules']);
      createMenu({
        title: '⌨ Select rules by category',
        items,
        currentIndex,
        footerLines: [
          '\n↑↓ - Navigate | Enter ⏎ - Select | Esc - Cancel'
        ]
      });
    };

    /**
     * @param {*} key 
     */
    const handleKeyPress = (key) => {
      switch (key) {
        case '\u0003': // Ctrl+C
        case '\u001b': // Escape
        case '\u001b[D': // Left Arrow
          process.stdin.setRawMode(false);
          process.stdin.pause();
          process.stdin.removeListener('data', handleKeyPress);
          console.log('\n❌ Category selection cancelled');
          resolve(null);
          break;
        case '\r': // Enter
        case '\n':
          process.stdin.setRawMode(false);
          process.stdin.pause();
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
            renderMenu();
          }
          break;
        case '\u001b[B': // Down arrow
          if (currentIndex < categories.length) {
            currentIndex++;
            renderMenu();
          }
          break;
      }
    };

    setupInput(handleKeyPress);
    renderMenu();
  });
};

/**
 * Displays menu containing rules in a category
 * @param {Array<{category: string, displayName: string, selected: boolean, name: string, path: string, fullPath: string}>} rulesInCategory
 * @returns {Promise<Array<{category: string, displayName: string, selected: boolean, name: string, path: string, fullPath: string}>>}
 */
const selectRules = async (rulesInCategory) => {
  let allRules = rulesInCategory;
  let currentIndex = 0;
  let selectedCount = allRules.filter(r => r.selected).length;

  const renderMenu = () => {
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
        '\n↑↓ - Navigate | Space - Toggle selection | Enter - Confirm | Esc - Go Back'
      ]
    });
  };

  let skipMenu = false;

  return new Promise((resolve) => {
    /** @param key {string} */
    const handleKeyPress = (key) => {
      if (skipMenu) return;
      switch (key) {
        case '\u0003': // Ctrl+C
        case '\u001b': // Escape
          if (process.stdin.isTTY) {
            process.stdin.setRawMode(false);
          }
          process.stdin.pause();
          process.stdin.removeListener('data', handleKeyPress);
          // Return current state (persist selections)
          resolve(allRules);
          break;
        case '\r': // Enter
        case '\n':
          skipMenu = true;
          if (process.stdin.isTTY) {
            process.stdin.setRawMode(false);
          }
          process.stdin.pause();
          process.stdin.removeListener('data', handleKeyPress);
          resolve(allRules);
          break;
        case ' ':
          const currentRule = allRules[currentIndex];
          if (currentRule) {
            currentRule.selected = !currentRule.selected;
            selectedCount += currentRule.selected ? 1 : -1;
            renderMenu();
          }
          break;
        case '\u001b[A': // Up arrow
          if (currentIndex > 0) {
            currentIndex--;
            renderMenu();
          }
          break;
        case '\u001b[B': // Down arrow
          if (currentIndex < allRules.length - 1) {
            currentIndex++;
            renderMenu();
          }
          break;
      }
    };

    setupInput(handleKeyPress);
    renderMenu();
  });
};
/**
 * Security: validate output directory name
 * - Allows leading Windows drive letters (e.g., C:\ or D:/)
 * - Forbids ':' in any subsequent segment
 * - Splits on both '/' and '\' so Windows paths validate cross-platform
 * @param outputDir {string}
 */
const validateDirname = (outputDir) => {
  const attemptedPath = outputDir;
  if (outputDir.startsWith('=')) outputDir = outputDir.split('=')[1].trim();

  // Detect Windows drive prefix (e.g., C:\ or D:/)
  const hasWindowsDrivePrefix = /^[A-Za-z]:[\\/]/.test(outputDir);

  // Split on both Windows and POSIX separators
  const segments = outputDir.split(/[\\/]+/);

  // Forbidden characters in a segment (colon handled separately)
  const forbiddenChars = /[<>\"\\|?*@{}!\x00-\x1F]/g;

  segments.forEach((segment, idx) => {
    if (!segment) return;

    if (segment.includes('..')) {
      console.error(`❌ ERROR: Output directory contains invalid characters in segment '${segment}'.\nAttempted path: ${attemptedPath}`);
      process.exit(1);
    }

    // Allow drive letter only in the first segment if present on a windows env
    if (idx === 0 && hasWindowsDrivePrefix) {
      if (!/^[A-Za-z]:$/.test(segment)) {
        console.error(`❌ ERROR: Invalid Windows drive segment '${segment}'. Expected like 'C:'.\nAttempted path: ${attemptedPath}`);
        process.exit(1);
      }
      return; // skip further checks on the drive segment
    }

    if (segment.includes(':') || forbiddenChars.test(segment)) {
      console.error(`❌ ERROR: Output directory contains invalid characters in segment ${segment}.\nAttempted path: ${attemptedPath}`);
      process.exit(1);
    }
  });

  // Resolve using Node's path; this preserves absolute inputs correctly
  const resolvedOutputDir = path.resolve(projectRoot, outputDir);
  const normalizedOutputDir = path.normalize(resolvedOutputDir);

  // Ensure path remains within project root
  if (!normalizedOutputDir.startsWith(projectRoot + path.sep) && normalizedOutputDir !== projectRoot) {
    console.error(`❌ ERROR: Output directory path is invalid.`);
    process.exit(1);
  }

  return url.fileURLToPath(url.pathToFileURL(normalizedOutputDir));
}

/**
 * @param {string} dirname - output folder relative path
 */
const downloadFiles = async (dirname) => {
  if (!dirname) throw new Error('Output directory is required');

  console.info('📥 Downloading all rules...');

  const outputDir = validateDirname(dirname);

  try {
    // copy whole folder
    await fs.cp(
      url.fileURLToPath(url.resolve(import.meta.url, baseFolder)),
      outputDir,
      { recursive: true },
    )
    console.log(`✅ Success! All rules saved to ${outputDir}`);
  } catch (err) {
    console.error(`❌ Error: ${err.message}`, err);
    process.exit(1);
  }
}

/**
 * Download selected rules only
 * @param {string} folderName - output folder relative path
 * @param {Array<{category: string, displayName: string, selected: boolean, name: string, path: string, fullPath: string}>} selectedRules - Array of selected rule objects
 */
const downloadSelectedFiles = async (folderName, selectedRules) => {
  if (!folderName) throw new Error('Output directory is required');

  if (!selectedRules || selectedRules.length === 0) {
    console.log('⏭️  No rules selected, skipping download');
    await help();
    return;
  }

  console.info('📥 Downloading selected rules...');

  const outputDir = validateDirname(folderName)
  const sourceRulesPath = url.fileURLToPath(url.resolve(import.meta.url, baseFolder + 'rules'));

  try {
    // Create output directory structure
    await fs.mkdir(outputDir, { recursive: true });
    await fs.mkdir(path.join(outputDir, 'rules'), { recursive: true });

    // Copy selected rules
    for (const rule of selectedRules) {
      const sourcePath = path.join(sourceRulesPath, rule.path);
      const destPath = path.join(outputDir, 'rules', rule.path);
      const destDir = path.dirname(destPath);

      // Ensure destination directory exists
      await fs.mkdir(destDir, { recursive: true });

      // Copy the rule file
      await fs.copyFile(sourcePath, destPath);
      console.log(`  📄 Copied: ${rule.displayName}`);
    }

    console.log(`\n🎉 Success! ${selectedRules.length} selected rules saved to ${outputDir}`);
  } catch (err) {
    console.error(`❌ Error: ${err.message}`, err);
    process.exit(1);
  }
}

async function main() {
  console.log("🚀 Loading @usrrname/cursorrules ...");

  const { values } = parseArgs(config);

  const allowedKeys = ['flat', 'output']

  for (let key in values) {

    if (!allowedKeys.includes(key) && !values[key]) continue;

    switch (key) {
      case 'version':
        await version();
        break;
      case 'help':
        await help();
        break;
      case 'interactive':
        console.log('🎯 Starting interactive mode...');
        const rules = await scanAvailableRules();
        // Prepare persistent selection state for each category
        const categories = Object.keys(rules).filter(cat => rules[cat].length > 0);

        /** @type {Record<string, Array<{category: string, displayName: string, selected: boolean, name: string, path: string, fullPath: string}>>} */
        let persistentSelections = {};
        for (const cat of categories) {
          persistentSelections[cat] = prepareMenu({ [cat]: rules[cat] });
        }

        while (true) {
          const selectedCategory = await interactiveCategorySelection(rules);
          if (!selectedCategory) break;
          if (selectedCategory === 'FINISH') {
            // Combine all selected rules from all categories
            const allSelectedRules = Object.values(persistentSelections)
              .flat()
              .filter(rule => rule.selected);
            const outputDir = values.output?.toString() ?? `${projectRoot}/.cursor/`;
            if (allSelectedRules.length > 0)
              return await downloadSelectedFiles(outputDir, allSelectedRules);
            else
              console.log('⚠️  No rules selected');
            break;
          }
          // Show rule selection for the chosen category, with persistent state
          persistentSelections[selectedCategory] = await selectRules(
            persistentSelections[selectedCategory]
          );
        }
        break;
      case 'output':
        downloadFiles(values[key]?.toString() ??
          `${projectRoot}/output/.cursor`);
        break;
      default:
        console.log(`~~~~ 📂 Flattening rules ~~~~`);
        downloadFiles(path.join(projectRoot, '.cursor'))
        break;
    }
  }
}

try {
  await main();
} catch (err) {
  process.stderr.write('❌ Error: ' + err + '\n');
  process.exit(1);
}
