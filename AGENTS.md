# AGENTS.md - AI Agent Configuration Registry

This file serves as a discoverability layer for AI agent configurations, rules, and commands across both Cursor and Claude Code environments.

## 📁 Configuration Locations

### Cursor IDE
- **Rules**: `.cursor/rules/**/*.mdc`
- **Agents**: `.cursor/modes.json`
- **Commands**: `.cursor/commands.json` + `.cursor/commands/*.md`
- **Skills**: `.cursor/skills/**/SKILL.md`
- **MCP**: `.cursor/mcp.json`
- **Ignore**: `.cursorignore`

### Claude Code
- **Rules**: `.claude/rules/**/*.md`
- **Settings**: `.claude/settings.json` (agents, permissions, hooks, MCP)
- **Commands**: `.claude/commands/*.md`
- **Skills**: `.claude/skills/` (or embedded in CLAUDE.md)
- **Hooks**: `.claude/hooks/` (scripts) + `settings.json` hooks section
- **Ignore**: `.claudeignore`

## 🤖 Available Agents

| Agent | IDE | Description | File |
|-------|-----|-------------|------|
| **BasicBitch** | Cursor | Reliable, corporate developer | `.cursor/modes.json` |
| **BasicBitch** | Claude | Reliable, corporate developer | `.claude/settings.json` |
| **Spellchuck** | Cursor | Documentation/grammar specialist | `.cursor/modes.json` |
| **Spellchuck** | Claude | Documentation/grammar specialist | `.claude/settings.json` |
| **Godmode** | Cursor | DevOps/Infrastructure expert | `.cursor/modes.json` |
| **Godmode** | Claude | DevOps/Infrastructure expert | `.claude/settings.json` |
| **SageDaddy** | Cursor | Software architect (20 years) | `.cursor/modes.json` |
| **SageDaddy** | Claude | Software architect (20 years) | `.claude/settings.json` |

## 📜 Rules Index

### Core Rules
| Rule | Cursor | Claude | Purpose |
|------|--------|--------|---------|
| create-rule-agent | `.cursor/rules/core/create-rule-agent.mdc` | `.claude/rules/core/create-rule-agent.md` | Rule creation standards |
| create-update-agent | `.cursor/rules/core/create-update-agent.mdc` | `.claude/rules/core/create-update-agent.md` | Agent management |
| security-scan | `.cursor/rules/core/security-scan-agent.mdc` | `.claude/rules/core/security-scan-agent.md` | Dependency security |
| agent-communication | `.cursor/rules/core/agent-communication-always.mdc` | `.claude/rules/core/agent-communication-always.md` | Communication style |
| dependency-analysis | `.cursor/rules/core/dependency-analysis-agent.mdc` | `.claude/rules/core/dependency-analysis-agent.md` | Pre-install checks |

### Standards (Language/Framework)
| Rule | Cursor | Claude | Stack |
|------|--------|--------|-------|
| typescript-standards | `.cursor/rules/standards/typescript-standards-auto.mdc` | `.claude/rules/standards/typescript-standards-auto.md` | TypeScript |
| react-typescript | `.cursor/rules/standards/react-typescript-auto.mdc` | `.claude/rules/standards/react-typescript-auto.md` | React |
| nextjs-react19 | `.cursor/rules/standards/nextjs-react19-auto.mdc` | `.claude/rules/standards/nextjs-react19-auto.md` | Next.js |
| vue3-typescript | `.cursor/rules/standards/vue3-typescript-auto.mdc` | `.claude/rules/standards/vue3-typescript-auto.md` | Vue 3 |
| cloudflare-workers | `.cursor/rules/standards/cloudflare-workers-auto.mdc` | `.claude/rules/standards/cloudflare-workers-auto.md` | CF Workers |
| cloudflare-workers-hono | `.cursor/rules/standards/cloudflare-workers-hono-auto.mdc` | `.claude/rules/standards/cloudflare-workers-hono-auto.md` | CF + Hono |
| mysql | `.cursor/rules/standards/mysql-auto.mdc` | `.claude/rules/standards/mysql-auto.md` | MySQL |
| laravel-php | `.cursor/rules/standards/laravel-php-auto.mdc` | `.claude/rules/standards/laravel-php-auto.md` | Laravel |

### Testing
| Rule | Cursor | Claude | Purpose |
|------|--------|--------|---------|
| testing-pyramid | `.cursor/rules/test/testing-pyramid-agent.mdc` | `.claude/rules/test/testing-pyramid-agent.md` | Test distribution |
| vitest-best-practices | `.cursor/rules/test/vitest-best-practices-auto.mdc` | `.claude/rules/test/vitest-best-practices-auto.md` | Vitest |
| vitest-component-testing | `.cursor/rules/test/vitest-component-testing-auto.mdc` | `.claude/rules/test/vitest-component-testing-auto.md` | Component tests |
| react-component-hook-testing | `.cursor/rules/test/react-component-hook-testing-auto.mdc` | `.claude/rules/test/react-component-hook-testing-auto.md` | React hooks |
| vue-test-utils | `.cursor/rules/test/vue-test-utils-auto.mdc` | `.claude/rules/test/vue-test-utils-auto.md` | Vue testing |
| playwright | `.cursor/rules/test/playwright-agent.mdc` | `.claude/rules/test/playwright-agent.md` | E2E testing |

### Utils (Release, Git, Workflow)
| Rule | Cursor | Claude | Purpose |
|------|--------|--------|---------|
| console-vibes | `.cursor/rules/utils/console-vibes-auto.mdc` | `.claude/rules/utils/console-vibes-auto.md` | Console styling |
| git-branch | `.cursor/rules/utils/git-branch-agent.mdc` | `.claude/rules/utils/git-branch-agent.md` | Branch management |
| release-validation | `.cursor/rules/utils/release-validation-auto.mdc` | `.claude/rules/utils/release-validation-auto.md` | Release checks |
| release-commit-analysis | `.cursor/rules/utils/release-commit-analysis-auto.mdc` | `.claude/rules/utils/release-commit-analysis-auto.md` | Commit analysis |
| release-package-version | `.cursor/rules/utils/release-package-version-auto.mdc` | `.claude/rules/utils/release-package-version-auto.md` | Version bump |
| release-git-tags | `.cursor/rules/utils/release-git-tags-auto.mdc` | `.claude/rules/utils/release-git-tags-auto.md` | Tag management |
| release-changelog | `.cursor/rules/utils/release-changelog-auto.mdc` | `.claude/rules/utils/release-changelog-auto.md` | Changelog gen |
| changelog-generator | `.cursor/rules/utils/changelog-generator-manual.mdc` | `.claude/rules/utils/changelog-generator-manual.md` | Manual changelog |

## ⚡ Commands

### Workflow Commands
| Command | Cursor | Claude | Description |
|---------|--------|--------|-------------|
| /dev | `.cursor/rules/workflows/dev-workflow.mdc` | `.claude/commands/dev.md` | Implement features |
| /spike | `.cursor/rules/workflows/dev-spike.mdc` | `.claude/commands/spike.md` | Technical investigation |
| /story | `.cursor/rules/workflows/pm-story.mdc` | `.claude/commands/story.md` | User stories |

### Git Commands
| Command | Cursor | Claude | Description |
|---------|--------|--------|-------------|
| /commit | `.cursor/rules/utils/git-commit-push-agent.mdc` | `.claude/commands/commit.md` | Conventional commits |
| /branch | `.cursor/rules/utils/git-branch-agent.mdc` | `.claude/commands/branch.md` | Branch management |

### Release Commands
| Command | Cursor | Claude | Description |
|---------|--------|--------|-------------|
| /changelog | `.cursor/commands/changelog.md` | `.claude/commands/changelog.md` | Generate changelog |
| /version | `.cursor/rules/utils/release-package-version-auto.mdc` | `.claude/commands/version.md` | Version bump |
| /tag | `.cursor/rules/utils/release-git-tags-auto.mdc` | `.claude/commands/tag.md` | Git tags |
| /validate-release | `.cursor/rules/utils/release-validation-auto.mdc` | `.claude/commands/validate-release.md` | Release validation |
| /analyze-commits | `.cursor/rules/utils/release-commit-analysis-auto.mdc` | `.claude/commands/analyze-commits.md` | Commit analysis |

### Analysis Commands
| Command | Cursor | Claude | Description |
|---------|--------|--------|-------------|
| /architecture | `.cursor/commands/architecture.md` | `.claude/commands/architecture.md` | Architecture solutions |
| /deps | `.cursor/rules/core/dependency-analysis-agent.mdc` | `.claude/commands/deps.md` | Dependency analysis |
| /security | `.cursor/rules/core/security-scan-agent.mdc` | `.claude/commands/security.md` | Security scan |
| /witness | `.cursor/rules/core/fair-witness-agent.mdc` | `.claude/commands/witness.md` | Fair Witness analysis |

### Code Commands
| Command | Cursor | Claude | Description |
|---------|--------|--------|-------------|
| /refactor | `.cursor/rules/utils/refactor-agent.mdc` | `.claude/commands/refactor.md` | Code refactoring |
| /testing-pyramid | `.cursor/commands/testing-pyramid.md` | `.claude/commands/testing-pyramid.md` | Test analysis |

## 🪝 Hooks (Claude Only)

Located in `.claude/hooks/` and configured in `.claude/settings.json`:

| Hook | Script | Trigger | Purpose |
|------|--------|---------|---------|
| auto-format | `.claude/hooks/auto-format.sh` | PostToolUse (Write/Edit) | Run Prettier |
| security-block | `.claude/hooks/security-block.sh` | PreToolUse (Bash) | Block dangerous commands |
| type-check | `.claude/hooks/type-check.sh` | PostToolUse (Write/Edit) | TypeScript checks |
| test-on-save | `.claude/hooks/test-on-save.sh` | PostToolUse (Write/Edit) | Run affected tests |
| commit-lint | `.claude/hooks/commit-lint.sh` | PreToolUse (Bash) | Validate commit format |
| audit-log | `.claude/hooks/audit-log.sh` | PostToolUse (Bash) | Log all commands |

## 🔌 MCP Servers

Both IDEs use the same MCP protocol:

**Cursor**: `.cursor/mcp.json`  
**Claude**: `.claude/settings.json` → `mcpServers` section

## 📖 Quick Reference

**Install for Cursor:**
```bash
npx @usrrname/cursorrules --ide cursor
```

**Install for Claude:**
```bash
npx @usrrname/cursorrules --ide claude
```

**Install for both:**
```bash
npx @usrrname/cursorrules --ide both
```

---

*This file is auto-generated. For updates, see the CLI tool or modify source files in `.cursor/` and `.claude/` directories.*
