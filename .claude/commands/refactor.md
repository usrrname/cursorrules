# /refactor

Refactor code blocks with best practices and improved maintainability.

## Usage

```
/refactor [file-path-or-code-block]
```

## When to Use

Use this command when:
- Code has become difficult to understand or maintain
- You need to reduce technical debt
- Performance improvements are needed
- You want to apply design patterns
- Duplication needs to be eliminated (DRY principle)

## Principles

1. **Preserve Behavior**: Refactoring should not change functionality
2. **Improve Readability**: Code should be easier to understand
3. **Reduce Complexity**: Simplify overly complex logic
4. **Enhance Maintainability**: Make future changes easier
5. **Follow Standards**: Adhere to language and framework conventions

## Techniques

- Extract functions/methods
- Rename variables for clarity
- Simplify conditional logic
- Remove duplication
- Improve data structures
- Apply appropriate design patterns

## Agent

Uses **SageDaddy** persona for architectural insight and **BasicBitch** for implementation.

## Related

- `/dev` - Feature implementation
- `/testing-pyramid` - Ensure tests remain valid after refactoring
- `/spike` - Investigate before major refactoring
