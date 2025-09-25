import { stat } from 'node:fs/promises';
import { dirname, join, parse } from 'node:path';

/**
 * Traverses up the directory tree to find a specific folder.
 * @param {string} folderName The name of the folder to find (e.g., '.git', '.cursor').
 * @param {string} [startPath = process.cwd()] The path to start the upward search from.
 * @returns {Promise<string|null>} The absolute path to the found folder, or null if not found.
 */
export const findFolderUp = async (folderName, startPath = process.cwd()) => {
    let currentPath = startPath;
    const rootPath = parse(currentPath).root; // e.g., '/' on Linux/macOS, 'C:\' on Windows

    while (true) {
        const candidatePath = join(currentPath, folderName);

        try {
            const stats = await stat(candidatePath);
            if (stats.isDirectory()) {
                console.log(`🎉 Found '${folderName}' at: ${candidatePath}`);
                return candidatePath;
            }
        } catch (err) {
            // ENOENT means 'No such file or directory', which is what we expect if it's not here
            if (err.code !== 'ENOENT') {
                console.warn(`⚠️ Unexpected error while checking ${candidatePath}: ${err.message}`);
            }
        }

        // Move up to the parent directory
        const parentPath = dirname(currentPath);

        // If we've reached the root directory and haven't found it, stop.
        if (currentPath === rootPath) {
            console.log(`❌ Reached root '${rootPath}', '${folderName}' not found.`);
            return null;
        }

        currentPath = parentPath;
    }
}