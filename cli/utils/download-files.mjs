import { copyFile, cp, mkdir } from 'node:fs/promises';
import { dirname, join, sep as pathSep, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { help } from '../commands.mjs';
import { findFolderUp } from './find-folder-up.mjs';
import { validateDirname } from './validate-dirname.mjs';

export const __dirname = dirname(fileURLToPath(import.meta.url));

// Detect if we're running inside an npx sandbox. npm sets npm_config_prefix to that temp dir.
const npmPrefix = process.env.npm_config_prefix?.toString() || '';
const isNpxSandbox = npmPrefix.includes(`${pathSep}_npx${pathSep}`);

let sourceRulesBasePath;

if (isNpxSandbox) {
    // inside npx → rules live alongside package contents
    sourceRulesBasePath = resolve(npmPrefix, 'rules');
} else {
    // running inside repo / globally installed copy → locate nearest .cursor
    const found = await findFolderUp('.cursor', process.cwd())
        ?? await findFolderUp('.cursor', __dirname);

    if (!found) throw new Error("'.cursor' folder not found");

    sourceRulesBasePath = resolve(found, 'rules');
}

/**
 * @param {string} dirname - output folder relative path
 */
export const downloadFiles = async (dirname) => {
    if (!dirname) throw new Error('Output directory is required');

    console.info('📥 Downloading all rules...');

    const outputDir = await validateDirname(dirname);

    try {
        // copy whole folder
        await cp(
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

    const outputDir = await validateDirname(folderName)

    try {
        // Create output directory structure
        await mkdir(outputDir, { recursive: true });
        await mkdir(join(outputDir, 'rules'), { recursive: true });

        // Copy selected rules
        for (const rule of selectedRules) {
            const sourcePath = join(sourceRulesBasePath, rule.path);
            const destPath = join(outputDir, 'rules', rule.path);
            const destDir = dirname(destPath);

            // Ensure destination directory exists
            await mkdir(destDir, { recursive: true });

            // Copy the rule file
            await copyFile(sourcePath, destPath);
            console.log(`  📄 Copied: ${rule.displayName}`);
        }

        console.log(`\n🎉 Success! ${selectedRules.length} selected rules saved to ${outputDir}`);
    } catch (err) {
        console.error(`❌ Error: ${err.message}`, err);
        process.exit(1);
    }
}