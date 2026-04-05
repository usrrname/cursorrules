#!/usr/bin/env node
/**
 * Validate downloaded files against checksums
 */

import { createHash } from 'node:crypto';
import { readFileSync, accessSync, constants } from 'node:fs';
import { join } from 'node:path';

/**
 * Generate SHA-256 checksum for a file
 * @param {string} filePath
 * @returns {string}
 */
export function generateChecksum(filePath) {
  const content = readFileSync(filePath);
  return createHash('sha256').update(content).digest('hex');
}

/**
 * Check if a file exists
 * @param {string} filePath
 * @returns {boolean}
 */
export function fileExists(filePath) {
  try {
    accessSync(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a single file against expected checksum
 * @param {string} filePath - Path to the file
 * @param {string} expectedChecksum - Expected SHA-256 checksum
 * @returns {{valid: boolean, error?: string}}
 */
export function validateFile(filePath, expectedChecksum) {
  try {
    if (!fileExists(filePath)) {
      return { valid: false, error: 'File does not exist' };
    }
    
    const actualChecksum = generateChecksum(filePath);
    if (actualChecksum !== expectedChecksum) {
      return { 
        valid: false, 
        error: `Checksum mismatch: expected ${expectedChecksum}, got ${actualChecksum}` 
      };
    }
    
    return { valid: true };
  } catch (err) {
    return { valid: false, error: err.message };
  }
}

/**
 * Validate all files in a directory against checksums
 * @param {string} baseDir - Base directory
 * @param {Record<string, string>} checksums - Map of file paths to checksums
 * @returns {{valid: boolean, errors: Array<{file: string, error: string}>}}
 */
export function validateDownload(baseDir, checksums) {
  /** @type {Array<{file: string, error: string}>} */
  const errors = [];
  
  for (const [relativePath, expectedChecksum] of Object.entries(checksums)) {
    const fullPath = join(baseDir, relativePath);
    const result = validateFile(fullPath, expectedChecksum);
    
    if (!result.valid && result.error) {
      errors.push({ file: relativePath, error: result.error });
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Scan file content for potentially dangerous patterns
 * @param {string} content - File content to scan
 * @returns {Array<{pattern: string, line: number}>}
 */
export function scanForDangerousPatterns(content) {
  const dangerousPatterns = [
    { pattern: /rm\s+-rf\s+\//, name: 'rm -rf /' },
    { pattern: /rm\s+-rf\s+~/, name: 'rm -rf ~' },
    { pattern: />\s*\/dev\/sda/, name: 'disk overwrite' },
    { pattern: /mkfs\./, name: 'filesystem format' },
    { pattern: /:\(\)\s*\{\s*:\|:&\s*\};:/, name: 'fork bomb' },
    { pattern: /DROP\s+TABLE/i, name: 'SQL drop table' },
    { pattern: /TRUNCATE\s+TABLE/i, name: 'SQL truncate' },
  ];
  
  const lines = content.split('\n');
  const matches = [];
  
  for (let i = 0; i < lines.length; i++) {
    for (const { pattern, name } of dangerousPatterns) {
      if (pattern.test(lines[i])) {
        matches.push({ pattern: name, line: i + 1 });
      }
    }
  }
  
  return matches;
}

/**
 * Validate JSON file syntax
 * @param {string} filePath
 * @returns {{valid: boolean, error?: string}}
 */
export function validateJson(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    JSON.parse(content);
    return { valid: true };
  } catch (err) {
    return { valid: false, error: `Invalid JSON: ${err.message}` };
  }
}
