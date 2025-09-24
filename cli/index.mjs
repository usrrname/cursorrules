#!/usr/bin/env node
'use strict'
import * as path from 'node:path';
import { parseArgs } from 'node:util';
import { help, interactiveMode, output, version } from './commands.mjs';
import { downloadFiles } from './utils/download-files.mjs';

export const projectRoot = process.cwd()
export const baseFolder = '.cursor/';

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

    if (Object.keys(values || {}).length === 0) await downloadFiles(path.join(projectRoot, '.cursor'))

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
                const outputDir = values[key]?.toString() ?? `${projectRoot}/.cursor`;
                await output(outputDir);
                break;
            case 'flat':
                await downloadFiles(path.join(projectRoot, ''))
                break;
        }
    }
}

try {
    await main();
} catch (err) {
    process.stderr.write('❌ Error: ' + err);
    process.exit(1);
}



