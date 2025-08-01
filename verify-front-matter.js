#!/usr/bin/env node

/**
 * Front Matter Verification Script
 * Ensures all optimized cursorrules have properly formatted front matter
 */

import fs from 'fs';

// Rules to verify
const rulesToVerify = [
  { name: 'fair-witness-agent', path: '.cursor/rules/core/fair-witness-agent.mdc' },
  { name: 'agent-communication', path: '.cursor/rules/utils/agent-communication.mdc' },
  { name: 'typescript-standards', path: '.cursor/rules/standards/typescript-standards-auto.mdc' }
];

function verifyFrontMatter(content, ruleName) {
  const issues = [];
  
  // Check if front matter exists
  if (!content.startsWith('---')) {
    issues.push('Missing front matter (file should start with ---)');
    return issues;
  }
  
  // Extract front matter
  const frontMatterEnd = content.indexOf('---', 3);
  if (frontMatterEnd === -1) {
    issues.push('Front matter not properly closed (missing closing ---)');
    return issues;
  }
  
  const frontMatter = content.substring(3, frontMatterEnd).trim();
  
  // Check for required fields
  const requiredFields = ['description', 'globs', 'alwaysApply'];
  
  requiredFields.forEach(field => {
    if (!frontMatter.includes(`${field}:`)) {
      issues.push(`Missing required field: ${field}`);
    }
  });
  
  // Check for proper YAML formatting
  const lines = frontMatter.split('\n');
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.includes(':') && !trimmed.startsWith('#')) {
      issues.push(`Invalid YAML format in line ${index + 1}: "${trimmed}"`);
    }
  });
  
  return issues;
}

function verifyRuleStructure(content, ruleName) {
  const issues = [];
  
  // Check for required sections
  if (!content.includes('<rule>')) {
    issues.push('Missing <rule> tag');
  }
  
  if (!content.includes('name:')) {
    issues.push('Missing rule name in <rule> section');
  }
  
  if (!content.includes('description:')) {
    issues.push('Missing rule description in <rule> section');
  }
  
  if (!content.includes('filters:')) {
    issues.push('Missing filters section in <rule>');
  }
  
  if (!content.includes('actions:')) {
    issues.push('Missing actions section in <rule>');
  }
  
  // Check for critical rules section
  if (!content.includes('## Critical Rules')) {
    issues.push('Missing Critical Rules section');
  }
  
  return issues;
}

function runFrontMatterVerification() {
  console.log('🔍 Verifying Front Matter for Optimized Rules\n');
  
  let totalIssues = 0;
  let allValid = true;
  
  rulesToVerify.forEach(rule => {
    console.log(`\n📋 Verifying: ${rule.name}`);
    
    if (!fs.existsSync(rule.path)) {
      console.log(`❌ FAIL: Rule file not found: ${rule.path}`);
      totalIssues++;
      allValid = false;
      return;
    }
    
    const content = fs.readFileSync(rule.path, 'utf8');
    
    // Verify front matter
    const frontMatterIssues = verifyFrontMatter(content, rule.name);
    
    // Verify rule structure
    const structureIssues = verifyRuleStructure(content, rule.name);
    
    const allIssues = [...frontMatterIssues, ...structureIssues];
    
    if (allIssues.length > 0) {
      console.log(`❌ FAIL: Issues found:`);
      allIssues.forEach(issue => console.log(`   - ${issue}`));
      totalIssues += allIssues.length;
      allValid = false;
    } else {
      console.log(`✅ PASS: Front matter and structure are valid`);
      
      // Show front matter preview
      const frontMatterEnd = content.indexOf('---', 3);
      const frontMatter = content.substring(0, frontMatterEnd + 3);
      console.log(`   Front matter preview:`);
      console.log(`   ${frontMatter.split('\n').map(line => `   ${line}`).join('\n')}`);
    }
  });
  
  // Summary
  console.log(`\n📊 Front Matter Verification Results:`);
  console.log(`   Total issues found: ${totalIssues}`);
  console.log(`   All rules valid: ${allValid ? '✅ YES' : '❌ NO'}`);
  
  if (allValid) {
    console.log('\n🎉 All optimized rules have properly formatted front matter!');
    console.log('   Cursor should be able to recognize and parse all rules correctly.');
  } else {
    console.log('\n⚠️  Some front matter issues found. Please fix before deployment.');
  }
  
  return allValid;
}

// Run the verification
runFrontMatterVerification();