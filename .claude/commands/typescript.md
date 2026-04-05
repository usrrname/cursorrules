# /typescript

Apply TypeScript best practices and coding standards.

## Usage

```
/typescript [file-or-code]
```

## When to Invoke

Use this command when:
- Writing new TypeScript code
- Refactoring JavaScript to TypeScript
- Reviewing TypeScript for quality issues
- Setting up TypeScript configuration

## Standards Applied

### Type Safety
- Strict mode enforcement
- No implicit any
- Explicit return types
- Proper null checks

### Naming
- PascalCase for types/interfaces
- camelCase for functions/variables
- UPPER_SNAKE_CASE for constants

### Patterns
- Interface over type for objects
- Discriminated unions for state
- Generics for reusable code
- Readonly for immutability

## Examples

### Input
```typescript
function getData(id) {
  return fetch('/api/' + id);
}
```

### Output
```typescript
interface Data {
  id: string;
  value: number;
}

async function getData(id: string): Promise<Data | null> {
  const response = await fetch(`/api/${id}`);
  if (!response.ok) return null;
  return response.json();
}
```

## Agent

Uses **BasicBitch** for reliable TypeScript implementation.

## Related

- `/react` - React TypeScript patterns
- `/vue3` - Vue TypeScript integration
