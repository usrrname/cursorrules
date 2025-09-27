# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

No unreleased changes.

---

## [v0.5.9] - 2025-01-16

### 🎨 Enhanced
- **Interactive Menu Styling** ([99277c8](https://github.com/usrrname/cursorrules/commit/99277c8)) - Simplified display name formatting and enhanced menu title styling in interactive menu for better user experience

### 📚 Documentation
- **README Updates** ([cce3e49](https://github.com/usrrname/cursorrules/commit/cce3e49)) - Updated README with latest information and improvements

### 🔧 Technical Improvements
- **Debug Logging Cleanup** ([8576100](https://github.com/usrrname/cursorrules/commit/8576100)) - Removed console log statements for source and destination paths in downloadSelectedFiles function for cleaner output
- **Changelog Maintenance** ([e76b857](https://github.com/usrrname/cursorrules/commit/e76b857)) - Updated changelog for v0.5.8 release

---

## [v0.5.8] - 2025-01-16

### 🐛 Fixed
- **Error Handling for File Downloads** ([0046f06](https://github.com/usrrname/cursorrules/commit/0046f06)) - Added error handling for undefined sourceRulesBasePath and improved logging for source/destination paths during file download
- **Node.js Compatibility** ([5839ecf](https://github.com/usrrname/cursorrules/commit/5839ecf)) - Safely import styleText from util with fallback for better compatibility across Node.js versions

### 📚 Documentation
- **README Updates** ([ab844f2](https://github.com/usrrname/cursorrules/commit/ab844f2)) - Updated README.md with latest information and improvements

---

## [v0.5.8-alpha.1] - 2025-01-16

### 🐛 Fixed
- **Error Handling for File Downloads** ([0046f06](https://github.com/usrrname/cursorrules/commit/0046f06)) - Added error handling for undefined sourceRulesBasePath and improved logging for source/destination paths during file download
- **Node.js Compatibility** ([5839ecf](https://github.com/usrrname/cursorrules/commit/5839ecf)) - Safely import styleText from util with fallback for better compatibility across Node.js versions

### 📚 Documentation
- **README Updates** ([ab844f2](https://github.com/usrrname/cursorrules/commit/ab844f2)) - Updated README.md with latest information and improvements

---

## [v0.5.7] - 2025-01-16

### 🐛 Fixed
- **Node.js 18/20 Compatibility** ([20f0b50](https://github.com/usrrname/cursorrules/commit/20f0b50)) - Ensured compatibility with Node 18/20 by safely importing styleText from util

---

## [v0.5.6] - 2025-01-16

### 🐛 Fixed
- **NPX Sandbox Detection** ([097eb99](https://github.com/usrrname/cursorrules/commit/097eb99)) - Fixed sourceRulesBasePath initialization for npx sandbox detection

---

## [v0.5.5] - 2025-01-16

### 🐛 Fixed
- **Default Output Directory** ([d62d682](https://github.com/usrrname/cursorrules/commit/d62d682)) - Fixed default output directory to use current working directory (cwd) (#64)

---

## [v0.5.4] - 2025-01-16

### 🎨 Enhanced
- **Interactive Menu Styling** ([6a58067](https://github.com/usrrname/cursorrules/commit/6a58067)) - Enhanced interactive menu styling for improved readability
- **Rule Category Menu** ([7c0fec7](https://github.com/usrrname/cursorrules/commit/7c0fec7)) - Updated rule category menu title for better visibility

---

## [v0.5.3] - 2025-01-16

### 🎨 Enhanced
- **Help Command Styling** ([ba16bd9](https://github.com/usrrname/cursorrules/commit/ba16bd9)) - Updated help command title styling for improved visibility

---

## [v0.5.2] - 2025-01-16

### 🚀 Added
- **Enhanced Help Command** ([11d84f4](https://github.com/usrrname/cursorrules/commit/11d84f4)) - Enhanced help command output with styled text and dynamic options (#63)

### 🔧 Technical Improvements
- **Debug Logging Cleanup** ([13bb61f](https://github.com/usrrname/cursorrules/commit/13bb61f)) - Cleaned up debug logging for better performance

---

## [v0.5.2-beta.4] - 2025-01-16

### 🐛 Fixed
- **NPX Sandbox Detection** ([632da1b](https://github.com/usrrname/cursorrules/commit/632da1b)) - Improved npx sandbox detection (#62)

---

## [v0.5.2-beta.3] - 2025-01-16

### 🚀 Added
- **Debug Logging** ([9af5179](https://github.com/usrrname/cursorrules/commit/9af5179)) - Added debug logging for npm prefix and npx sandbox detection in download utilities (#61)

---

## [v0.5.2-beta.2] - 2025-01-16

### 🐛 Fixed
- **NPX Support** ([0d052c6](https://github.com/usrrname/cursorrules/commit/0d052c6)) - Exposed `cli/` folder to enable npx functionality (#60)

---

## [v0.5.0] - 2024-12-19

### 🚀 Added
- **Fair Witness Agent** 🪄📜 - New analytical agent using 5 epistemological functions (observer, evaluator, analyst, synthesist, communicator) for structured, objective topic analysis with customizable complexity and tone
- **Dependency Analysis Agent** - Comprehensive dependency analysis with maintenance frequency, security vulnerabilities, and popularity metrics
- **Security Scan Agent** - Deep security scanning including CVE analysis, license compliance, and supply chain risk assessment

### 🛠️ Enhanced
- **Expanded Agent Roster** - Added 3 new specialized agents (FairWitness, DependencyAnalysis, SecurityScan) to the existing 8-agent team
- **Improved Agent Capabilities** - Enhanced existing agents with better tool access and workflow integration
- **Better Agent Communication** - Refined personality traits and communication styles for more effective collaboration

### 📚 Documentation
- **Fair Witness Framework Documentation** - Comprehensive examples and usage patterns for the new analytical framework
- **Enhanced Release Workflow** - Improved automated release notes and changelog generation
- **Better Project Structure** - Organized rules into logical categories (core, standards, templates, utils, workflows)

### 🔧 Technical Improvements
- **Updated Dependencies** - Latest package versions and security updates
- **Better Error Handling** - Improved CLI error messages and user experience
- **Enhanced Testing** - Expanded test coverage for new features

---

## [v0.4.1] - 2025-01-16

### 🔧 Technical Improvements
- **Package Version Bump** ([b883001](https://github.com/usrrname/cursorrules/commit/b883001)) - Updated package version to 0.4.1

---

## [v0.4.0] - 2025-01-16

### 🚀 Added
- **Vue 3 and TypeScript Standards Rules** ([09181b0](https://github.com/usrrname/cursorrules/commit/09181b0375587b9ec173129ff152a192cc896064)) - Added comprehensive Vue 3 with TypeScript development standards and best practices rules for improved development practices (#43)

### 🐛 Fixed
- **Rule Globs Field Population** ([84e28a2](https://github.com/usrrname/cursorrules/commit/84e28a2e8102ed865c171267303b2a24e644b6bf)) - Fixed rule globs to properly populate cursor rules "apply to specific files" fields, improved glob syntax across multiple rules (#39)
- **Cursor Memory Folder Location** ([6de6118](https://github.com/usrrname/cursorrules/commit/6de6118a915bef5611729aa80b52f3449565ccb7)) - Fixed cursor memory folder location from `.ai/` to `.cursor/.ai/` for consistency across documentation and workflows (#38)
- **Publish Workflow Exit Handling** ([8e31890](https://github.com/usrrname/cursorrules/commit/8e31890b3872c5a2ca664752c90a0da87e3ef4a3)) - Updated publish workflow to allow non-tag events to exit gracefully

### ⚡ Performance
- **Token Efficiency Optimization** ([dce194b](https://github.com/usrrname/cursorrules/commit/dce194bb4369b31efb56f5a6a5d876891f86d9e5)) - Shortened fair witness, TypeScript standards and agent-communication rules for improved token efficiency (#36)

### 💥 Changed
- **Context Information Display Rule Removal** ([bc29738](https://github.com/usrrname/cursorrules/commit/bc29738287dc4556625dd382f3005091702d409b)) - Removed unreliable context information display rule from utils due to reliability issues (#35)

### 📚 Documentation
- **AI Model Support Information** ([deeef1f](https://github.com/usrrname/cursorrules/commit/deeef1ff3a2c5c637ba69e9fba555cf677fe45a1)) - Updated supported models section, added new supported models documentation including autoRunLint option (#40)

### 🔧 Technical Improvements
- **CI Workflow Enhancement** ([5168d7b](https://github.com/usrrname/cursorrules/commit/5168d7bf27a5a7cf6953b1cb94317fd5e5a3f6af)) - Added condition to check if package.json version is extracted in publish workflow
- **Manual Trigger for Publish Workflow** ([5411cb3](https://github.com/usrrname/cursorrules/commit/5411cb37939fbc59c2e8c7cf0eb47d8f9187966b)) - Updated publish workflow to include manual trigger option
- **Environment and Dependencies Update** ([c4c8568](https://github.com/usrrname/cursorrules/commit/c4c85686debef46dc2ebbcb5362b8ee669d40001)) - Updated environment variables, Node.js version to v22.18.0, and npm version (#34)

---

## [v0.3.0] - 2025-01-12

### 🚀 Added
- **Cloudflare Workers Development Standards** ([0272363](https://github.com/usrrname/cursorrules/commit/0272363)) - Comprehensive standards for Cloudflare Workers development with general best practices
- **Cloudflare Workers with Hono Framework** ([0272363](https://github.com/usrrname/cursorrules/commit/0272363)) - Specialized standards for using the Hono framework with Cloudflare Workers, including TypeScript integration and framework-specific patterns
- **Enhanced Environment Security** ([1db2a6d](https://github.com/usrrname/cursorrules/commit/1db2a6d)) - Added varlock integration with environment schema and type definitions for TAVILY_API_KEY

### 🔧 Technical Improvements
- **Environment Schema Updates** ([1db2a6d](https://github.com/usrrname/cursorrules/commit/1db2a6d)) - Updated `.env.schema` to mark sensitive variables appropriately with proper documentation
- **Type Definitions** ([1db2a6d](https://github.com/usrrname/cursorrules/commit/1db2a6d)) - Enhanced TypeScript definitions for better development experience and type safety
- **Package Dependencies** ([1db2a6d](https://github.com/usrrname/cursorrules/commit/1db2a6d)) - Updated to support new security features and varlock integration

### 📚 Documentation
- **Cloudflare Workers Guidelines** ([0272363](https://github.com/usrrname/cursorrules/commit/0272363)) - Comprehensive examples and usage guidelines for both general Workers development and Hono framework integration
- **Environment Variable Documentation** ([1db2a6d](https://github.com/usrrname/cursorrules/commit/1db2a6d)) - Enhanced documentation for secure configuration management

---

## [v0.1.4] - 2024-12-19

### 🚀 Added
- **Enhanced CI/CD Workflow** ([59ecea0](https://github.com/usrrname/cursorrules/commit/59ecea0)) - Enhanced publish workflow to trigger on version tag pushes
- **Dependency Analysis Agent** ([34ac59a](https://github.com/usrrname/cursorrules/commit/34ac59a)) - Enhanced dependency analysis agent with user input filters
- **Changelog and Release Workflow** ([faad7a7](https://github.com/usrrname/cursorrules/commit/faad7a7)) - Added changelog and release workflow with release notes

### 🐛 Fixed
- **Security Scan Glob Patterns** ([b6ab515](https://github.com/usrrname/cursorrules/commit/b6ab515)) - Fixed globs for security-scan-agent rule to include bun.lockb

### 📚 Documentation
- **README and Release Documentation** ([cdb095b](https://github.com/usrrname/cursorrules/commit/cdb095b)) - Updated README and release workflow documentation

---

## [v0.1.3] - 2024-12-15

### 🚀 Added
- **Core Agent Framework** - Initial implementation of cursor rules agent system
- **Testing Pyramid Agent** - Enforces testing standards based on testing pyramid principle
- **Git Commit Standards** - Automated git commit and push workflow with standards enforcement
- **Laravel PHP Standards** - Laravel and PHP development standards implementation

### 🐛 Fixed
- **Rule Generation** - Fixed various issues in cursor rule generation and validation
- **Documentation Formatting** - Corrected formatting issues in documentation files

### 📚 Documentation
- **Fair Witness Examples** - Added comprehensive examples for Fair Witness agent usage
- **Lean Workflow Documentation** - Documented lean development workflow processes
- **Modes Format Documentation** - Added detailed documentation for agent modes format

---

## [v0.1.2] - 2024-12-10

### 🚀 Added
- **Release Validation System** - Validates release prerequisites including branch naming and package.json structure
- **Package Version Management** - Automated package.json version updates with commit management
- **Git Tag Management** - Comprehensive git tag creation and conflict resolution

### 🐛 Fixed
- **Workflow Dependencies** - Fixed dependency issues in release workflow
- **Configuration Validation** - Improved validation for configuration files

---

## [v0.1.1] - 2024-12-05

### 🚀 Added
- **Basic Agent System** - Core functionality for cursor rules agents
- **Rule Validation** - Basic validation system for cursor rules
- **CLI Interface** - Command-line interface for rule management

### 🐛 Fixed
- **Installation Issues** - Fixed various installation and setup issues
- **Rule Processing** - Improved rule processing and validation

---

## [v0.1.0] - 2024-12-01

### 🚀 Added
- **Initial Release** - Core cursor rules standard library
- **Agent Framework** - Basic framework for AI agents in Cursor
- **Rule System** - Foundational rule system for code standards
- **Package Structure** - Initial npm package structure and configuration

## [v0.2.1] - 2025-06-24

### 🐛 Fixed
- **Front matter description population** ([#27](https://github.com/usrrname/cursorrules/pull/27)) - Fixed inconsistent description field in generated rule front matter
- **Publish workflow version validation** ([#25](https://github.com/usrrname/cursorrules/pull/25)) - Ensured package.json version is validated against release tags during publish workflow

### 📚 Documentation
- **Release documentation for v0.2.0** ([#24](https://github.com/usrrname/cursorrules/pull/24)) - Added comprehensive release notes and changelog updates for previous version

---

[Unreleased]: https://github.com/usrrname/cursorrules/compare/v0.5.9...HEAD
[v0.5.9]: https://github.com/usrrname/cursorrules/compare/v0.5.8...v0.5.9
[v0.5.8]: https://github.com/usrrname/cursorrules/compare/v0.5.8-alpha.1...v0.5.8
[v0.5.8-alpha.1]: https://github.com/usrrname/cursorrules/compare/v0.5.7...v0.5.8-alpha.1
[v0.5.7]: https://github.com/usrrname/cursorrules/compare/v0.5.6...v0.5.7
[v0.5.6]: https://github.com/usrrname/cursorrules/compare/v0.5.5...v0.5.6
[v0.5.5]: https://github.com/usrrname/cursorrules/compare/v0.5.4...v0.5.5
[v0.5.4]: https://github.com/usrrname/cursorrules/compare/v0.5.3...v0.5.4
[v0.5.3]: https://github.com/usrrname/cursorrules/compare/v0.5.2...v0.5.3
[v0.5.2]: https://github.com/usrrname/cursorrules/compare/v0.5.2-beta.4...v0.5.2
[v0.5.2-beta.4]: https://github.com/usrrname/cursorrules/compare/v0.5.2-beta.3...v0.5.2-beta.4
[v0.5.2-beta.3]: https://github.com/usrrname/cursorrules/compare/v0.5.2-beta.2...v0.5.2-beta.3
[v0.5.2-beta.2]: https://github.com/usrrname/cursorrules/compare/v0.5.0...v0.5.2-beta.2
[v0.5.0]: https://github.com/usrrname/cursorrules/compare/v0.4.1...v0.5.0
[v0.4.1]: https://github.com/usrrname/cursorrules/compare/v0.4.0...v0.4.1
[v0.4.0]: https://github.com/usrrname/cursorrules/compare/v0.3.0...v0.4.0
[v0.3.0]: https://github.com/usrrname/cursorrules/compare/v0.2.2...v0.3.0
[v0.2.2]: https://github.com/usrrname/cursorrules/compare/v0.2.1...v0.2.2
[v0.2.1]: https://github.com/usrrname/cursorrules/compare/v0.2.0...v0.2.1
[v0.1.4]: https://github.com/usrrname/cursorrules/compare/v0.1.3...v0.1.4
[v0.1.3]: https://github.com/usrrname/cursorrules/compare/v0.1.2...v0.1.3
[v0.1.2]: https://github.com/usrrname/cursorrules/compare/v0.1.1...v0.1.2
[v0.1.1]: https://github.com/usrrname/cursorrules/compare/v0.1.0...v0.1.1
[v0.1.0]: https://github.com/usrrname/cursorrules/releases/tag/v0.1.0 