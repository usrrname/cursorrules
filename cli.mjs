#!/usr/bin/env node
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as url from 'node:url';
import { parseArgs } from 'node:util';

const folder = '.cursor/rules';
const files = [
    '.cursorignore',
    '.cursorindexingignore',
]

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
    allowPositionals: true,
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
            default: `${process.cwd()}/output`,
        },
        version: {
            type: 'boolean',
            short: 'v',
        },
    },
}

const help = () => {
    const repository = packageJson.repository.url.replace('git+', '').replace('.git', '');
    return console.info(`Usage:
==================================
npx @usrrname/cursorrules [options]

Options:
-f, --flat: Install without parent directory
-h, --help: Help instructions # You are here
-o, --output: Set output directory # Default: ./output
-v, --version: Show package version

${repository}
`);
}

const version = () => console.log(`${packageJson.name} v${packageJson.version}`);


async function main() {

    const { positionals, values, tokens } = parseArgs(config);

    const [command, ...args] = positionals;

    //     /**
    //  * @param {string} flagName - 'help', 'version', 'output'
    //  * @param tokens
    //  * @returns {boolean | undefined}
    //  */
    //     const hasCorrespondingFlag = (flagName) => {
    //         const token = tokens?.find(token => {
    //             const isShortFormatAccepted = [`-${flagName.charAt(0)}`, `-${flagName}`, `--${flagName}`].includes(token.rawName)
    //             const hasLongForm = token.kind === 'option' && token.name === flagName;
    //             return hasLongForm && isShortFormatAccepted;
    //         });
    //         return token
    //     }

    switch (command) {
        case 'help':
            // case hasCorrespondingFlag('help'):
            await help();
            break;
        case 'version':
            // case hasCorrespondingFlag('version'):
            await version();
            break;
        case 'output':
            //case hasCorrespondingFlag('output'):
            let outputDir = '';
            console.info('Downloading rules...');
            const isMissingOutputDir = !values.output || !args[0];
            if (isMissingOutputDir) {
                outputDir = path.join(process.cwd(), '../output');
                console.warn('No output directory provided, creating ./output...');
                await fs.mkdir(outputDir, { recursive: true });
                console.info(`Output directory created: ${outputDir}`);
            }
            else outputDir = url.fileURLToPath(url.resolve(import.meta.url, args[0]))

            await fs.cp(
                url.fileURLToPath(url.resolve(import.meta.url, folder)),
                outputDir,
                { recursive: true },
            )

            for (const file of files) {
                await fs.copyFile(
                    url.fileURLToPath(url.resolve(import.meta.url, file)),
                    path.join(outputDir, file),
                )
            }
            console.log(`Success! .cursorrules saved to ${outputDir}`);
            break;
        case 'flat':
            console.log(`Flattening rules...`);
            const currentDir = path.join(process.cwd());
            await fs.cp(
                url.fileURLToPath(url.resolve(import.meta.url, folder)),
                currentDir,
                { recursive: true },
            )
            console.log(`Success! .cursorrules saved to ${currentDir}`);
            break;
        default:
            if (!command) {
                console.error('Missing command');
                await help();
            }
    }
}


try {
    await main();
} catch (err) {
    process.stderr.write('Error: ' + err.message + '\n');
    process.exit(1);
}
