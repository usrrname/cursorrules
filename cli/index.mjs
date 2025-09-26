#!/usr/bin/env node
'use strict'
import { join, resolve } from 'node:path';
import { parseArgs } from 'node:util';
const { downloadFiles } = await import('./utils/download-files.mjs');
const { help, interactiveMode, output, version } = await import('./commands.mjs');

/** project root @type {string} */
export const projectRoot = resolve(import.meta.dirname, '..')
export const defaultCursorPath = join(projectRoot, '.cursor');

/** 
 * CLI options @type {import('node:util').ParseArgsConfig}
 */
export const config = {
    args: process.argv.slice(2),
    tokens: true,
    options: {
        flat: {
            type: 'boolean',
            short: 'f',
        },
        help: {
            type: 'boolean',
            short: 'h',
            default: false,
        },
        interactive: {
            type: 'boolean',
            short: 'i',
            default: false,
        },
        output: {
            type: 'string',
            short: 'o',
        },
        version: {
            type: 'boolean',
            short: 'v',
        },
    },
}


async function main() {
    console.log("🚀 Loading @usrrname/cursorrules ...");

    const { values } = parseArgs(config);
    const flags = Object.keys(config.options || {});

    const allowedKeys = flags.filter(flag => flag === 'output')[0]

    for (let key in values) {

        /**
         * prevent unknown flags from being used
         * prevent arguments without values
         * @param {string} key */
        if (!allowedKeys.includes(key) && !values[key]) continue;

        switch (key) {
            case 'version':
                await version();
                break;
            case 'help':
                await help();
                break;
            case 'interactive':
                await interactiveMode(values);
                process.exit(0);
            case 'output':
                const outputDir = values[key]?.toString() ?? defaultCursorPath;
                await output(outputDir);
                break;
            case 'flat':
                const cursorRulesPath = process.env.npm_config_prefix?.toString() ?? `${defaultCursorPath}/rules`;
                await downloadFiles(cursorRulesPath);
                break;
        }
    }
}

try {
    await main();
} catch (err) {
    process.stderr.write('❌ Error: ' + err + '\n' + err.stack);
    process.exit(1);
}



