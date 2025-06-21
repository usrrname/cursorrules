# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.4] - 2024-06-21

### Added
- **CI/CD Enhancements**: Enhanced publish workflow to trigger on version tag pushes
- **Documentation**: Updated README and release workflow documentation (#21)
- **Release Automation**: Added changelog and release workflow with release notes (#17)
- **Dependency Analysis**: Enhanced dependency analysis agent with user input filters
- **Security Scanning**: Added dependency analysis and security scan rules

### Fixed
- **Security Scan Agent**: Updated globs for security-scan-agent rule to include `bun.lockb` files

### Changed
- **CI Pipeline**: Modified CI to only perform package release when there is a new tag on `main` (#18)

### Technical Details
- **Commit Range**: `v0.1.3..HEAD`
- **Breaking Changes**: None
- **Migration Guide**: Not required

## [0.1.3] - 2024-06-21

### Changed
- Package version update

## [0.1.2.3] - Previous Release

## [0.1.2] - Previous Release

## [0.1.1] - Previous Release

## [0.1.0] - Previous Release

---

## Release Notes for v0.1.4

### 🚀 What's New

This patch release focuses on **CI/CD improvements** and **developer experience enhancements**. We've streamlined the release process and added powerful new tools for dependency management and security scanning.

### 🔧 Key Improvements

1. **Automated Release Workflow**: The publish workflow now automatically triggers when version tags are pushed, making releases more reliable and consistent.

2. **Enhanced Documentation**: Updated README and release workflow documentation to provide clearer guidance for contributors and users.

3. **Dependency Analysis Agent**: New agent with user input filters for better dependency management and analysis.

4. **Security Scanning**: Added comprehensive security scan rules to help identify potential vulnerabilities in dependencies.

### 🐛 Bug Fixes

- Fixed security scan agent to properly include `bun.lockb` files in its scanning scope.

### 🔄 CI/CD Changes

- Optimized CI pipeline to only perform package releases when new tags are pushed to the `main` branch, reducing unnecessary builds.

### 📋 Migration Notes

- **No breaking changes** in this release
- **No migration required** - this is a drop-in update
- All existing functionality remains unchanged

### 🎯 Next Steps

After updating to v0.1.4, you can:
- Take advantage of the new dependency analysis features
- Benefit from improved security scanning capabilities
- Experience more reliable automated releases

---

*For detailed commit information, see the [GitHub repository](https://github.com/usrrname/cursorrules).* 