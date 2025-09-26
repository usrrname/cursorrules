'use strict'
import * as fs from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { downloadFiles, downloadSelectedFiles } from './utils/download-files.mjs';
import { findPackageRoot } from './utils/find-package-root.mjs';
import { interactiveCategorySelection, prepareMenu, scanAvailableRules, selectRules } from './utils/interactive-menu.mjs';
import { validateDirname } from './utils/validate-dirname.mjs';

export const __dirname = dirname(fileURLToPath(import.meta.url));
export const packageJsonPath = resolve(__dirname, '..', 'package.json');
export const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
const defaultOutput = resolve(homedir(), 'Downloads', '.cursor');

/** @returns {void} */
export const help = () => {
    const repository = packageJson?.repository?.url?.replace('git+', '').replace('.git', '') ?? 'https://github.com/usrrname/cursorrules';
    const version = packageJson?.version;

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
export const version = () => console.log(`${packageJson?.name} v${packageJson?.version}`);

/** interactive mode 
 * @param {Record<string, any>} values
 * @returns {Promise<void>}
*/
export const interactiveMode = async (values) => {
    console.log('🎯 Starting interactive mode...');
    const packageRoot = findPackageRoot(__dirname, '@usrrname/cursorrules');
    const sourceRulesBasePath = resolve(packageRoot, '.cursor', 'rules');
    const rules = await scanAvailableRules(sourceRulesBasePath);
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
            const outputDir = values?.output?.toString() ?? defaultOutput;
            if (allSelectedRules.length > 0)
                return await downloadSelectedFiles(outputDir, allSelectedRules);
            else
                console.log('⚠️  No rules selected');
            break;
        }
        // Show rule selection for the chosen category
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
    if (!outputDir.trim()) {
        console.error('❌ ERROR: Output directory cannot be empty.');
        process.exit(1);
    }
    const outputValue = await validateDirname(outputDir);
    await downloadFiles(outputValue);
}



