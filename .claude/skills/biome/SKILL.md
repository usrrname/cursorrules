---
name: biome
description: Biome JavaScript/TypeScript linter and formatter
model: inherit
triggers:
  - file_pattern: "biome.json"
  - file_pattern: "biome.jsonc"
---

# Biome Skill

Configure and use Biome for fast JavaScript/TypeScript linting and formatting.

## When to Use

- Setting up Biome in a project
- Migrating from ESLint/Prettier to Biome
- Configuring lint rules
- Formatting code with Biome

## Critical Rules

### Configuration
- Use `biome.json` or `biome.jsonc` for configuration
- Extend recommended rules as base
- Configure formatter and linter together
- Set up import organization

### Performance
- Biome is 10-100x faster than ESLint/Prettier
- Use for CI/CD pipelines
- Format on save in editor
- Run checks in pre-commit hooks

### Migration
- Start with `biome migrate` from ESLint/Prettier configs
- Disable conflicting rules gradually
- Maintain parity during transition
- Remove old configs after migration complete

### Best Practices
- Enable all recommended rules by default
- Use `biome check` for lint + format in CI
- Configure import sorting
- Set up editor integration

## Examples

### biome.json
```json
{
  "$schema": "https://biomejs.dev/schemas/1.5.3/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "correctness": {
        "noUnusedVariables": "error"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 80
  }
}
```

### Commands
```bash
# Check lint and format
biome check .

# Check with auto-fix
biome check --apply .

# Format only
biome format --write .

# Lint only
biome lint --apply .
```

## Related

- `/typescript` - TypeScript best practices
- `/react` - React patterns that Biome enforces
