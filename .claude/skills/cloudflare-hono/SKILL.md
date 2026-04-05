---
name: cloudflare-hono
description: Hono lightweight web framework on Cloudflare Workers
triggers:
  - file_pattern: "**/hono/**/*.ts"
  - command: "/hono"
---

# Cloudflare Hono Skill

Build fast, lightweight web applications with Hono on Cloudflare Workers.

## When to Use

- Creating web APIs
- Building middleware chains
- Handling routing
- Implementing middleware logic

## Critical Rules

### App Setup
- Create Hono instance with proper types
- Use generic for environment bindings
- Set up middleware early
- Configure CORS appropriately

### Routing
- Use type-safe routing
- Leverage path parameters
- Use HTTP method handlers
- Group related routes

### Middleware
- Create reusable middleware
- Type context extensions
- Handle errors in middleware
- Use built-in middleware

### TypeScript
- Type environment bindings
- Use generics for variables
- Type request/response properly
- Leverage Hono's type inference

## Examples

### Good
```typescript
import { Hono } from 'hono';
import { cors } from 'hono/cors';

interface Bindings {
  KV: KVNamespace;
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>();

app.use('/*', cors());

app.get('/api/users/:id', async (c) => {
  const id = c.req.param('id');
  const user = await c.env.DB.prepare(
    'SELECT * FROM users WHERE id = ?'
  ).bind(id).first();
  
  if (!user) {
    return c.json({ error: 'Not found' }, 404);
  }
  
  return c.json(user);
});

export default app;
```

## Related

- `/cloudflare-workers` - CF Workers fundamentals
- `/typescript` - TypeScript patterns
