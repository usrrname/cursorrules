#!/usr/bin/env node
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as readline from 'node:readline';
import * as url from 'node:url';
import { parseArgs } from 'node:util';

const baseFolder = '.cursor/';

const packageJson = JSON.parse(
  await fs.readFile(
    url.fileURLToPath(url.resolve(import.meta.url, 'package.json')),
    'utf-8',
  )
);

/** 
 * CLI options @type {import('node:util').ParseArgsConfig}
 */
const config = {
  args: process.argv.slice(2),
  tokens: true,
  options: {
    flat: {
      type: 'boolean',
      short: 'f',
    },
    help: {
      type: 'boolean',
      short: 'h',
      default: false,
    },
    interactive: {
      type: 'boolean',
      short: 'i',
      default: false,
    },
    output: {
      type: 'string',
      short: 'o',
    },
    version: {
      type: 'boolean',
      short: 'v',
    },
  },
}

const help = () => {
  const repository = packageJson.repository.url.replace('git+', '').replace('.git', '');
  const version = packageJson.version;
  return console.info(`
╔══════════════════════════════════════╗
║  @usrrname/cursorrules v${version}   ║
╚══════════════════════════════════════╝
A standard library of Cursor Rules 
...with otaku vibes (✿ᴗ͈ˬᴗ͈)⁾⁾

Usage:
=======================================
npx @usrrname/cursorrules [options]

Options:
-f, --flat: Install without parent directory
-h, --help: Help instructions <----- You are here
-i, --interactive: Interactive rule selection mode
-o, --output: Set output directory (Default: ./output)
-v, --version: Show package version

${repository}
`);
}

const version = () => console.log(`${packageJson.name} v${packageJson.version}`);

/**
 * Scan available rules from standards and test directories
 * @returns {Promise<Object>} Object with categorized rules
 */
const scanAvailableRules = async () => {
  const rulesPath = url.fileURLToPath(url.resolve(import.meta.url, baseFolder + 'rules'));

  const categories = ['standards', 'test', 'utils'];
  let rules = {}

  for (const category of categories) {
    const categoryPath = path.join(rulesPath, category);
    try {
      const files = await fs.readdir(categoryPath);
      rules[category] = files
        .filter(file => file.endsWith('.mdc'))
        .map(file => ({
          name: file.replace('.mdc', ''),
          path: path.join(category, file),
          fullPath: path.join(categoryPath, file)
        }));
    } catch (err) {
      rules[category] = [];
    }
  }

  return rules;
};

/**
 * Simple text-based selection fallback for non-TTY environments
 * @param {Array<string>} allRules - All available rules
 * @returns {Promise<Array<string>} Selected rule paths
 */
const simpleTextSelection = async (allRules) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (query) => new Promise((resolve) => rl.question(query, resolve));

  console.log('\n🎯 Rule Selection Mode (Text Input) ✨');
  console.log('=====================================\n');

  // Display available rules
  console.log('📋 Available Rules:');
  allRules.forEach((rule, index) => {
    console.log(`  ${index + 1}. ${rule.displayName}`);
  });

  console.log('\n💡 Selection Options:');
  console.log('  • Enter numbers separated by commas (e.g., 1,3,5)');
  console.log('  • Enter "all" to select everything');
  console.log('  • Enter "standards" to select all standards rules');
  console.log('  • Enter "test" to select all test rules');
  console.log('  • Press Enter to skip selection\n');

  const answer = await question('🎯 Select rules to install: ');

  if (answer.trim() === '') {
    console.log('⏭️  Skipping rule selection');
    rl.close();
    return [];
  }

  const selectedRules = [];

  switch (answer.toLowerCase()) {

    case "all":
      selectedRules.push(...allRules);
      break;

    case "standards":
      selectedRules.push(...allRules.filter(rule => rule.category === 'standards'));
      break;

    case 'test':
      selectedRules.push(...allRules.filter(rule => rule.category === 'test'));
      break;

    default:
      // Parse comma-separated numbers
      const indices = answer.split(',').map(s => parseInt(s.trim()) - 1);
      for (const index of indices) {
        if (index >= 0 && index < allRules.length) {
          selectedRules.push(allRules[index]);
        }
      }
      break;
  }

  if (selectedRules?.length > 0) {
    console.log('\n✅ Selected Rules:');
    selectedRules.forEach(rule => {
      console.log(`  • ${rule.displayName}`);
    });
  } else {
    console.log('\n⚠️  No valid rules selected');
  }

  rl.close();
  return selectedRules;
};

/**
 * Finds all rules in category and prepares them for display in menu
 * @param  {Object} rules - Available rules by category
 * @returns {Array<{
 *    category: 'standards' | 'utils' | 'test'
 *    displayName: string
 *    selected: boolean
 * }>}
 */
const prepareMenu = (rules) => {
  let allRules = [];
  // Flatten all rules for display in interactive mode
  for (const [category, categoryRules] of Object.entries(rules)) {
    for (const rule of categoryRules) {
      allRules.push({
        ...rule,
        category,
        displayName: `[${category}] ${rule.name}`,
        selected: false
      });
    }
  }
  return allRules;
}

/**
 * Create interactive selection interface with keyboard navigation
 * @param {Object} rules - Available rules by category
 * @returns {Promise<Array<string|undefined>>} Selected rule paths
 */
const interactiveSelection = async (rules) => {
  let allRules = prepareMenu(rules)

  if (allRules.length < 1) {
    console.log('❌ No rules found in standards or test directories');
    return [];
  }

  // Fallback to simple text input if not in TTY
  if (!process.stdin.isTTY) return await simpleTextSelection(allRules);

  let currentIndex = 0;
  let selectedCount = 0;

  // Set up raw mode for keyboard input
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  const renderMenu = () => {
    // Clear screen and move cursor to top
    process.stdout.write('\x1B[2J\x1B[0f');

    console.log('🎯 Interactive Rule Selection Mode ✨');
    console.log('=====================================\n');
    console.log('📋 Available Rules (Use ↑↓ arrows, Space to select, Enter to confirm):\n');

    allRules.forEach((rule, index) => {
      const isSelected = rule.selected;
      const isCurrent = index === currentIndex;
      const indicator = isCurrent ? '▶ ' : '  ';
      const checkbox = isSelected ? '☑' : '☐';
      const highlight = isCurrent ? '\x1B[7m' : '';
      const reset = '\x1B[0m';

      console.log(`${highlight}${indicator}${checkbox} ${rule.displayName}${reset}`);
    });

    console.log(`\n📊 Selected: ${selectedCount}/${allRules?.length} rules`);
    console.log('\n💡 Controls:');
    console.log('  ↑↓ - Navigate  Space - Toggle selection  Enter - Confirm  Esc - Cancel');
    console.log('  A - Select All  S - Standards Only  T - Tests Only  C - Clear All');
  };

  let skipRenderMenu = false;

  return new Promise((resolve) => {

    const handleKeyPress = (key) => {
      if (skipRenderMenu) return;
      switch (key) {
        case '\u0003': // Ctrl+C
        case '\u001b': // Escape
          if (process.stdin.isTTY) {
            process.stdin.setRawMode(false);
          }
          process.stdin.pause();
          process.stdin.removeListener('data', handleKeyPress);
          console.log('\n\n❌ Selection cancelled');
          resolve([]);
          process.exit(1);
          break;

        case '\r': // Enter
        case '\n': // Enter
          // hard return adds a new line with every input 
          // which will cause this function to run again
          skipRenderMenu = true;
          if (process.stdin.isTTY) {
            process.stdin.setRawMode(false);
          }
          process.stdin.pause();
          process.stdin.removeListener('data', handleKeyPress);

          const selectedRules = allRules.filter(rule => rule.selected);

          if (selectedRules.length > 0) {
            console.log('\n\n✅ Selected Rules:');
            selectedRules.forEach(rule => {
              console.log(`  • ${rule.displayName}`);
            });
          } else {
            console.log('\n\n⚠️  No rules selected');
          }
          resolve(selectedRules);
          break;
        case ' ': // Spacebar
          const currentRule = allRules[currentIndex];
          if (currentRule) {
            currentRule.selected = !currentRule.selected;
            selectedCount += currentRule.selected ? 1 : -1;
            renderMenu();
          }
          break;

        case '\u001b[A': // Up arrow
          if (currentIndex > 0) {
            currentIndex--;
            renderMenu();
          }
          break;

        case '\u001b[B': // Down arrow
          if (currentIndex < allRules.length - 1) {
            currentIndex++;
            renderMenu();
          }
          break;

        case 'a': // Quick select all
          allRules.forEach(rule => rule.selected = true);
          selectedCount = allRules.length;
          renderMenu();
          break;

        case 's': // Quick select standards
          allRules.forEach(rule => {
            rule.selected = rule.category === 'standards';
          });
          selectedCount = allRules.filter(rule => rule.category === 'standards').length;
          renderMenu();
          break;

        case 't': // Quick select test
          allRules.forEach(rule => {
            rule.selected = rule.category === 'test';
          });
          selectedCount = allRules.filter(rule => rule.category === 'test').length;
          renderMenu();
          break;

        case 'c': // Clear all
          allRules.forEach(rule => rule.selected = false);
          selectedCount = 0;
          renderMenu();
          break;
      }
    };

    process.stdin.on('data', handleKeyPress);
    renderMenu();
  })
};

/**
 * @param {string} dirname - output folder relative path
 */
const downloadFiles = async (dirname) => {
  if (!dirname) throw new Error('Output directory is required');

  console.info('📥 Downloading all rules...');

  if (dirname.startsWith('=')) dirname = dirname.split('=')[1];

  const outputDir = url.fileURLToPath(url.resolve(import.meta.url, dirname.trim()))

  try {
    // copy whole folder
    await fs.cp(
      url.fileURLToPath(url.resolve(import.meta.url, baseFolder)),
      outputDir,
      { recursive: true },
    )
    console.log(`✅ Success! All rules saved to ${outputDir}`);
  } catch (err) {
    console.error(`❌ Error: ${err.message}`, err);
    process.exit(1);
  }
}

/**
 * Download selected rules only
 * @param {string} dirname - output folder relative path
 * @param {Array<string>} selectedRules - Array of selected rule objects
 */
const downloadSelectedFiles = async (dirname, selectedRules) => {
  if (!dirname) throw new Error('Output directory is required');
  if (!selectedRules || selectedRules.length === 0) {
    console.log('⏭️  No rules selected, skipping download');
    return;
  }

  console.info('📥 Downloading selected rules...');

  if (dirname.startsWith('=')) dirname = dirname.split('=')[1];

  const outputDir = url.fileURLToPath(url.resolve(import.meta.url, dirname.trim()));
  const sourceRulesPath = url.fileURLToPath(url.resolve(import.meta.url, baseFolder + 'rules'));

  try {
    // Create output directory structure
    await fs.mkdir(outputDir, { recursive: true });
    await fs.mkdir(path.join(outputDir, 'rules'), { recursive: true });

    // Copy selected rules
    for (const rule of selectedRules) {
      const sourcePath = path.join(sourceRulesPath, rule.path);
      const destPath = path.join(outputDir, 'rules', rule.path);
      const destDir = path.dirname(destPath);

      // Ensure destination directory exists
      await fs.mkdir(destDir, { recursive: true });

      // Copy the rule file
      await fs.copyFile(sourcePath, destPath);
      console.log(`  ✅ Copied: ${rule.displayName}`);
    }

    console.log(`\n🎉 Success! ${selectedRules.length} selected rules saved to ${outputDir}`);
  } catch (err) {
    console.error(`❌ Error: ${err.message}`, err);
    process.exit(1);
  }
}

async function main() {
  console.log("🚀 Loading @usrrname/cursorrules ...");

  const { values } = parseArgs(config);

  const allowedKeys = ['flat', 'output']

  for (let key in values) {

    if (!allowedKeys.includes(key) && !values[key]) continue;

    switch (key) {
      case 'version':
        await version();
        break;
      case 'help':
        await help();
        break;
      case 'interactive':
          console.log('🎯 Starting interactive mode...');
          const rules = await scanAvailableRules();
          const selectedRules = await interactiveSelection(rules);
        const outputDir = values.output?.toString() ?? `${process.cwd()}/.cursor/`;
          if (selectedRules.length > 0)
            return await downloadSelectedFiles(outputDir, selectedRules);
        break;
      case 'output':
        downloadFiles(values[key]?.toString() ??
          `${process.cwd()}/output/.cursor`);
        break;
      default:
        console.log(`~~~~ 📂 Flattening rules ~~~~`);
        downloadFiles(path.join(process.cwd(), '.cursor'))
        break;
    }
  }
}


try {
  await main();
} catch (err) {
  process.stderr.write('❌ Error: ' + err + '\n');
  process.exit(1);
}
