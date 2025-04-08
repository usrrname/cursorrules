import * as assert from 'node:assert';
import { execFile } from 'node:child_process';
import { existsSync, rm } from 'node:fs';
import * as path from 'node:path';
import { after, describe, test } from 'node:test';
import { promisify } from 'node:util';
const execFileAsync = promisify(execFile);

describe('CLI', () => {
    test('should throw an error if no args are provided', async () => {
        try {
            await execFileAsync('node', ['./cli.mjs']);
        } catch (error) {
            assert.match(error.message, /Missing command/, `Error: ${error.message}`);
        }
    });

    test('should accept help command and print usage instructions', async () => {
        const { stdout, stderr } = await execFileAsync('node', ['./cli.mjs', 'help']);
        assert.ok(stdout.includes('Usage:'));
    });

    test('should accept flag for output directory and download the cursorrules', async () => {
        const { stdout, stderr } = await execFileAsync('node', ['./cli.mjs', 'output', './output']);
        console.log(`stdout:`, stdout);
        if (existsSync(path.join(process.cwd(), 'output', '.cursorrules'))) {
            assert.ok(stdout.includes('Success'));
        }
    })

    test('should accept short form flag for output directory and download the cursorrules', async () => {
        const { stdout, stderr } = await execFileAsync('node', ['./cli.mjs', '-o', './output']);
        console.log(`stdout:`, stdout);
        if (existsSync(path.join(process.cwd(), 'output', '.cursorrules'))) {
            assert.ok(stdout.includes('Success'));
        }
    })

    after(() => {
        rm(path.join(process.cwd(), 'output'), { recursive: true, force: true }, (err) => {
            if (err) {
                console.error(`Error: ${err}`);
            }
        });
    })

})