# /version

Update package version with semantic versioning.

## Usage

```
/version [major|minor|patch|custom]
```

## When to Use

Use this command when:
- Preparing a release
- After completing features or fixes
- Following conventional commit workflow

## Semantic Versioning

- **MAJOR**: Breaking changes (x.0.0)
- **MINOR**: New features, backwards compatible (x.y.0)
- **PATCH**: Bug fixes, backwards compatible (x.y.z)

## Workflow

1. Analyze commits since last tag
2. Determine appropriate version bump
3. Update package.json version
4. Create git commit
5. Optionally create git tag

## Options

- `major` - Breaking changes
- `minor` - New features
- `patch` - Bug fixes
- `custom` - Specify custom version

## Agent

Uses **BasicBitch** for straightforward execution.

## Related

- `/tag` - Create git tags
- `/changelog` - Generate changelog
- `/analyze-commits` - Analyze commits for version bump
