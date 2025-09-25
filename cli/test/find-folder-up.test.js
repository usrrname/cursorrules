import { strict as assert } from 'node:assert';
import { mkdir, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import * as path from 'node:path';
import { afterEach, describe, test } from 'node:test';

import { findFolderUp } from '../utils/find-folder-up.mjs';

/** @type {string} */
let tempDir;

// Helper to create nested directory structure
const setupNestedStructure = async () => {
    tempDir = await mkdtemp(path.join(tmpdir(), 'find-folder-up-'));
    const level1 = path.join(tempDir, 'level1');
    const level2 = path.join(level1, 'level2');
    await mkdir(level2, { recursive: true });
    return { level1, level2 };
};

afterEach(async () => {
    if (tempDir) {
        await rm(tempDir, { recursive: true, force: true });
        tempDir = '';
    }
});

describe('findFolderUp', () => {
    test('should find the target folder when it exists up the directory tree', async () => {
        const { level2 } = await setupNestedStructure();
        const targetName = '.cursor';
        const targetPath = path.join(tempDir, targetName);
        await mkdir(targetPath);

        const result = await findFolderUp(targetName, level2);
        assert.equal(result, targetPath);
    });

    test('should return null if the target folder does not exist', async () => {
        const { level2 } = await setupNestedStructure();
        const result = await findFolderUp('.does-not-exist', level2);
        assert.equal(result, null);
    });
});
