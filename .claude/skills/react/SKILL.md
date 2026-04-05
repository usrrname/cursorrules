---
name: react-typescript
description: React with TypeScript best practices
model: inherit
triggers:
  - file_pattern: "*.tsx"
---

# React TypeScript Skill

Build type-safe React components with modern patterns.

## When to Use

- Creating React components
- Managing React state
- Handling events with TypeScript
- Building custom hooks

## Critical Rules

### Component Types
- Use `React.FC` or explicit function types
- Define props interfaces
- Use `children?: React.ReactNode`
- Type event handlers explicitly

### Hooks
- Type useState with explicit generics
- Use generics for useReducer actions
- Type useRef properly (elements vs values)
- Create custom hooks with full type signatures

### Props & State
- Make optional props truly optional with `?`
- Use `readonly` for props
- Prefer interfaces over type aliases for props
- Document complex props with JSDoc

### Patterns
- Use discriminated unions for variant props
- Leverage React.ComponentProps for wrapper components
- Type forwardRef components correctly
- Use satisfies operator for config objects

## Examples

### Good
```typescript
interface ButtonProps {
  readonly variant: 'primary' | 'secondary';
  readonly children: React.ReactNode;
  readonly onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  onClick
}) => {
  return <button onClick={onClick}>{children}</button>;
};
```

## Related

- `/typescript` - General TypeScript standards
- `/nextjs` - Next.js React patterns
