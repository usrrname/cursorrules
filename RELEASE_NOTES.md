# What's Changed in @usrrname/cursorrules v0.4.1

**Release Date**: 2025-01-16
**Previous Version**: 0.4.0
**Version Bump**: MINOR - New features, performance improvements, and bug fixes
**Branch**: main

## 🚀 New Features
- **Vue 3 and TypeScript Standards Rules** ([09181b0](https://github.com/usrrname/cursorrules/commit/09181b0375587b9ec173129ff152a192cc896064)) - Added comprehensive Vue 3 with TypeScript development standards and best practices rules for improved development practices (#43)

## 🐛 Bug Fixes  
- **Rule Globs Field Population** ([84e28a2](https://github.com/usrrname/cursorrules/commit/84e28a2e8102ed865c171267303b2a24e644b6bf)) - Fixed rule globs to properly populate cursor rules "apply to specific files" fields, improved glob syntax across multiple rules (#39)
- **Cursor Memory Folder Location** ([6de6118](https://github.com/usrrname/cursorrules/commit/6de6118a915bef5611729aa80b52f3449565ccb7)) - Fixed cursor memory folder location from `.ai/` to `.cursor/.ai/` for consistency across documentation and workflows (#38)
- **Publish Workflow Exit Handling** ([8e31890](https://github.com/usrrname/cursorrules/commit/8e31890b3872c5a2ca664752c90a0da87e3ef4a3)) - Fixed publish workflow to allow non-tag events to exit gracefully

## ⚡ Performance Improvements
- **Token Efficiency Optimization** ([dce194b](https://github.com/usrrname/cursorrules/commit/dce194bb4369b31efb56f5a6a5d876891f86d9e5)) - Shortened fair witness, typescript standards and agent-communication rules for token efficiency (#36)

## 💥 Breaking Changes
- **Context Information Display Rule Removal** ([bc29738](https://github.com/usrrname/cursorrules/commit/bc29738287dc4556625dd382f3005091702d409b)) - Removed unreliable context information display rule from utils - this rule was causing inconsistent behavior (#35)

## 📚 Documentation
- **AI Model Support Information** ([deeef1f](https://github.com/usrrname/cursorrules/commit/deeef1ff3a2c5c637ba69e9fba555cf677fe45a1)) - Updated supported models section, added new supported models documentation including autoRunLint option (#40)
- **Release Notes and Changelog** ([9aafe7b](https://github.com/usrrname/cursorrules/commit/9aafe7b65eef390cf4eb6ea36c7c2976131e4225)) - Comprehensive release notes for v0.4.0 with performance optimizations, workflow improvements, and removal of deprecated features (#37)

## 🔧 Other Changes
- **CI/CD Improvements** ([5411cb3](https://github.com/usrrname/cursorrules/commit/5411cb37939fbc59c2e8c7cf0eb47d8f9187966b)) - Updated publish workflow to include manual trigger option
- **Package Validation Enhancement** ([5168d7b](https://github.com/usrrname/cursorrules/commit/5168d7bf27a5a7cf6953b1cb94317fd5e5a3f6af)) - Added condition to check if package.json version is extracted in publish workflow
- **Environment Maintenance** ([c4c8568](https://github.com/usrrname/cursorrules/commit/c4c85686debef46dc2ebbcb5362b8ee669d40001)) - Updated environment variables, Node.js version to v22.18.0, and npm version maintenance (#34)

## 📋 Migration Notes

### Breaking Changes
- **Context Information Display**: If you were relying on the context information display rule, please note it has been removed due to reliability issues. Consider implementing your own context tracking if needed.

### Directory Structure Changes
- **Memory Folder Location**: Projects using the agentic workflow should update references from `.ai/` to `.cursor/.ai/` for user stories, architecture documents, and project memory.

## 🎯 Release Summary
- **Total Commits**: 12 commits analyzed
- **New Features**: 1 (Vue 3 + TypeScript standards)
- **Bug Fixes**: 3 (rule globs, memory location, CI/CD)
- **Performance Improvements**: 1 (token efficiency)
- **Breaking Changes**: 1 (context display rule removal)
- **Documentation Updates**: 2 (AI models, release notes)
- **Other Improvements**: 3 (CI/CD enhancements, maintenance)

This patch release focuses on improving development standards, fixing critical bugs, optimizing performance, and enhancing the overall developer experience while maintaining backward compatibility where possible.