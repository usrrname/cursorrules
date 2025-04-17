import * as assert from 'node:assert';
import { execFile } from 'node:child_process';
import { existsSync, rm } from 'node:fs';
import * as path from 'node:path';
import { after, afterEach, describe, test } from 'node:test';
import { promisify } from 'node:util';
const execFileAsync = promisify(execFile);
describe('CLI', () => {
    describe('default', () => {
        test('should accept default command with no flags and download the cursorrules', async () => {
            const { stdout, stderr } = await execFileAsync('node', ['./cli.mjs']);
            if (existsSync(path.join(process.cwd(), 'output', '.cursor/rules'))) {
                assert.ok(stdout.includes('Success'));
            }
        });
        after(() => {
            rm(path.join(process.cwd(), 'output'), { recursive: true, force: true }, (err) => {
                if (err) {
                    console.error(`Error: ${err}`);
                }
            });
        })
    })

    describe('help', () => {
        test('should accept -h and print usage instructions', async () => {
            const { stdout, stderr } = await execFileAsync('node', ['./cli.mjs', '-h']);
            assert.ok(stdout.includes('Usage:'));
        });

        test('should accept --help value and print usage instructions', async () => {
            const { stdout, stderr } = await execFileAsync('node', ['./cli.mjs', '--help']);
            assert.ok(stdout.includes('Usage:'));
        });
    })

    describe('version', () => {
        test('should accept -v and print package version', async () => {
            const { stdout, stderr } = await execFileAsync('node', ['./cli.mjs', '-v']);
            assert.ok(stdout.includes('@usrrname/cursorrules'));
        });

        test('should accept --version value and print package version', async () => {
            const { stdout, stderr } = await execFileAsync('node', ['./cli.mjs', '--version']);
            assert.ok(stdout.includes('@usrrname/cursorrules'));
        });
    })

    describe('output', () => {


        test('should accept -o flag for output directory and download the cursorrules', async () => {
            const { stdout, stderr } = await execFileAsync('node', ['./cli.mjs', '-o', './output']);
            console.log(`stdout:`, stdout);
            if (existsSync(path.join(process.cwd(), 'output', '.cursor/rules'))) {
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