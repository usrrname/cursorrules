# /changelog

Generate changelog from git history and tags.

## Usage

```
/changelog [--all|--since-tag <tag>]
```

## When to Use

Use this command when:
- Preparing a release
- Documenting changes for users
- Maintaining project history

## Format

Follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format:

```markdown
## [Unreleased]

### Added
- New features

### Changed
- Changes in existing functionality

### Deprecated
- Soon-to-be removed features

### Removed
- Now removed features

### Fixed
- Bug fixes

### Security
- Security improvements
```

## Agent

Uses **Spellchuck** for perfect prose and formatting.

## Related

- `/version` - Bump version
- `/tag` - Create release tags
