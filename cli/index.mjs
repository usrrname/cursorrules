#!/usr/bin/env node
'use strict'
import { join, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { help, interactiveMode, output, version } from './commands.mjs';
import { downloadFiles } from './utils/download-files.mjs';
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
        dryRun: {
            type: 'boolean',
            default: false,
        },
        flat: {
            type: 'boolean',
            short: 'f',
        },
        help: {
            type: 'boolean',
            short: 'h',
            default: false,
        },
        ide: {
            type: 'string',
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
        validate: {
            type: 'boolean',
            default: false,
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

    const allowedKeys = flags.filter(flag => flag === 'output' || flag === 'ide')[0];

    for (let key in values) {
        if (!allowedKeys.includes(key) && !values[key]) continue;

        switch (key) {
            case 'version': {
                await version();
                break;
            }
            case 'help': {
                await help();
                break;
            }
            case 'interactive': {
                await interactiveMode(values);
                process.exit(0);
            }
            case 'output': {
                const outputDir = values[key]?.toString() ?? process.cwd();
                await output(outputDir, values);
                break;
            }
            case 'flat': {
                const cursorRulesPath = process.cwd();
                await downloadFiles(cursorRulesPath, values);
                break;
            }
        }
    }
}

try {
    await main();
} catch (err) {
    process.stderr.write('❌ Error: ' + err + '\n' + err.stack);
    process.exit(1);
}



