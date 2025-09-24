'use strict'
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { projectRoot } from './index.mjs';
import { downloadFiles, downloadSelectedFiles } from './utils/download-files.mjs';
import { interactiveCategorySelection, prepareMenu, scanAvailableRules, selectRules } from './utils/interactive-menu.mjs';
import { validateDirname } from './utils/validate-dirname.mjs';

const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));

/**
 * Print the help message
 * @returns {void} */
export const help = () => {
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
-f, --flat: Install all rules without parent directory
-h, --help: Help instructions <----- You are here
-i, --interactive: Select the rules you want 
-o, --output: Set output directory (Default: .cursor/)
-v, --version: Show package version
${repository}
`);
}

/** Print the version of the package*/
export const version = () => console.log(`${packageJson.name} v${packageJson.version}`);

/** interactive mode 
 * @param {Record<string, any>} values
 * @returns {Promise<void>}
*/
export const interactiveMode = async (values) => {
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
            const outputDir = values?.output?.toString() ?? `${projectRoot}/.cursor/`;
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
}

/**
 * @param {string} outputDir - output directory
 * @returns {Promise<void>}
*/
export const output = async (outputDir) => {
    console.log('🎯 Starting output mode...');
    const outputValue = validateDirname(outputDir);
    if (!outputValue.trim()) {
        console.error('❌ ERROR: Output directory cannot be empty.');
        process.exit(1);
    }
    await downloadFiles(outputValue);
}



