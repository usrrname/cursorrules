# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### 🚀 Added
- **Enhanced Release Workflow System** ([4d55747](https://github.com/usrrname/cursorrules/commit/4d557478c9298381a515c374455a7aba721d0853)) - Comprehensive release workflow with branch validation, package.json validation, and structured changelog generation
- **FairWitness Agent** ([fc530a5](https://github.com/usrrname/cursorrules/commit/fc530a5c4650dc2f068096b6128c2a907f2f3c70)) - Provides structured, objective analysis using five epistemological functions
- **DependencyAnalysis Agent** ([fc530a5](https://github.com/usrrname/cursorrules/commit/fc530a5c4650dc2f068096b6128c2a907f2f3c70)) - Evaluates dependencies for maintenance frequency, security vulnerabilities, and popularity metrics
- **SecurityScan Agent** ([fc530a5](https://github.com/usrrname/cursorrules/commit/fc530a5c4650dc2f068096b6128c2a907f2f3c70)) - Performs comprehensive security scanning, including CVE analysis and license compliance
- **Branch Validation System** - Only allows releases from branches starting with "release/", "hotfix/", or "fix/"
- **Intelligent Commit Analysis** - Enhanced commit categorization including non-conventional commits

### 💥 Changed
- **Release Workflow Code Splitting** ([4d55747](https://github.com/usrrname/cursorrules/commit/4d557478c9298381a515c374455a7aba721d0853)) - Improved validation and structured documentation with specialized release rules
- **Models Configuration Update** ([fc530a5](https://github.com/usrrname/cursorrules/commit/fc530a5c4650dc2f068096b6128c2a907f2f3c70)) - Updated to claude-4-sonnet for various agents and reorganized model categories

### 📚 Documentation
- **Release Workflow Sequence Diagram** ([4d55747](https://github.com/usrrname/cursorrules/commit/4d557478c9298381a515c374455a7aba721d0853)) - New `release-workflow-sequence.md` illustrating automated release workflow process
- **Updated Models Documentation** ([fc530a5](https://github.com/usrrname/cursorrules/commit/fc530a5c4650dc2f068096b6128c2a907f2f3c70)) - Enhanced `modes-format.md` with new model listings and improved organization
- **Fixed CONTRIBUTING.md** ([fc530a5](https://github.com/usrrname/cursorrules/commit/fc530a5c4650dc2f068096b6128c2a907f2f3c70)) - Corrected broken link in contributing documentation
- **Changelog for v0.1.4** ([83a838c](https://github.com/usrrname/cursorrules/commit/83a838c5451734bc06a014376ea17f4caa73d8ed)) - Added comprehensive changelog documentation

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

[Unreleased]: https://github.com/usrrname/cursorrules/compare/v0.1.4...HEAD
[v0.1.4]: https://github.com/usrrname/cursorrules/compare/v0.1.3...v0.1.4
[v0.1.3]: https://github.com/usrrname/cursorrules/compare/v0.1.2...v0.1.3
[v0.1.2]: https://github.com/usrrname/cursorrules/compare/v0.1.1...v0.1.2
[v0.1.1]: https://github.com/usrrname/cursorrules/compare/v0.1.0...v0.1.1
[v0.1.0]: https://github.com/usrrname/cursorrules/releases/tag/v0.1.0 