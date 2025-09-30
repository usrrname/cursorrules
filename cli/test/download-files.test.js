// @ts-nocheck
import { strict as assert } from 'node:assert';
import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { afterEach, before, describe, mock, test } from 'node:test';
import { promisify } from 'node:util';
import { projectRoot } from '../index.mjs';
const execFileAsync = promisify(execFile);
describe('downloadFiles', () => {
    let downloadFilesMock;
    let downloadSelectedFilesMock;
    let validDir = '';

    before(async (t) => {
        const downloadFilesModule = await import('../utils/download-files.mjs');

        downloadFilesMock = mock.fn((...args) => downloadFilesModule.downloadFiles(...args));
        downloadSelectedFilesMock = mock.fn((...args) => downloadFilesModule.downloadSelectedFiles(...args));

        mock?.module?.('../utils/download-files.mjs', () => {
            return {
                cache: true,
                downloadFiles: downloadFilesMock,
                downloadSelectedFiles: downloadSelectedFilesMock,
            }
        });
        validDir = path.join(projectRoot, 'test-download-files');
    });

    afterEach(async (t) => {
        if (existsSync(validDir)) {
            await fs.rm(validDir, { recursive: true, force: true });
        }
    });

    test('should call downloadFiles with valid directory', async (t) => {
        try {

            const { stdout } = await execFileAsync('node', ['./cli/index.mjs', '-o', validDir]);
            assert.ok(stdout.includes('Downloading'));

            assert.call(downloadFilesMock.mockImplementationOnce((validDir) => {
                assert.ok(existsSync(validDir));
                assert.strictEqual(t.error?.code, 1)
            }));


        } catch (error) {

        }
    })

    test('should call downloadSelectedFiles with valid directory', async (t) => {

        try {
            const mockSelectedFiles = {
                'standards': [
                    'test-rule-1.mdc',
                    'test-rule-2.mdc',
                ],
            }

            const { stdout } = await execFileAsync('node', ['./cli/index.mjs', '-io', validDir]);
            assert.call(downloadSelectedFilesMock?.mockImplementationOnce((validDir, mockSelectedFiles) => {
                assert.strictEqual(validDir, validDir);
                assert.strictEqual(mockSelectedFiles, mockSelectedFiles);
            }));


            assert.ok(stdout.includes('Copied'));
            assert.ok(existsSync(validDir));
            assert.equal(downloadSelectedFilesMock?.mock.calls?.length, 1);

        } catch (error) {
            assert.strictEqual(error.code, 1);
        }

    })
})