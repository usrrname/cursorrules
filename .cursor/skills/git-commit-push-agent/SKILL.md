---
name: git-commit-push
description: Enforces Git commit standards and conventions when committing and pushing code in Agent Mode. This rule is crucial for keeping track of changes made by agents, and should run whenever the user expresses they want to commit or push code changes made by the agent. This rule should be followed when: 1. the user wants to commit code, the git aliases, 'gpu' or 'gc', 'gcm' were submitted by the user. This rule will ask the user if they would prefer to auto-run the commit command going forward.
---

# Git Commit Standards

## Critical Rules

- Use `git status` to check modified or staged files before committing
- Never overwrite or push untracked files
- Commits MUST follow the conventional-commit standard
- Always run `git add <filename>` from repo root
- Use present tense in commit subject ("add" not "added")
- Subject ≤ 72 chars, imperative mood, blank line before body
- Reference issue/ticket with # if used
- Describe what or why, not how changes were made; fixes must state what was fixed
- Keep descriptions brief and focused—avoid verbose explanations
- Include agent name in commit footer ("Commit written by <agent_name>")

### Commit Format
```
<type>(<scope>): <description> (#<issue-number>)

[optional body]

[optional footer]

Commit written by <agent_name>
```

- If agent not specified, use "cursor agent"
- Types: feat, fix, docs, style, refactor, perf, test, chore, ci, security, rename

### Post-Commit Actions

- Do NOT include post-commit commands (e.g., `npm run lint`, `git push`) in commit message
- Suggest these actions separately after commit

### Agent Enforcement

- Always check `git status` before commit
- Never use generic messages ("update code", "commit changes")
- Identify change type per conventional commit
- Commit body should be concise and brief, and should not exceed 20 words
- Prefer single-line descriptions when possible; only use body for essential context
- Use meaningful scope (codebase area)
- Clear, concise, imperative subject
- Add agent name as (co-)author
- Convert user commit instructions to proper format
