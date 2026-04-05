#!/usr/bin/env node
/**
 * Generate checksums for all downloadable files
 * Creates a checksums.json file with SHA-256 hashes
 */

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIRS_TO_HASH = ['.cursor', '.claude'];
const OUTPUT_FILE = 'checksums.json';

/**
 * Generate SHA-256 checksum for a file
 * @param {string} filePath
 * @returns {string}
 */
function generateFileChecksum(filePath) {
  const content = readFileSync(filePath);
  return createHash('sha256').update(content).digest('hex');
}

/**
 * Recursively get all files in a directory
 * @param {string} dir
 * @returns {string[]}
 */
function getAllFiles(dir) {
  const files = [];
  const items = readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Generate checksums for all files in specified directories
 * @returns {Record<string, string>}
 */
function generateChecksums() {
  /** @type {Record<string, string>} */
  const checksums = {};
  
  for (const dir of DIRS_TO_HASH) {
    try {
      const files = getAllFiles(dir);
      for (const file of files) {
        const relativePath = relative('.', file);
        checksums[relativePath] = generateFileChecksum(file);
      }
    } catch (err) {
      console.warn(`Warning: Could not read directory ${dir}: ${err.message}`);
    }
  }
  
  return checksums;
}

// Main execution
const checksums = generateChecksums();
writeFileSync(OUTPUT_FILE, JSON.stringify(checksums, null, 2));
console.log(`✅ Generated checksums for ${Object.keys(checksums).length} files`);
console.log(`📄 Saved to ${OUTPUT_FILE}`);
