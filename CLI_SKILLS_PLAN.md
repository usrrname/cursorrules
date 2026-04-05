# CLI Tool Plan: Skills Recognition and Download

## Problem

The CLI tool needs to recognize and download `.claude/skills/` alongside rules and commands.

## Current State

- CLI downloads: `.cursor/rules/`, `.claude/rules/`, `.claude/commands/`
- Missing: `.claude/skills/` directory
- Interactive mode only handles rules, not skills

## Proposed Solution

### 1. Update Download Logic

Add `.claude/skills/` to IDE-specific download paths:

```javascript
function getSourcePaths(ide) {
    const paths = [];
    
    if (ide === 'claude' || ide === 'both') {
        paths.push(
            { source: '.claude/rules', dest: '.claude/rules', type: 'rules' },
            { source: '.claude/commands', dest: '.claude/commands', type: 'commands' },
            { source: '.claude/skills', dest: '.claude/skills', type: 'skills' }  // NEW
        );
    }
    
    return paths;
}
```

### 2. Interactive Skills Selection

Add skills to interactive menu:

```javascript
// scanAvailableSkills() - similar to scanAvailableRules()
async function scanAvailableSkills(basePath) {
    const skills = [];
    const entries = await readdir(basePath, { withFileTypes: true });
    
    for (const entry of entries) {
        if (entry.isDirectory() && entry.name !== 'CLAUDE.md') {
            const skillPath = join(basePath, entry.name, 'SKILL.md');
            if (await fileExists(skillPath)) {
                skills.push({
                    name: entry.name,
                    path: skillPath,
                    displayName: formatSkillName(entry.name)
                });
            }
        }
    }
    
    return skills;
}
```

### 3. Skills in Interactive Mode

Update interactive menu flow:

```
[Interactive Mode]
    ↓
Select IDE (cursor/claude/both)
    ↓
Select Content Type:
  - Rules
  - Skills (NEW)  ←
  - Commands
  - All
    ↓
Select specific items
    ↓
Download
```

### 4. CLI Flags for Skills

Add skills-specific flags:

```bash
npx @usrrname/cursorrules --skills-only      # Download only skills
npx @usrrname/cursorrules --include-skills   # Include in batch download
npx @usrrname/cursorrules --list-skills      # List available skills
```

### 5. Skills Metadata

Parse SKILL.md frontmatter for metadata:

```javascript
function parseSkillMetadata(skillPath) {
    const content = readFileSync(skillPath, 'utf-8');
    const frontmatter = content.match(/^---\n([\s\S]*?)\n---/);
    
    if (frontmatter) {
        return yaml.parse(frontmatter[1]);
    }
    
    return { name: basename(skillPath), description: '' };
}
```

### 6. Implementation Tasks

#### Phase A: Basic Skills Download
- [ ] Update `download-files.mjs` to include skills path
- [ ] Add skills to `--ide both` download
- [ ] Test skills download with `--dry-run`

#### Phase B: Skills Discovery
- [ ] Create `scanAvailableSkills()` function
- [ ] Add skills metadata parsing
- [ ] Create skills listing command

#### Phase C: Interactive Skills Selection
- [ ] Add skills category to interactive menu
- [ ] Create skill selection UI
- [ ] Handle skills-specific download

#### Phase D: Advanced Features
- [ ] Add `--skills-only` flag
- [ ] Add skill dependency resolution
- [ ] Filter skills by trigger patterns

### 7. Directory Structure After Download

```
project/
├── .claude/
│   ├── settings.json
│   ├── rules/
│   ├── commands/
│   └── skills/           # Downloaded skills
│       ├── typescript/
│       │   └── SKILL.md
│       ├── react/
│       │   └── SKILL.md
│       └── CLAUDE.md
```

### 8. Backward Compatibility

- Existing `--flat` flag continues to work
- Default behavior unchanged (cursor rules only)
- Skills only downloaded with `--ide claude` or `--ide both`

## Open Questions

1. Should skills be selectable individually or only as groups?
2. Should we add skill dependencies (e.g., react skill depends on typescript skill)?
3. Should skills trigger rules download automatically?

## Timeline

- Phase A: 1-2 days
- Phase B: 2-3 days
- Phase C: 3-4 days
- Phase D: 2-3 days

Total: ~1-2 weeks for full skills support
