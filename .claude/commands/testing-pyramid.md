# /testing-pyramid

Analyze test distribution and maintain testing pyramid principles.

## Usage

```
/testing-pyramid [--analyze|--fix]
```

## When to Use

Use this command when:
- Reviewing test coverage
- Adding new tests
- Ensuring proper test distribution
- Identifying testing anti-patterns

## Testing Pyramid

```
    /\
   /  \    E2E Tests (few)
  /____\
 /      \  Integration Tests
/________\
          Unit Tests (many)
```

### Distribution

- **Unit Tests (70%)**: Fast, isolated, cheap
- **Integration Tests (20%)**: Component interaction, slower
- **E2E Tests (10%)**: Full flow, slowest, most expensive

## Anti-Patterns to Avoid

- **Testing Trophy**: Too many integration tests
- **Ice Cream Cone**: Too many E2E tests
- **Hourglass**: Missing integration tests

## Agent

Uses **qwoof** for quality-focused analysis.

## Related

- `/dev` - Feature implementation with proper tests
- `/refactor` - Refactoring while maintaining test coverage
