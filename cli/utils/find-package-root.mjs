import { readFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
/**
 * @param {string} startPath
 * @param {string} packageName
 * @returns {string}
 */
export function findPackageRoot(startPath, packageName) {
    let currentPath = startPath;

    while (currentPath !== dirname(currentPath)) {
        // Look for package.json or your package-specific markers
        try {
            const packageJsonPath = resolve(currentPath, 'package.json');
            const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

            // Verify package
            if (packageJson.name === packageName) {
                return currentPath;
            }
        } catch (e) {
            // Continue searching up
        }

        // Also check for .cursor directory as a marker
        try {
            const cursorPath = resolve(currentPath, '.cursor');
            if (statSync(cursorPath).isDirectory()) {
                return currentPath;
            }
        } catch (e) {
            // Continue searching up
        }

        currentPath = dirname(currentPath);
    }

    throw new Error('Package root not found');
}