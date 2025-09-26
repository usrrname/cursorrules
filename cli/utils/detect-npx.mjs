import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function detectNpxSandbox() {
    // Check environment variables
    const npmPrefix = process.env.npm_config_prefix || '';
    const npmCache = process.env.npm_config_cache || '';
    const tempDir = process.env.TMPDIR || process.env.TEMP || process.env.TMP || '';

    // Analyze current file path
    const currentPath = __dirname;

    //Check for npx-specific patterns in the path
    const npxPatterns = [
        '_npx',
        'npm-cache',
        '_cacache',
        /npm-\d+-[a-f0-9]+/,  // npm-<pid>-<random>
        /tmp.*npm/,           // temp directories with npm
    ];

    // Check if we're in node_modules of a temp-like directory
    const isInNodeModules = currentPath.includes('node_modules');
    const pathSegments = currentPath.split(/[/\\]/);

    // Look for npx indicators
    const hasNpxIndicators = npxPatterns.some(pattern => {
        if (typeof pattern === 'string') {
            return currentPath.includes(pattern) || npmPrefix.includes(pattern) || npmCache.includes(pattern);
        } else {
            return pattern.test(currentPath) || pattern.test(npmPrefix) || pattern.test(npmCache);
        }
    });

    // Check for temporary directory characteristics
    const isTempLike = pathSegments.some(segment =>
        /^(tmp|temp|cache)$/i.test(segment) ||
        /^[a-f0-9]{8,}$/.test(segment) ||  // long hex strings
        /^\d+$/.test(segment)              // numeric directories
    );

    return {
        isNpxSandbox: hasNpxIndicators || (isInNodeModules && isTempLike),
        currentPath,
        npmPrefix,
        npmCache,
        indicators: {
            hasNpxIndicators,
            isInNodeModules,
            isTempLike,
            pathSegments
        }
    };
}