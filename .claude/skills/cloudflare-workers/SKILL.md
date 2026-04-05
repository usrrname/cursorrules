---
name: cloudflare-workers
description: Cloudflare Workers edge computing platform
triggers:
  - file_pattern: "wrangler.toml"
  - file_pattern: "functions/**/*.ts"
  - command: "/cf-workers"
---

# Cloudflare Workers Skill

Build edge functions and applications on Cloudflare's global network.

## When to Use

- Creating serverless edge functions
- Building API endpoints
- Handling requests at the edge
- Implementing middleware

## Critical Rules

### Worker Structure
- Export default object with fetch handler
- Use TypeScript for type safety
- Handle errors with proper responses
- Use Request/Response Web APIs

### Platform APIs
- Use KV for key-value storage
- Use Durable Objects for state
- Leverage Cache API for caching
- Use R2 for object storage

### Performance
- Keep cold starts minimal
- Use streaming for large responses
- Minimize dependencies
- Bundle efficiently with wrangler

### Development
- Test locally with `wrangler dev`
- Use miniflare for testing
- Set up proper TypeScript types
- Configure wrangler.toml correctly

## Examples

### Good
```typescript
export interface Env {
  KV_NAMESPACE: KVNamespace;
  DB: D1Database;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);
    
    if (url.pathname === '/api/data') {
      const data = await env.KV_NAMESPACE.get('key');
      return Response.json({ data });
    }
    
    return new Response('Not Found', { status: 404 });
  }
};
```

## Related

- `/cloudflare-hono` - Hono framework on Workers
- `/typescript` - TypeScript fundamentals
