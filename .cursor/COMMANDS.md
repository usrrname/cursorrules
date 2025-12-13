# Cursor Commands Reference 🎯

Quick reference for all available commands that map to rules in this project.

## 📋 Usage

- **Direct reference:** `@rule-name.mdc`
- **Natural language:** Describe what you want ("Refactor this code", "Create a release")
- **Slash commands:** Use `/command`

## 🚀 Workflow

| Command | Rule | Description |
|---------|------|-------------|
| `/dev` | `.cursor/rules/workflows/dev-workflow.mdc` | Implement features from user stories |
| `/spike` | `.cursor/rules/workflows/dev-spike.mdc` | Time-boxed technical investigation |
| `/story` | `.cursor/rules/workflows/pm-story.mdc` | Create or validate user stories (PBIs) |

## 🔧 Git

| Command | Rule | Description |
|---------|------|-------------|
| `/commit` | `.cursor/rules/utils/git-commit-push-agent.mdc` | Commit with conventional commit standards |
| `/branch` | `.cursor/rules/utils/git-branch-agent.mdc` | Manage git branches |

## ✨ Code

| Command | Rule | Description |
|---------|------|-------------|
| `/refactor` | `.cursor/rules/utils/refactor-agent.mdc` | Refactor code with best practices |

## 📦 Release

| Command | Rule | Description |
|---------|------|-------------|
| `/changelog` | `.cursor/rules/utils/changelog-generator-manual.mdc` | Generate changelog from git tags/commits |
| `/version` | `.cursor/rules/utils/release-package-version-auto.mdc` | Update package version (semver) |
| `/tag` | `.cursor/rules/utils/release-git-tags-auto.mdc` | Create/manage git tags |
| `/validate-release` | `.cursor/rules/utils/release-validation-auto.mdc` | Validate release prerequisites |
| `/analyze-commits` | `.cursor/rules/utils/release-commit-analysis-auto.mdc` | Analyze commits for version bump type |

## 🔍 Analysis

| Command | Rule/Command | Description | Notes |
|---------|--------------|-------------|-------|
| `/architecture` | `.cursor/commands/architecture.md` | Analyze architecture, propose solutions | Aliases: `/arch`, `/solution`<br>Agent: SageDaddy |
| `/deps` | `.cursor/rules/core/dependency-analysis-agent.mdc` | Analyze dependencies (maintenance, security, popularity) | |
| `/security` | `.cursor/rules/core/security-scan-agent.mdc` | Security scan (CVE, licenses, supply chain) | |
| `/witness` | `.cursor/rules/core/fair-witness-agent.mdc` | Fair Witness analysis (epistemological functions) | |

## 🧪 Testing

| Command | Rule/Command | Description | Notes |
|---------|--------------|-------------|-------|
| `/testing-pyramid` | `.cursor/commands/testing-pyramid.md` | Analyze test distribution, maintain pyramid | Alias: `/analyze-tests` |

## 🛠️ Utility

| Command | Rule | Description |
|---------|------|-------------|
| `/rule` | `.cursor/rules/core/create-update-agent.mdc` | Create or update Cursor rules |

## 📝 Notes

- Commands work best in **Agent Mode** (Cmd/Ctrl + K)
- **Rule types:**
  - `-agent.mdc`: Context-aware, triggers on intent
  - `-auto.mdc`: Auto-applied by file patterns
  - `-manual.mdc`: Explicit invocation required
- **Command files** (`.md` in `.cursor/commands/`) provide detailed workflows

## 🗺️ Quick Reference

**`.cursor/commands/`:** `/architecture`, `/testing-pyramid`  
**`workflows/`:** `/dev`, `/spike`, `/story`  
**`utils/`:** `/commit`, `/branch`, `/refactor`, `/changelog`, `/version`, `/tag`, `/validate-release`, `/analyze-commits`  
**`core/`:** `/deps`, `/security`, `/witness`, `/rule`

## 🔗 Related Files

- `commands.json` - Command configuration (source of truth)
- `modes.json` - AI agent modes and personalities
- `.cursor/rules/` - Rule definitions
