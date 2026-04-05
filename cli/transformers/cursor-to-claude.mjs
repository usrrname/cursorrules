#!/usr/bin/env node
/**
 * Cursor to Claude Rule Transformer
 * 
 * Transforms Cursor .mdc rule files (with YAML frontmatter) to Claude-compatible .md format.
 * 
 * Usage:
 *   node transformers/cursor-to-claude.mjs <input.mdc> <output.md>
 *   node transformers/cursor-to-claude.mjs --batch <input-dir> <output-dir>
 */

import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from 'fs';
import { join, dirname, basename, extname } from 'path';

/**
 * Parse YAML frontmatter from markdown content
 * @param {string} content - File content
 * @returns {{frontmatter: Record<string, string>, body: string}}
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  
  if (!match) {
    return { frontmatter: {}, body: content };
  }
  
  const frontmatterText = match[1];
  const body = match[2];
  /** @type {Record<string, string>} */
  const frontmatter = {};
  
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      frontmatter[key] = value;
    }
  });
  
  return { frontmatter, body };
}

/**
 * Transform a single rule file
 * @param {string} mdcContent - Cursor .mdc file content
 * @returns {string} - Claude .md file content
 */
export function transformRule(mdcContent) {
  const { frontmatter, body } = parseFrontmatter(mdcContent);
  
  let claudeContent = '';
  
  // Add header with metadata
  if (frontmatter.description) {
    claudeContent += `# ${frontmatter.description.split('.')[0]}\n\n`;
    claudeContent += `## Description\n${frontmatter.description}\n\n`;
  }
  
  // Add applicability section from frontmatter
  if (frontmatter.globs || frontmatter.alwaysApply !== undefined) {
    claudeContent += `## Applicability\n`;
    if (frontmatter.globs) {
      claudeContent += `- **Files:** \`${frontmatter.globs}\`\n`;
    }
    if (frontmatter.alwaysApply) {
      claudeContent += `- **Always Apply:** ${frontmatter.alwaysApply}\n`;
    }
    claudeContent += '\n';
  }
  
  // Process the body - extract critical rules
  const criticalRulesMatch = body.match(/## Critical Rules\s*\n([\s\S]*?)(?=\n## |\n<rule>|$)/);
  if (criticalRulesMatch) {
    claudeContent += `## Rules\n${criticalRulesMatch[1].trim()}\n\n`;
  }
  
  // Process rule XML blocks
  const ruleBlocks = body.matchAll(/<rule>[\s\S]*?<\/rule>/g);
  for (const block of ruleBlocks) {
    const ruleXml = block[0];
    const nameMatch = ruleXml.match(/<rule>\s*\nname:\s*(.+)/);
    const descMatch = ruleXml.match(/description:\s*(.+)/);
    
    if (nameMatch) {
      claudeContent += `### ${nameMatch[1].trim()}\n\n`;
      if (descMatch) {
        claudeContent += `${descMatch[1].trim()}\n\n`;
      }
      
      // Extract actions
      const actionsMatch = ruleXml.match(/actions:\s*\n([\s\S]*?)(?=\n  \w+:|$)/);
      if (actionsMatch) {
        claudeContent += `**Actions:**\n${actionsMatch[1]}\n\n`;
      }
    }
  }
  
  // Add remaining content (examples, tests, etc.)
  const remainingContent = body
    .replace(/---[\s\S]*?---\s*\n/, '')
    .replace(/## Critical Rules\s*\n[\s\S]*?(?=\n## |\n<rule>|$)/, '')
    .replace(/<rule>[\s\S]*?<\/rule>/g, '')
    .trim();
  
  if (remainingContent) {
    claudeContent += `## Additional Information\n${remainingContent}\n`;
  }
  
  return claudeContent.trim();
}

/**
 * Transform a directory of rules
 * @param {string} inputDir - Directory containing .mdc files
 * @param {string} outputDir - Directory for .md files
 */
export function transformDirectory(inputDir, outputDir) {
  const entries = readdirSync(inputDir, { withFileTypes: true });
  
  for (const entry of entries) {
    const inputPath = join(inputDir, entry.name);
    
    if (entry.isDirectory()) {
      const outputSubdir = join(outputDir, entry.name);
      mkdirSync(outputSubdir, { recursive: true });
      transformDirectory(inputPath, outputSubdir);
    } else if (entry.isFile() && extname(entry.name) === '.mdc') {
      const mdcContent = readFileSync(inputPath, 'utf-8');
      const mdContent = transformRule(mdcContent);
      const outputPath = join(outputDir, basename(entry.name, '.mdc') + '.md');
      writeFileSync(outputPath, mdContent);
      console.log(`✓ Transformed: ${entry.name} → ${basename(outputPath)}`);
    }
  }
}

// CLI usage
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node cursor-to-claude.mjs <input.mdc> <output.md>');
    console.log('       node cursor-to-claude.mjs --batch <input-dir> <output-dir>');
    process.exit(1);
  }
  
  if (args[0] === '--batch') {
    const [, inputDir, outputDir] = args;
    mkdirSync(outputDir, { recursive: true });
    transformDirectory(inputDir, outputDir);
    console.log('\n✅ Batch transformation complete!');
  } else {
    const [inputFile, outputFile] = args;
    const mdcContent = readFileSync(inputFile, 'utf-8');
    const mdContent = transformRule(mdcContent);
    writeFileSync(outputFile, mdContent);
    console.log(`✅ Transformed: ${inputFile} → ${outputFile}`);
  }
}
