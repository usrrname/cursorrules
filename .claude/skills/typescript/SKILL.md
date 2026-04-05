---
name: typescript-standards
description: TypeScript best practices and coding standards
triggers:
  - file_pattern: "*.ts"
  - file_pattern: "*.tsx"
  - command: "/typescript"
---

# TypeScript Standards Skill

Guides you to write clean, type-safe TypeScript code following best practices.

## When to Use

- Writing new TypeScript code
- Refactoring JavaScript to TypeScript
- Reviewing TypeScript for quality
- Setting up TypeScript projects

## Critical Rules

### Type Safety
- Always enable `strict: true` in tsconfig.json
- Avoid `any` - use `unknown` when type is uncertain
- Use explicit return types on public functions
- Enable `noImplicitAny` and `strictNullChecks`

### Naming Conventions
- PascalCase for types, interfaces, classes
- camelCase for variables, functions, methods
- UPPER_SNAKE_CASE for constants
- Use descriptive names, avoid abbreviations

### Code Organization
- One class/interface per file (preferably)
- Group related types in dedicated files
- Export types explicitly
- Use barrel exports (index.ts) for clean imports

### Best Practices
- Prefer `interface` over `type` for object shapes
- Use discriminated unions for complex state
- Leverage generics for reusable code
- Use `readonly` for immutable properties
- Prefer `const assertions` for literal types

## Workflow

1. **Setup**: Ensure strict mode is enabled
2. **Write**: Follow naming and type conventions
3. **Review**: Check for `any` usage and implicit types
4. **Refine**: Add explicit types where inference fails

## Examples

### Good
```typescript
interface User {
  readonly id: string;
  name: string;
  email: string;
}

function getUserById(id: string): Promise<User | null> {
  // Implementation
}
```

### Bad
```typescript
type User = any;

function getUser(id) {
  return fetch(`/users/${id}`);
}
```

## Related

- `/react-typescript` - React-specific TypeScript patterns
- `/vue3-typescript` - Vue 3 TypeScript integration
