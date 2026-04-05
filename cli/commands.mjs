'use strict'
import * as fs from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as util from 'node:util';
import { config } from './index.mjs';
import { downloadFiles, downloadSelectedFiles } from './utils/download-files.mjs';
import { findPackageRoot } from './utils/find-package-root.mjs';
import { interactiveCategorySelection, prepareMenu, scanAvailableRules, selectRules } from './utils/interactive-menu.mjs';
import { validateDirname } from './utils/validate-dirname.mjs';
import { selectIde } from './utils/ide-selection.mjs';

/** fallback for Node < 21 */
const styleText = util.styleText ?? ((_, text) => text);

export const __dirname = dirname(fileURLToPath(import.meta.url));
export const packageJsonPath = resolve(__dirname, '..', 'package.json');
export const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
const defaultOutput = process.cwd();

/** @returns {void} */
export const help = () => {

    const repository = packageJson?.repository?.url?.replace('git+', '').replace('.git', '') ?? 'https://github.com/usrrname/cursorrules'

    const repoLink = styleText('underline', repository)
    const version = packageJson?.version;
    const title = styleText(['black', 'bgMagenta'], `@usrrname/cursorrules v${version}`)
    const description = packageJson?.description + ` ✦`;
    const usage = styleText('magentaBright', `npx @usrrname/cursorrules`)
    const options = styleText('dim', `[options]`)

    /** @param {string} key */
    const getFlagDescription = (key) => {
        switch (key) {
            case 'dryRun':
                return styleText('green', 'preview what would be downloaded');
            case 'flat':
                return styleText('green', 'install all rules without parent directory');
            case 'help':
                return styleText('green', 'help instructions');
            case 'ide':
                return styleText('green', 'target IDE: cursor|claude|both');
            case 'interactive':
                return styleText('green', 'select the rules you want');
            case 'output':
                return styleText('green', 'set output directory (Default: .cursor/)');
            case 'validate':
                return styleText('green', 'validate downloaded files');
            case 'version':
                return styleText('green', 'show package version');
        }
    }
    const tableContent = Object.entries(config?.options || {}).map(([key, value]) => {
        return {
            flag: value?.short ? `-${value?.short}` : '',
            name: `--${key}`,
            description: getFlagDescription(key),
            type: value?.type,
            default: value?.default ? `(Default: ${value?.default})` : '',
        }
    })

    console.info(`
╔══════════════════════════════════════╗
║ ${title}  ║
╚══════════════════════════════════════╝
(✿ᴗ͈ˬᴗ͈)⁾⁾ 

${description}

Usage:
========================================
${usage} ${options}

${tableContent.map(item => `${item.name} ${item.flag} ${item.type} ${item.description} ${item.default}`).join('\n')}

Examples:
  npx @usrrname/cursorrules --ide cursor --flat
  npx @usrrname/cursorrules --ide claude --dry-run
  npx @usrrname/cursorrules --ide both --output ./config

${repoLink}
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
    
    // Prompt for IDE selection first
    if (!values.ide) {
        values.ide = await selectIde();
    }
    
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
                return await downloadSelectedFiles(outputDir, allSelectedRules, values);
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
 * @param {Object} [values] - CLI options
 * @param {string} [values.ide] - Target IDE
 * @param {boolean} [values.dryRun] - Dry run flag
 * @param {boolean} [values.validate] - Validate flag
 * @returns {Promise<void>}
*/
export const output = async (outputDir, values = {}) => {
    if (!outputDir.trim()) {
        console.error('❌ ERROR: Output directory cannot be empty.');
        process.exit(1);
    }
    
    // Prompt for IDE if not specified
    if (!values.ide) {
        values.ide = await selectIde();
    }
    
    const outputValue = await validateDirname(outputDir);
    await downloadFiles(outputValue, values);
}



