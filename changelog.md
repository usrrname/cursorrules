# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

---

## [v0.4.0] - 2025-01-23

### ⚡ Performance
- **Token Efficiency Optimization** ([dce194b](https://github.com/usrrname/cursorrules/commit/dce194bb4369b31efb56f5a6a5d876891f86d9e5)) - Shortened fair witness, TypeScript standards and agent-communication rules for improved token efficiency (#36)

### 🐛 Fixed
- **Publish Workflow Exit Handling** ([8e31890](https://github.com/usrrname/cursorrules/commit/8e31890b3872c5a2ca664752c90a0da87e3ef4a3)) - Updated publish workflow to allow non-tag events to exit gracefully

### 🔧 Technical Improvements
- **CI Workflow Enhancement** ([5168d7b](https://github.com/usrrname/cursorrules/commit/5168d7bf27a5a7cf6953b1cb94317fd5e5a3f6af)) - Added condition to check if package.json version is extracted in publish workflow
- **Environment and Dependencies Update** ([c4c8568](https://github.com/usrrname/cursorrules/commit/c4c85686debef46dc2ebbcb5362b8ee669d40001)) - Updated environment variables, Node.js version to v22.18.0, and npm version (#34)

### 🗑️ Removed
- **Context Information Display Rule** ([bc29738](https://github.com/usrrname/cursorrules/commit/bc29738287dc4556625dd382f3005091702d409b)) - Deprecated and removed unreliable context information display rule from utils (#35)

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

[Unreleased]: https://github.com/usrrname/cursorrules/compare/v0.4.0...HEAD
[v0.4.0]: https://github.com/usrrname/cursorrules/compare/v0.3.0...v0.4.0
[v0.3.0]: https://github.com/usrrname/cursorrules/compare/v0.2.2...v0.3.0
[v0.2.2]: https://github.com/usrrname/cursorrules/compare/v0.2.1...v0.2.2
[v0.2.1]: https://github.com/usrrname/cursorrules/compare/v0.2.0...v0.2.1
[v0.1.4]: https://github.com/usrrname/cursorrules/compare/v0.1.3...v0.1.4
[v0.1.3]: https://github.com/usrrname/cursorrules/compare/v0.1.2...v0.1.3
[v0.1.2]: https://github.com/usrrname/cursorrules/compare/v0.1.1...v0.1.2
[v0.1.1]: https://github.com/usrrname/cursorrules/compare/v0.1.0...v0.1.1
[v0.1.0]: https://github.com/usrrname/cursorrules/releases/tag/v0.1.0 