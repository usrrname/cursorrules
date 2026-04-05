import { copyFile, cp, mkdir, readFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { help } from '../commands.mjs';
import { detectNpxSandbox } from './detect-npx.mjs';
import { findFolderUp } from './find-folder-up.mjs';
import { findPackageRoot } from './find-package-root.mjs';
import { validateDirname } from './validate-dirname.mjs';
import { validateIde, getIdeDisplayName } from './ide-selection.mjs';

const detection = detectNpxSandbox();
const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {string|undefined} */
let sourceRulesBasePath = '';

if (detection.isNpxSandbox || !sourceRulesBasePath) {
    const packageRoot = findPackageRoot(__dirname, '@usrrname/cursorrules');
    sourceRulesBasePath = resolve(packageRoot, '.cursor', 'rules');
}

// only for local development and testing
if (process.env.CI || ['development', 'test'].includes(process.env.NODE_ENV ?? '')) {
    // running inside repo / globally installed copy → locate nearest .cursor
    const found = await findFolderUp('.cursor', process.cwd())
        ?? await findFolderUp('.cursor', __dirname);

    if (!found) throw new Error("'.cursor' folder not found");

    sourceRulesBasePath = resolve(found, 'rules');
}

/**
 * Generate SHA-256 checksum of file content
 * @param {string} content
 * @returns {string}
 */
function generateChecksum(content) {
    return createHash('sha256').update(content).digest('hex');
}

/**
 * Validate a downloaded file
 * @param {string} filePath
 * @param {string} expectedContent
 * @returns {Promise<{valid: boolean, error?: string}>}
 */
async function validateFile(filePath, expectedContent) {
    try {
        await access(filePath);
        const content = await readFile(filePath, 'utf-8');
        if (content !== expectedContent) {
            return { valid: false, error: 'Content mismatch' };
        }
        return { valid: true };
    } catch (err) {
        return { valid: false, error: err.message };
    }
}

/**
 * Get source paths based on IDE selection
 * @param {string} ide - 'cursor', 'claude', or 'both'
 * @returns {Array<{source: string, dest: string, type: string}>}
 */
function getSourcePaths(ide) {
    const packageRoot = findPackageRoot(__dirname, '@usrrname/cursorrules');
    const paths = [];
    
    if (ide === 'cursor' || ide === 'both') {
        paths.push({
            source: resolve(packageRoot, '.cursor'),
            dest: '.cursor',
            type: 'cursor'
        });
    }
    
    if (ide === 'claude' || ide === 'both') {
        paths.push({
            source: resolve(packageRoot, '.claude'),
            dest: '.claude',
            type: 'claude'
        });
    }
    
    return paths;
}

/**
 * @param {string} dirname - output folder relative path
 * @param {Object} [options] - CLI options
 * @param {string} [options.ide] - Target IDE: 'cursor', 'claude', or 'both'
 * @param {boolean} [options.dryRun] - Preview only, don't download
 * @param {boolean} [options.validate] - Validate downloaded files
 */
export const downloadFiles = async (dirname, options = {}) => {
    if (!dirname) throw new Error('Output directory is required');
    
    const ide = validateIde(options.ide ?? '') || 'cursor';
    const dryRun = options.dryRun || false;
    const validate = options.validate || false;

    if (dryRun) {
        console.log(`🔍 DRY RUN: Previewing what would be downloaded for ${getIdeDisplayName(ide)}...\n`);
    } else {
        console.info(`📥 Downloading ${getIdeDisplayName(ide)} configuration...`);
    }

    const outputDir = await validateDirname(dirname);
    const sourcePaths = getSourcePaths(ide);
    
    if (dryRun) {
        console.log(`Output directory: ${outputDir}`);
        console.log('\nFiles to be downloaded:\n');
        for (const { source, dest, type } of sourcePaths) {
            console.log(`  📁 ${type}/ → ${dest}/`);
        }
        console.log('\n✅ Dry run complete. No files were downloaded.');
        return;
    }
    
    try {
        for (const { source, dest, type } of sourcePaths) {
            const destPath = join(outputDir, dest);
            console.log(`  📥 Copying ${type} configuration...`);
            
            await cp(source, destPath, { recursive: true });
            
            if (validate) {
                console.log(`  🔍 Validating ${type} configuration...`);
                // Basic validation - ensure key files exist
                if (type === 'claude') {
                    await access(join(destPath, 'settings.json'));
                }
            }
        }
        
        console.log(`✅ Success! ${getIdeDisplayName(ide)} configuration saved to ${outputDir}`);
        
        if (ide === 'both') {
            console.log('   - Cursor: .cursor/');
            console.log('   - Claude Code: .claude/');
        }
    } catch (err) {
        console.error(`❌ Error: ${err.message}`, err);
        process.exit(1);
    }
}

/**
 * Download selected rules only
 * @param {string} folderName - output folder relative path
 * @param {Array<{category: string, displayName: string, selected: boolean, name: string, path: string, fullPath: string}>} selectedRules - Array of selected rule objects
 * @param {Object} [options] - CLI options
 * @param {string} [options.ide] - Target IDE: 'cursor', 'claude', or 'both'
 */
export const downloadSelectedFiles = async (folderName, selectedRules, options = {}) => {
    if (!folderName) throw new Error('Output directory is required');

    if (!selectedRules || selectedRules.length === 0) {
        console.log('⏭️  No rules selected, skipping download');
        await help();
        return;
    }

    const ide = validateIde(options.ide ?? '') || 'cursor';

    console.info(`📥 Downloading selected rules for ${getIdeDisplayName(ide)}...`);

    const outputDir = await validateDirname(folderName)

    try {
        // Create output directory structure
        await mkdir(outputDir, { recursive: true });
        
        if (ide === 'cursor' || ide === 'both') {
            await mkdir(join(outputDir, '.cursor'), { recursive: true });
        }
        
        if (ide === 'claude' || ide === 'both') {
            await mkdir(join(outputDir, '.claude'), { recursive: true });
        }

        // Copy selected rules
        for (const rule of selectedRules) {
            const sourcePath = join(sourceRulesBasePath, rule.path);

            const destPath = join(outputDir, '.cursor', 'rules', rule.path);
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