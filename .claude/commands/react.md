# /react

Apply React with TypeScript best practices.

## Usage

```
/react [component-or-hook]
```

## When to Invoke

Use this command when:
- Creating React components
- Building custom hooks
- Managing React state
- Handling events with TypeScript

## Standards Applied

### Component Patterns
- FC type or explicit function types
- Props interfaces with readonly
- Proper children typing
- Event handler types

### Hooks
- useState with generics
- useReducer typed actions
- useRef for elements/values
- Custom hooks with full signatures

### Props Design
- Optional props with `?`
- Discriminated unions for variants
- ComponentProps for wrappers
- forwardRef typing

## Examples

### Input
```typescript
function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}
```

### Output
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
  return (
    <button className={variant} onClick={onClick}>
      {children}
    </button>
  );
};
```

## Agent

Uses **BasicBitch** with **Spellchuck** for documentation.

## Related

- `/typescript` - TypeScript fundamentals
- `/nextjs` - Next.js React patterns
