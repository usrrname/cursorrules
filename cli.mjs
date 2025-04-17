#!/usr/bin/env node
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as url from 'node:url';
import { parseArgs } from 'node:util';

const baseFolder = '.cursor/';

const packageJson = JSON.parse(
    await fs.readFile(
        url.fileURLToPath(url.resolve(import.meta.url, 'package.json')),
        'utf-8',
    )
);

/** 
 * CLI options @type {import('node:util').ParseArgsConfig}
 */
const config = {
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
        output: {
            type: 'string',
            short: 'o',
            default: `${process.cwd()}/output/.cursor`,
        },
        version: {
            type: 'boolean',
            short: 'v',
        },
    },
}

const help = () => {
    const repository = packageJson.repository.url.replace('git+', '').replace('.git', '');
    const version = packageJson.version;
    return console.info(`
╔══════════════════════════════════════╗
║  @usrrname/cursorrules v${version}   ║
╚══════════════════════════════════════╝
A standard library of Cursor Rules 
...with otaku vibes (✿ᴗ͈ˬᴗ͈)⁾⁾

Usage:
=======================================
npx @usrrname/cursorrules [options]

Options:
-f, --flat: Install without parent directory
-h, --help: Help instructions <----- You are here
-o, --output: Set output directory (Default: ./output)
-v, --version: Show package version

${repository}
`);
}

const version = () => console.log(`${packageJson.name} v${packageJson.version}`);

/**
 * @param {string} dirname - output folder relative path
 */
const downloadFiles = async (dirname) => {
    if (!dirname) throw new Error('Output directory is required');

    console.info('Downloading rules...');

    if (dirname.startsWith('=')) dirname = dirname.split('=')[1];

    const outputDir = url.fileURLToPath(url.resolve(import.meta.url, dirname.trim()))

    try {
        // copy whole folder
        await fs.cp(
            url.fileURLToPath(url.resolve(import.meta.url, baseFolder)),
            outputDir,
            { recursive: true },
        )
        console.log(`Success! .cursorrules saved to ${outputDir}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}

async function main() {
    console.log("🚀 Loading @usrrname/cursorrules ...");

    const { values } = parseArgs(config);

    const allowedKeys = ['flat', 'output']

    for (let key in values) {

        if (!allowedKeys.includes(key) && !values[key]) continue;

        switch (key) {
            case 'version':
                await version();
                break;
            case 'help':
                await help();
                break;
            case 'output':
                downloadFiles(values[key]?.toString() ?? '')
                break;
            case 'flat':
            default:
                console.log(`~~~~ Flattening rules ~~~~`);
                downloadFiles(path.join(process.cwd(), '.cursor'))
                break;
        }
    }
}   


try {
    await main();
} catch (err) {
    process.stderr.write('Error: ' + err.message + '\n');
    process.exit(1);
}
