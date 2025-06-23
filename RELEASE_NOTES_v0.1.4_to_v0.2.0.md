# What's Changed in @usrrname/cursorrules v0.2.0

**Release Date**: 2024-12-31
**Previous Version**: 0.1.4
**Version Bump**: MINOR - Significant refactoring and new features
**Branch**: release/v0.2.0

## 🚀 New Features

- **Enhanced Release Workflow System** ([4d55747](https://github.com/usrrname/cursorrules/commit/4d557478c9298381a515c374455a7aba721d0853)) - Comprehensive release workflow with branch validation, package.json validation, and structured changelog generation
- **Three New AI Agents** ([fc530a5](https://github.com/usrrname/cursorrules/commit/fc530a5c4650dc2f068096b6128c2a907f2f3c70)) - Added FairWitness, DependencyAnalysis, and SecurityScan agents
  - **FairWitness Agent**: Provides structured, objective analysis using five epistemological functions
  - **DependencyAnalysis Agent**: Evaluates dependencies for maintenance frequency, security vulnerabilities, and popularity metrics  
  - **SecurityScan Agent**: Performs comprehensive security scanning, including CVE analysis and license compliance
- **Branch Validation System** - Only allows releases from branches starting with "release/", "hotfix/", or "fix/"
- **Intelligent Commit Analysis** - Enhanced commit categorization including non-conventional commits

## 🔧 Refactoring & Improvements

- **Release Workflow Code Splitting** ([4d55747](https://github.com/usrrname/cursorrules/commit/4d557478c9298381a515c374455a7aba721d0853)) - Improved validation and structured documentation with specialized release rules
- **Models Configuration Update** ([fc530a5](https://github.com/usrrname/cursorrules/commit/fc530a5c4650dc2f068096b6128c2a907f2f3c70)) - Updated to claude-4-sonnet for various agents and reorganized model categories

## 📚 Documentation

- **Release Workflow Sequence Diagram** ([4d55747](https://github.com/usrrname/cursorrules/commit/4d557478c9298381a515c374455a7aba721d0853)) - New `release-workflow-sequence.md` illustrating automated release workflow process
- **Updated Models Documentation** ([fc530a5](https://github.com/usrrname/cursorrules/commit/fc530a5c4650dc2f068096b6128c2a907f2f3c70)) - Enhanced `modes-format.md` with new model listings and improved organization
- **Fixed CONTRIBUTING.md** ([fc530a5](https://github.com/usrrname/cursorrules/commit/fc530a5c4650dc2f068096b6128c2a907f2f3c70)) - Corrected broken link in contributing documentation
- **Changelog for v0.1.4** ([83a838c](https://github.com/usrrname/cursorrules/commit/83a838c5451734bc06a014376ea17f4caa73d8ed)) - Added comprehensive changelog documentation

## 🔄 Maintenance

- **Package Version Update** ([0518d79](https://github.com/usrrname/cursorrules/commit/0518d794dca5eeae24e2c2b4fbf81fa9baf112e5)) - Automated version bump to 0.1.4 with CI skip

## 🎯 Key Improvements

1. **Enhanced Release Management**: Complete workflow automation with validation and error handling
2. **AI Agent Expansion**: Three new specialized agents for analysis and security
3. **Better Documentation**: Comprehensive workflow documentation with sequence diagrams
4. **Model Updates**: Latest Claude-4-Sonnet integration across agents
5. **Quality Assurance**: Improved validation and structured release processes

## 🚦 Breaking Changes

None - This is a backward-compatible minor version release.

## 📦 Migration Notes

No migration required. All existing functionality remains compatible.

---

**Full Changelog**: [v0.1.4...v0.2.0](https://github.com/usrrname/cursorrules/compare/v0.1.4...v0.2.0) 