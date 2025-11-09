# Cursor Commands Reference 🎯

This document lists all available commands that map to rules in this project. Use these commands to quickly invoke specific workflows and utilities.

## 📋 How to Use

### Method 1: Direct Rule Reference

In Cursor chat, reference the rule directly:

```
@use git-commit-push-agent.mdc to commit my changes
@use refactor-agent.mdc to improve this code
```

### Method 2: Natural Language

Simply describe what you want, and Cursor will use the appropriate rule:

```
"Refactor this code"
"Create a release"
"Analyze architecture"
```

### Method 3: Command Aliases (Future)

If Cursor adds support for custom slash commands, the `commands.json` file contains the configuration.

## 🚀 Workflow Commands

### `/arch` - Architecture Analysis

**Rule:** `.cursor/rules/workflows/arch.mdc`  
**Description:** Analyze architecture and propose multiple architectural solutions  
**Usage:** "Analyze architecture" or "Propose architectural solutions"

### `/spike` - Technical Spike

**Rule:** `.cursor/rules/workflows/dev-spike.mdc`  
**Description:** Conduct time-boxed technical investigation or proof of concept  
**Usage:** "Run a spike" or "Technical investigation"

### `/story` - User Story Management

**Rule:** `.cursor/rules/workflows/pm-story.mdc`  
**Description:** Create or validate user stories (PBIs)  
**Usage:** "Create user story" or "Validate story"

## 🔧 Git Commands

### `/commit` - Git Commit

**Rule:** `.cursor/rules/utils/git-commit-push-agent.mdc`  
**Description:** Commit changes with conventional commit standards  
**Usage:** "Commit changes" or "Use git commit workflow"

### `/branch` - Branch Management

**Rule:** `.cursor/rules/utils/git-branch-agent.mdc`  
**Description:** Manage git branches (create, checkout, delete)  
**Usage:** "Create branch" or "Switch branch"

## ✨ Code Commands

### `/refactor` - Code Refactoring

**Rule:** `.cursor/rules/utils/refactor-agent.mdc`  
**Description:** Refactor code blocks with best practices  
**Usage:** "Refactor this code" or "Improve this code"

## 📦 Release Commands

### `/changelog` - Generate Changelog

**Rule:** `.cursor/rules/utils/changelog-generator-manual.mdc`  
**Description:** Generate comprehensive changelog from git tags and commits  
**Usage:** "Generate changelog" or "Create changelog"

### `/version` - Update Version

**Rule:** `.cursor/rules/utils/release-package-version-auto.mdc`  
**Description:** Update package version with semantic versioning  
**Usage:** "Update version" or "Bump version"

### `/tag` - Git Tags

**Rule:** `.cursor/rules/utils/release-git-tags-auto.mdc`  
**Description:** Create and manage git tags for releases  
**Usage:** "Create tag" or "Manage tags"

### `/validate-release` - Validate Release

**Rule:** `.cursor/rules/utils/release-validation-auto.mdc`  
**Description:** Validate release prerequisites (branch, package.json)  
**Usage:** "Validate release" or "Check release prerequisites"

### `/analyze-commits` - Commit Analysis

**Rule:** `.cursor/rules/utils/release-commit-analysis-auto.mdc`  
**Description:** Analyze commits to determine version bump type  
**Usage:** "Analyze commits" or "Determine version bump"

## 🔍 Analysis Commands

### `/deps` - Dependency Analysis

**Rule:** `.cursor/rules/core/dependency-analysis-agent.mdc`  
**Description:** Analyze dependencies before installation (maintenance, security, popularity)  
**Usage:** "Analyze dependencies" or "Check package before install"

### `/security` - Security Scan

**Rule:** `.cursor/rules/core/security-scan-agent.mdc`  
**Description:** Comprehensive security scan (CVE, licenses, supply chain)  
**Usage:** "Security scan" or "Check security vulnerabilities"

### `/witness` - Fair Witness Analysis

**Rule:** `.cursor/rules/core/fair-witness-agent.mdc`  
**Description:** Fair Witness analysis using epistemological functions  
**Usage:** "Fair witness analysis" or "Analyze with fair witness"

## 🛠️ Utility Commands

### `/rule` - Rule Management

**Rule:** `.cursor/rules/core/create-update-agent.mdc`  
**Description:** Create or update Cursor rules  
**Usage:** "Create cursor rule" or "Update rule"

## 📝 Notes

- Most commands work best in **Agent Mode** (Cmd/Ctrl + K)
- Some rules are **auto-applied** based on file patterns (ending in `-auto.mdc`)
- **Manual rules** (ending in `-manual.mdc`) require explicit invocation
- **Agent rules** (ending in `-agent.mdc`) trigger based on context and description

### Rule Types

- **`-agent.mdc`**: Context-aware rules that trigger based on user intent and description
- **`-auto.mdc`**: Automatically applied based on file patterns/globs
- **`-manual.mdc`**: Must be explicitly invoked (perfect for commands)
- **No suffix**: General rules that can be referenced directly

### Finding Rules

To find a rule referenced by a command:

1. Check the **Rule Path** column in the mapping table above
2. Navigate to `.cursor/rules/{path}`
3. Example: `/commit` → `.cursor/rules/utils/git-commit-push-agent.mdc`

## 🔗 Related Files

- **`commands.json`** - Command configuration mapping (single source of truth for command-to-rule mappings)
- **`modes.json`** - Custom AI agent modes and personalities
- **`.cursor/rules/`** - All rule definitions organized by purpose
- **`COMMANDS.md`** - This file (command reference documentation)

## 🗺️ Quick Reference by Rule Location

### Rules in `workflows/` (4 commands)

- `/arch` → `arch.mdc`
- `/dev` → `dev-workflow.mdc`
- `/spike` → `dev-spike.mdc`
- `/story` → `pm-story.mdc`

### Rules in `utils/` (8 commands)

- `/commit` → `git-commit-push-agent.mdc`
- `/branch` → `git-branch-agent.mdc`
- `/refactor` → `refactor-agent.mdc`
- `/changelog` → `changelog-generator-manual.mdc`
- `/version` → `release-package-version-auto.mdc`
- `/tag` → `release-git-tags-auto.mdc`
- `/validate-release` → `release-validation-auto.mdc`
- `/analyze-commits` → `release-commit-analysis-auto.mdc`

### Rules in `core/`

- `/deps` → `dependency-analysis-agent.mdc`
- `/security` → `security-scan-agent.mdc`
- `/witness` → `fair-witness-agent.mdc`
