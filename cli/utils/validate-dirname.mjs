import * as path from 'node:path';
import * as url from 'node:url';

/** Resolve and ensure absolute outside-project paths are rejected */
const resolvePathByPlatform = process.platform === 'win32' ? path.win32.resolve : path.resolve;

/**
 * Throws an error and exits the process if validation fails.
 * @param {string} segment - The path segment that failed validation.
 * @param {string} attemptedPath - The full path that was attempted.
 */
const throwError = (segment, attemptedPath) => {
    console.error(`❌ ERROR: Output directory contains invalid characters in segment '${segment}'.`);
    console.error(`Attempted path: ${attemptedPath}`);
    process.exit(1);
};

/**
 * Checks a path segment for invalid characters based on the platform.
 * @param {string} segment - The path segment to check.
 * @returns {boolean} - True if invalid characters are found, false otherwise.
 */
const hasInvalidSegmentChars = (segment) => {
    // Define invalid chars per segment (do not include slashes; we already split)
    // For Windows: <>:"|?* and control chars;
    const invalidWindowsChars = /[<>:"$|?*\x00-\x1F]/;
    const reservedNamesRegex = /^(?:aux|con|clock\$|nul|prn|com[1-9]|lpt[1-9])$/i; // Reserved names on Windows

    const extraDisallow = /[#$%&@!{}]/; // Additional characters we want to disallow on both platforms
    const invalidPosixChars = /[\x00-\x1F\\:"*?<>|$#%&@!{}]/;

    if (process.platform === 'win32') {
        return invalidWindowsChars.test(segment) || extraDisallow.test(segment) || reservedNamesRegex.test(segment);
    } else {
        return invalidPosixChars.test(segment);
    }
};

/**
 * Validates output directory name to prevent path traversal and disallow special characters.
 * @param {string} rawPath - the output directory to validate
 * @param {string} projectRoot - project root directory (defaults to process.cwd() where the Node.js process is running)
 * @returns {Promise<string>} - the validated and resolved absolute path
 */
export const validateDirname = async (rawPath, projectRoot = process.cwd()) => {

    const attemptedPath = rawPath;

    // Remove = prefix if it exists
    if (rawPath.startsWith('=')) rawPath = rawPath.split('=')[1].trim();

    const isWindows = process.platform === 'win32'
    const parsed = isWindows ? path.win32.parse(rawPath) : path.parse(rawPath);

    const isAbsolute = isWindows ? path.win32.isAbsolute(rawPath) : path.isAbsolute(rawPath);

    // Validate Windows root when a Windows absolute is provided
    if (isWindows && isAbsolute) {
        if (!/^(?:[A-Za-z]:[\\/]|\\\\)/.test(parsed.root)) {
            throwError(parsed.root, attemptedPath);
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

    for (let i = startIdx; i < segments.length; i++) {
        const segment = segments[i];
        if (!segment) continue; // skip empty artifacts between separators

        // Handle relative path indicators
        if (segment === '.') {
            // Allow '.' at the beginning for relative paths like './folder'
            if (i === 0 && !isAbsolute) {
                continue; // Skip validation for leading '.' in relative paths
            } else {
                // If '.' is not at the beginning of a relative path, it's considered invalid here.
                throwError(segment, attemptedPath);
            }
        }

        // Check for:
        // - parent directory traversal
        // - platform-specific and general disallowed characters
        if (segment.includes('..') || hasInvalidSegmentChars(segment)) {
            throwError(segment, attemptedPath);
        }
    }

    const absolutePath = resolvePathByPlatform(rawPath);

    return url.fileURLToPath(url.pathToFileURL(absolutePath));
}
