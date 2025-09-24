import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as url from 'node:url';
import { help } from '../commands.mjs';
import { validateDirname } from './validate-dirname.mjs';

const sourceRulesBasePath = url.fileURLToPath(url.resolve(import.meta.url, `../../.cursor/rules`));

/**
 * @param {string} dirname - output folder relative path
 */
export const downloadFiles = async (dirname) => {
    if (!dirname) throw new Error('Output directory is required');

    console.info('📥 Downloading all rules...');

    const outputDir = validateDirname(dirname);

    try {
        // copy whole folder
        await fs.cp(
            sourceRulesBasePath,
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
export const downloadSelectedFiles = async (folderName, selectedRules) => {
    if (!folderName) throw new Error('Output directory is required');

    if (!selectedRules || selectedRules.length === 0) {
        console.log('⏭️  No rules selected, skipping download');
        await help();
        return;
    }

    console.info('📥 Downloading selected rules...');

    const outputDir = validateDirname(folderName)

    try {
        // Create output directory structure
        await fs.mkdir(outputDir, { recursive: true });
        await fs.mkdir(path.join(outputDir, 'rules'), { recursive: true });

        // Copy selected rules
        for (const rule of selectedRules) {
            const sourcePath = path.join(sourceRulesBasePath, rule.path);
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