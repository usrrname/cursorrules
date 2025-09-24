import * as path from 'node:path';
import * as url from 'node:url';

/** Resolve and ensure absolute outside-project paths are rejected */
const resolvePathByPlatform = process.platform === 'win32' ? path.win32.resolve : path.resolve;

/**
 * Validates output directory name to prevent path traversal and disallow special characters.
 * @param {string} rawPath - the output directory to validate
 * @param {string} projectRoot - project root directory (defaults to process.cwd())
 * @returns {string} - the validated and resolved absolute path
 */
export const validateDirname = (rawPath, projectRoot = process.cwd()) => {
    const attemptedPath = rawPath;
    if (rawPath.startsWith('=')) rawPath = rawPath.split('=')[1].trim();

    const isWindows = /^[A-Za-z]:[\\/]/.test(rawPath) || rawPath.startsWith('\\\\');
    const parsed = isWindows ? path.win32.parse(rawPath) : path.parse(rawPath);
    const root = parsed.root; // e.g., 'D:\\' or '\\\\server\\share\\' or '/' or ''
    const isAbsolute = isWindows ? path.win32.isAbsolute(rawPath) : path.isAbsolute(rawPath);

    // Only validate Windows root when a Windows absolute is provided
    if (isWindows && isAbsolute) {
        if (!/^(?:[A-Za-z]:[\\/]|\\\\)/.test(root)) {
            console.error(`❌ ERROR: Invalid Windows root '${root}'. Expected like 'C:\\'.\nAttempted path: ${attemptedPath}`);
            process.exit(1);
        }
    }

    // Build segments safely, skipping the drive root and empty artifacts
    const splitter = /[\\/]+/;
    const segments = rawPath.split(splitter);

    let startIdx = 0;
    if (segments.length > 0 && /^[A-Za-z]:$/.test(segments[0])) {
        // Skip 'D:' and a following '' if present (due to root separator)
        startIdx = (segments[1] === '') ? 2 : 1;
    } else if (rawPath.startsWith('\\\\')) {
        // UNC path: skip leading empty parts caused by split of '\\server\share'
        // Reconstruct UNC head '\\server\share' and skip it as "root"
        // Skip first 3 parts: '', '', 'server' -> start at index 3
        startIdx = 3;
    }

    // Define invalid chars per segment (do not include slashes; we already split)
    // For Windows: <>:"|?* and control chars;
    const invalidWindowsChars = /[<>:"|?*\x00-\x1F]/;
    const extraDisallow = /[@!{}]/;
    const invalidPosix = /[\x00]/;

    for (let i = startIdx; i < segments.length; i++) {
        const segment = segments[i];
        if (!segment) continue; // skip empty artifacts between separators

        // Handle relative path indicators
        if (segment === '.') {
            // Allow '.' at the beginning for relative paths like './folder'
            if (i === 0 && !isAbsolute) {
                continue; // Skip validation for leading '.' in relative paths
            } else {
                console.error(`❌ ERROR: Output directory contains invalid characters in segment ${segment}.`);
                console.error(`Attempted path: ${attemptedPath}`);
                process.exit(1);
            }
        }

        // Always disallow parent directory traversal
        if (segment === '..') {
            console.error(`❌ ERROR: Output directory contains invalid characters in segment ${segment}.`);
            console.error(`Attempted path: ${attemptedPath}`);
            process.exit(1);
        }
        // Skip validation for the final segment if it's just '.' from a trailing '/.' (already handled), else validate
        if (process.platform === 'win32') {
            if (invalidWindowsChars.test(segment) || extraDisallow.test(segment) || segment.includes(':')) {
                console.error(`❌ ERROR: Output directory contains invalid characters in segment ${segment}.`);
                console.error(`Attempted path: ${attemptedPath}`);
                process.exit(1);
            }
        } else {
            if (invalidPosix.test(segment) || extraDisallow.test(segment)) {
                console.error(`❌ ERROR: Output directory contains invalid characters in segment ${segment}.`);
                console.error(`Attempted path: ${attemptedPath}`);
                process.exit(1);
            }
            // Also reject ':' on POSIX to keep behavior consistent with tests
            if (segment.includes(':')) {
                console.error(`❌ ERROR: Output directory contains invalid characters in segment ${segment}.`);
                console.error(`Attempted path: ${attemptedPath}`);
                process.exit(1);
            }
        }
    }

    const absolutePath = resolvePathByPlatform(rawPath);
    const absoluteProjectRoot = resolvePathByPlatform(projectRoot);

    /** @param {string} p */
    const toKey = (p) => (process.platform === 'win32') ? p.toLowerCase() : p;

    if (isAbsolute) {
        if (!toKey(absolutePath).startsWith(toKey(absoluteProjectRoot))) {
            console.error('❌ ERROR: Output directory path is invalid.');
            console.error(`Attempted path: ${attemptedPath}`);
            process.exit(1);
        }
    }

    return url.fileURLToPath(url.pathToFileURL(absolutePath));
}
