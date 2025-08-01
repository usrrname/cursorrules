#!/usr/bin/env node

/**
 * Compatibility Check Script
 * Ensures optimized cursorrules respect existing dependencies and references
 */

import fs from 'fs';
import path from 'path';

// Critical elements that must be preserved
const criticalElements = {
  'fair-witness-agent': {
    requiredContent: [
      'Fair Witness',
      'epistemological functions',
      'observer',
      'evaluator', 
      'analyst',
      'synthesist',
      'communicator',
      'name: fair-witness-agent'
    ],
    requiredPatterns: [
      'explain|analyze|describe|review|fair witness|assess|compare|evaluate'
    ]
  },
  'agent-communication': {
    requiredContent: [
      'Agent Communication Standards',
      'otaku expressions',
      'anime references',
      'kawaii',
      'name: agent-communication'
    ],
    requiredPatterns: [
      'chat_start|chat_response'
    ]
  },
  'typescript-standards': {
    requiredContent: [
      'TypeScript Standards',
      'strict mode',
      'explicitly declare types',
      'name: typescript-standards'
    ],
    requiredPatterns: [
      '\\.(ts|tsx)$'
    ]
  }
};

// Files that reference the optimized rules
const dependentFiles = [
  '.cursor/modes.json',
  '.cursor/rules/workflows/pm-story.mdc',
  '.cursor/rules/workflows/dev-workflow.mdc',
  '.cursor/rules/workflows/dev-spike.mdc',
  '.cursor/rules/workflows/arch.mdc',
  'README.md',
  'docs/fair-witness-examples.md'
];

function checkRuleCompatibility(ruleName, ruleContent) {
  const requirements = criticalElements[ruleName];
  if (!requirements) {
    return { compatible: true, issues: [] };
  }

  const issues = [];
  
  // Check required content (case-insensitive)
  requirements.requiredContent.forEach(content => {
    if (!ruleContent.toLowerCase().includes(content.toLowerCase())) {
      issues.push(`Missing required content: "${content}"`);
    }
  });
  
  // Check required patterns
  requirements.requiredPatterns.forEach(pattern => {
    if (!ruleContent.includes(pattern)) {
      issues.push(`Missing required pattern: "${pattern}"`);
    }
  });
  
  return {
    compatible: issues.length === 0,
    issues
  };
}

function checkDependentFiles() {
  const issues = [];
  
  dependentFiles.forEach(filePath => {
    if (!fs.existsSync(filePath)) {
      issues.push(`Dependent file not found: ${filePath}`);
      return;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for references to optimized rules
    if (filePath.includes('modes.json')) {
      if (!content.includes('FairWitness')) {
        issues.push(`modes.json missing FairWitness agent reference`);
      }
    }
    
    if (filePath.includes('pm-story.mdc')) {
      if (!content.includes('KawaiiSamurai')) {
        issues.push(`pm-story.mdc missing KawaiiSamurai reference`);
      }
    }
    
    if (filePath.includes('dev-workflow.mdc')) {
      if (!content.includes('Communication Guidelines')) {
        issues.push(`dev-workflow.mdc missing Communication Guidelines section`);
      }
    }
  });
  
  return issues;
}

function checkRuleStructure(ruleContent, ruleName) {
  const issues = [];
  
  // Check for required YAML structure
  if (!ruleContent.includes('<rule>')) {
    issues.push('Missing <rule> tag');
  }
  
  if (!ruleContent.includes('name:')) {
    issues.push('Missing rule name');
  }
  
  if (!ruleContent.includes('description:')) {
    issues.push('Missing rule description');
  }
  
  if (!ruleContent.includes('filters:')) {
    issues.push('Missing filters section');
  }
  
  if (!ruleContent.includes('actions:')) {
    issues.push('Missing actions section');
  }
  
  // Check for critical rules section
  if (!ruleContent.includes('## Critical Rules')) {
    issues.push('Missing Critical Rules section');
  }
  
  return issues;
}

function runCompatibilityCheck() {
  console.log('🔍 Running Compatibility Check for Optimized Rules\n');
  
  const optimizedRules = [
    { name: 'fair-witness-agent', path: '.cursor/rules/core/fair-witness-agent.mdc' },
    { name: 'agent-communication', path: '.cursor/rules/utils/agent-communication.mdc' },
    { name: 'typescript-standards', path: '.cursor/rules/standards/typescript-standards-auto.mdc' }
  ];
  
  let totalIssues = 0;
  let allCompatible = true;
  
  optimizedRules.forEach(rule => {
    console.log(`\n📋 Checking: ${rule.name}`);
    
    if (!fs.existsSync(rule.path)) {
      console.log(`❌ FAIL: Rule file not found: ${rule.path}`);
      totalIssues++;
      allCompatible = false;
      return;
    }
    
    const ruleContent = fs.readFileSync(rule.path, 'utf8');
    
    // Check rule compatibility
    const compatibility = checkRuleCompatibility(rule.name, ruleContent);
    
    // Check rule structure
    const structureIssues = checkRuleStructure(ruleContent, rule.name);
    
    const allIssues = [...compatibility.issues, ...structureIssues];
    
    if (allIssues.length > 0) {
      console.log(`❌ FAIL: Compatibility issues found:`);
      allIssues.forEach(issue => console.log(`   - ${issue}`));
      totalIssues += allIssues.length;
      allCompatible = false;
    } else {
      console.log(`✅ PASS: Rule is compatible and well-structured`);
    }
  });
  
  // Check dependent files
  console.log(`\n📋 Checking dependent files...`);
  const dependentIssues = checkDependentFiles();
  
  if (dependentIssues.length > 0) {
    console.log(`❌ FAIL: Dependent file issues found:`);
    dependentIssues.forEach(issue => console.log(`   - ${issue}`));
    totalIssues += dependentIssues.length;
    allCompatible = false;
  } else {
    console.log(`✅ PASS: All dependent files are compatible`);
  }
  
  // Summary
  console.log(`\n📊 Compatibility Check Results:`);
  console.log(`   Total issues found: ${totalIssues}`);
  console.log(`   All rules compatible: ${allCompatible ? '✅ YES' : '❌ NO'}`);
  
  if (allCompatible) {
    console.log('\n🎉 All optimized rules are fully compatible with existing codebase!');
  } else {
    console.log('\n⚠️  Some compatibility issues found. Please review and fix before deployment.');
  }
  
  return allCompatible;
}

// Run the compatibility check
runCompatibilityCheck();