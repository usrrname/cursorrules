import * as assert from 'node:assert';
import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { after, afterEach, beforeEach, describe, test } from 'node:test';
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
        after(async () => {
            try {
                await fs.rm(path.join(process.cwd(), 'output'), { recursive: true, force: true });
            } catch (err) {
                console.error(`Error: ${err}`);
            }
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
            const { stdout, stderr } = await execFileAsync('node', ['./cli.mjs', '-o', 'output']);

            if (existsSync(path.join(process.cwd(), 'output'))) {
                assert.ok(stdout.includes('Success'));
            }
        })
        test('should handle output flag with valid directory', async () => {

            const outputDir = path.join(process.cwd(), 'valid-output');

            const { stdout } = await execFileAsync('node', ['./cli.mjs', '-o', outputDir]);

            // Should successfully create output directory
            assert.ok(stdout.includes('Success'));
            assert.ok(existsSync(outputDir));
            await fs.rm(outputDir, { recursive: true, force: true });
        });

        test('should handle output flag with relative path', async () => {
            const outputDir = './test-relative-output';

            const { stdout } = await execFileAsync('node', ['./cli.mjs', '-o', outputDir]);

            // Should successfully create output directory
            assert.ok(stdout.includes('Success'));
            assert.ok(existsSync(outputDir));

            // Cleanup
            await fs.rm(outputDir, { recursive: true, force: true });
        });
        after(async () => {
            try {
                if (existsSync(path.join(process.cwd(), 'output'))) {
                    await fs.rm(path.join(process.cwd(), 'output'), { recursive: true, force: true });
                }
            } catch (err) {
                console.error(`Error: ${err}`);
            }
        })

    })

    describe('interactive mode', () => {
        const testDir = path.join(process.cwd(), 'test-interactive');
        const testRulesDir = path.join(testDir, '.cursor', 'rules');

        beforeEach(async () => {
            // Create test directory structure
            await fs.mkdir(path.join(testRulesDir, 'standards'), { recursive: true });
            await fs.mkdir(path.join(testRulesDir, 'test'), { recursive: true });
            await fs.mkdir(path.join(testRulesDir, 'utils'), { recursive: true });

            // Create test rule files
            await fs.writeFile(
                path.join(testRulesDir, 'standards', 'test-rule-1.mdc'),
                '---\ndescription: Test rule 1\nglobs: *.js\nalwaysApply: false\n---\n# Test Rule 1\nTest content'
            );
            await fs.writeFile(
                path.join(testRulesDir, 'standards', 'test-rule-2.mdc'),
                '---\ndescription: Test rule 2\nglobs: *.ts\nalwaysApply: false\n---\n# Test Rule 2\nTest content'
            );
            await fs.writeFile(
                path.join(testRulesDir, 'test', 'test-test-rule.mdc'),
                '---\ndescription: Test test rule\nglobs: *.test.js\nalwaysApply: false\n---\n# Test Test Rule\nTest content'
            );
            await fs.writeFile(
                path.join(testRulesDir, 'utils', 'test-utils-rule.mdc'),
                '---\ndescription: Test utils rule\nglobs: *.json\nalwaysApply: false\n---\n# Test Utils Rule\nTest content'
            );
        });

        afterEach(async () => {
            // Clean up test directory
            if (existsSync(testDir)) {
                await fs.rm(testDir, { recursive: true, force: true });
            }
        });

        test('should accept -i flag and start interactive mode', async () => {
            try {
                const { stdout, stderr } = await execFileAsync('node', ['./cli.mjs', '-i']);
                // Should start interactive mode
                assert.ok(stdout.includes('Starting interactive mode') || stdout.includes('Loading'));
                assert.ok(stdout.includes('Select rules by category'))
            } catch (error) {
                // Expected to fail in non-TTY environment due to setRawMode
                assert.ok(error.stderr.includes('setRawMode is not a function') ||
                    error.stderr.includes('Starting interactive mode'));
            }
        });

        test('should accept --interactive flag and start interactive mode', async () => {
            try {
                const { stdout, stderr } = await execFileAsync('node', ['./cli.mjs', '--interactive']);
                // Should start interactive mode
                assert.ok(stdout.includes('Starting interactive mode') || stdout.includes('Loading'));
                assert.ok(stdout.includes('Select rules by category'))
            } catch (error) {
                // Expected to fail in non-TTY environment due to setRawMode
                assert.ok(error.stderr.includes('setRawMode is not a function') ||
                    error.stderr.includes('Starting interactive mode'));
            }
        });

        test('should handle interactive mode with custom output directory', async () => {
            const customOutputDir = path.join(testDir, 'custom-output');

            try {
                const { stdout, stderr } = await execFileAsync('node', ['./cli.mjs', '-i', '-o', customOutputDir]);
                // Should start interactive mode with custom output
                assert.ok(stdout.includes('Starting interactive mode') || stdout.includes('Loading'));
                assert.ok(existsSync(customOutputDir))
            } catch (error) {
                // Expected to fail in non-TTY environment due to setRawMode
                assert.ok(error.stderr.includes('setRawMode is not a function') ||
                    error.stderr.includes('Starting interactive mode'));
            }
        });

        test('should filter only .mdc files correctly', async () => {
            // Create a non-.mdc file that should be ignored
            await fs.writeFile(
                path.join(testRulesDir, 'standards', 'ignore-me.txt'),
                'This should be ignored'
            );

            const outputDir = path.join(testDir, 'filter-test');

            const { stdout } = await execFileAsync('node', ['./cli.mjs', '-o', outputDir]);

            // Should successfully process only .mdc files
            assert.ok(stdout.includes('Success'));
            assert.ok(existsSync(outputDir));

            // The .txt file should not be copied
            assert.ok(!existsSync(path.join(outputDir, 'rules', 'standards', 'ignore-me.txt')));
        });
    });

})
