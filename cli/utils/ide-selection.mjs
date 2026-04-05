#!/usr/bin/env node
import * as readline from 'node:readline';
import { stdin, stdout } from 'node:process';

/**
 * Interactive IDE selection prompt
 * @returns {Promise<'cursor'|'claude'|'both'>}
 */
export async function selectIde() {
    const rl = readline.createInterface({
        input: stdin,
        output: stdout
    });

    console.log('\n╔══════════════════════════════════════╗');
    console.log('║  Which AI IDE are you using?         ║');
    console.log('╠══════════════════════════════════════╣');
    console.log('║  [1] Cursor                          ║');
    console.log('║  [2] Claude Code                     ║');
    console.log('║  [3] Both (dual setup)               ║');
    console.log('╚══════════════════════════════════════╝\n');

    return new Promise((resolve) => {
        rl.question('Enter your choice (1-3): ', (answer) => {
            rl.close();
            const choice = answer.trim();
            switch (choice) {
                case '1':
                    console.log('✅ Selected: Cursor');
                    resolve('cursor');
                    break;
                case '2':
                    console.log('✅ Selected: Claude Code');
                    resolve('claude');
                    break;
                case '3':
                    console.log('✅ Selected: Both');
                    resolve('both');
                    break;
                default:
                    console.log('⚠️  Invalid choice. Defaulting to Cursor.');
                    resolve('cursor');
            }
        });
    });
}

/**
 * Validate IDE choice
 * @param {string} ide
 * @returns {string|null}
 */
export function validateIde(ide) {
    const validIdes = ['cursor', 'claude', 'both'];
    const normalized = ide?.toLowerCase().trim();
    return validIdes.includes(normalized) ? normalized : null;
}

/**
 * Get IDE display name
 * @param {string} ide
 * @returns {string}
 */
export function getIdeDisplayName(ide) {
    if (ide === 'cursor') return 'Cursor';
    if (ide === 'claude') return 'Claude Code';
    if (ide === 'both') return 'Both';
    return ide;
}
