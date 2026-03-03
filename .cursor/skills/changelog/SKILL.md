---
name: changelog
description: Changelog Generation Command 📝
disable-model-invocation: true
---

# Changelog Generation Command 📝

Generate a changelog.md by analyzing git history and tags.

## Git Commands

```bash
# Get all tags sorted by version (newest first)
git tag --sort=-version:refname

# Get the most recent tag
git describe --tags --abbrev=0

# Get unreleased commits since last tag
git log --oneline --no-merges $(git describe --tags --abbrev=0 2>/dev/null || echo "")..HEAD

# Get commits between two tags
git log --oneline --no-merges <prev-tag>..<current-tag>

# Get tag creation date
git log -1 --format=%ai <tag-name>
```

## Loop Through All Tags

```bash
ALL_TAGS=$(git tag --sort=-version:refname)

for tag in $ALL_TAGS; do
  PREV_TAG=$(git describe --tags --abbrev=0 $tag^ 2>/dev/null || echo "")
  COMMITS=$(git log --oneline --no-merges $PREV_TAG..$tag)
  echo "Version $tag:"
  echo "$COMMITS"
  echo "---"
done
```

## Filter by Conventional Commit Type

```bash
# Features
git log --oneline --grep="^feat:" <tag1>..<tag2>

# Bug fixes
git log --oneline --grep="^fix:" <tag1>..<tag2>

# Documentation
git log --oneline --grep="^docs:" <tag1>..<tag2>

# Breaking changes
git log --oneline --grep="BREAKING" <tag1>..<tag2>
```

## Generate Changelog

Run these commands and format output following Keep a Changelog format:

1. Analyze all git tags
2. Categorize commits by type (feat, fix, docs, chore, etc.)
3. Create sections: Added, Fixed, Changed, Documentation
4. Include unreleased changes at the top
5. Store at project root as `changelog.md`

See `.cursor/rules/utils/changelog-generator-manual.mdc` for full formatting rules.
