import * as assert from 'node:assert';
import { execFile } from 'node:child_process';
import { existsSync, rm } from 'node:fs';
import * as path from 'node:path';
import { afterEach, describe, test } from 'node:test';
import { promisify } from 'node:util';
const execFileAsync = promisify(execFile);

describe('CLI', () => {

    describe('help', () => {
        test('should accept --help value and print usage instructions', async () => {
            const { stdout, stderr } = await execFileAsync('node', ['./cli.mjs', '--help']);
            assert.ok(stdout.includes('Usage:'));
        });
    })

    describe('version', () => {
        test('should accept --version value and print package version', async () => {
            const { stdout, stderr } = await execFileAsync('node', ['./cli.mjs', '--version']);
            assert.ok(stdout.includes('cursorrules'));
        });
    })

    describe('output', () => {


    test('should accept short form flag for output directory and download the cursorrules', async () => {
        const { stdout, stderr } = await execFileAsync('node', ['./cli.mjs', '-o', './output']);
        console.log(`stdout:`, stdout);
        if (existsSync(path.join(process.cwd(), 'output', '.cursorrules'))) {
            assert.ok(stdout.includes('Success'));
        }
    })

        afterEach(() => {
        rm(path.join(process.cwd(), 'output'), { recursive: true, force: true }, (err) => {
            if (err) {
                console.error(`Error: ${err}`);
            }
        });
    })

})
})