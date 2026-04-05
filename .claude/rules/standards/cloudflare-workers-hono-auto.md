# Cloudflare Workers with Hono framework development standards and best practices

## Description
Cloudflare Workers with Hono framework development standards and best practices

## Applicability
- **Files:** `*.worker.{js,ts},**/workers/**/*.{js,ts},**/src/**/*.{js,ts},wrangler.{json,jsonc}`
- **Always Apply:** false

## Rules
- Workers MUST use Hono framework for routing and middleware
- Workers MUST avoid creating "Ruby on Rails-like Controllers" when possible
- Workers MUST write handlers directly after path definitions for proper type inference
- Workers MUST use `app.route()` for larger applications instead of controllers
- Workers MUST use `factory.createHandlers()` if controller-like patterns are needed
- Workers MUST use proper TypeScript types with Hono Context
- Workers MUST separate route files for different endpoints in larger applications
- Workers MUST use proper Hono middleware patterns
- Workers MUST integrate properly with Cloudflare Workers environment bindings
- Workers MUST use wrangler.jsonc configuration with Hono setup

### hono-no-controllers

Enforce direct handler patterns instead of Rails-like controllers

**Actions:**
  - type: suggest
    conditions:
      - pattern: "const\\s+\\w+\\s*=\\s*\\(c:\\s*Context\\)\\s*=>.*app\\.(get|post|put|delete|patch)\\([^,]*,\\s*\\w+\\)"
        message: |
          Avoid Rails-like controllers. Write handlers directly for better type inference:
          ```typescript
          // 🙁 Don't do this
          const booksList = (c: Context) => {
            return c.json('list books')
          }
          app.get('/books', booksList)
          
          // 😃 Do this instead
          app.get('/books', (c) => {
            return c.json('list books')
          })
          ```
examples:
  - input: |
      const booksList = (c: Context) => {
        return c.json('list books')
      }
      app.get('/books', booksList)
    output: |
      app.get('/books', (c) => {
        return c.json('list books')
      })
metadata:

### hono-path-param-inference

Ensure proper path parameter type inference

**Actions:**
  - type: suggest
    conditions:
      - pattern: "const\\s+\\w+\\s*=\\s*\\(c:\\s*Context\\)\\s*=>.*c\\.req\\.param\\("
        message: |
          Use inline handlers for proper path parameter inference:
          ```typescript
          // 🙁 Can't infer path params in controller
          const bookPermalink = (c: Context) => {
            const id = c.req.param('id') // Can't infer the path param
            return c.json(`get ${id}`)
          }
          
          // 😃 Proper type inference
          app.get('/books/:id', (c) => {
            const id = c.req.param('id') // Can infer the path param
            return c.json(`get ${id}`)
          })
          ```
examples:
  - input: |
      const bookPermalink = (c: Context) => {
        const id = c.req.param('id')
        return c.json(`get ${id}`)
      }
      app.get('/books/:id', bookPermalink)
    output: |
      app.get('/books/:id', (c) => {
        const id = c.req.param('id')
        return c.json(`get ${id}`)
      })
metadata:

### hono-factory-pattern

Use factory.createHandlers() when controller patterns are needed

**Actions:**
  - type: suggest
    conditions:
      - pattern: "from\\s+['\"]hono['\"].*createFactory"
        message: |
          Import createFactory from 'hono/factory':
          ```typescript
          import { createFactory } from 'hono/factory'
          
          const factory = createFactory()
          
          const handlers = factory.createHandlers(middleware, (c) => {
            return c.json(c.var.foo)
          })
          
          app.get('/api', ...handlers)
          ```
examples:
  - input: |
      import { createFactory } from 'hono'
    output: |
      import { createFactory } from 'hono/factory'
metadata:

### hono-app-structure

Enforce proper app structure for larger applications

**Actions:**
  - type: suggest
    conditions:
      - pattern: "new Hono\\(\\)"
        message: |
          For larger applications, create separate route files:
          ```typescript
          // authors.ts
          import { Hono } from 'hono'
          
          const app = new Hono()
          
          app.get('/', (c) => c.json('list authors'))
          app.post('/', (c) => c.json('create an author', 201))
          app.get('/:id', (c) => c.json(`get ${c.req.param('id')}`))
          
          export default app
          
          // index.ts
          import { Hono } from 'hono'
          import authors from './authors'
          import books from './books'
          
          const app = new Hono()
          
          app.route('/authors', authors)
          app.route('/books', books)
          
          export default app
          ```
examples:
  - input: |
      const app = new Hono()
      app.get('/authors', (c) => c.json('list authors'))
      app.get('/books', (c) => c.json('list books'))
    output: |
      // Separate into authors.ts and books.ts files
      import authors from './authors'
      import books from './books'
      
      const app = new Hono()
      app.route('/authors', authors)
      app.route('/books', books)
metadata:

### hono-cloudflare-workers-integration

Ensure proper integration with Cloudflare Workers environment

**Actions:**
  - type: validate
    conditions:
      - pattern: "new Hono\\(\\)(?![\\s\\S]*<.*Env.*>)"
        message: |
          Define proper TypeScript types for Cloudflare Workers environment:
          ```typescript
          interface Env {
            MY_KV: KVNamespace;
            MY_D1: D1Database;
            MY_VAR: string;
          }
          
          const app = new Hono<{ Bindings: Env }>()
          
          app.get('/api', (c) => {
            const kv = c.env.MY_KV // Properly typed
            return c.json({ success: true })
          })
          
          export default app
          ```
examples:
  - input: |
      const app = new Hono()
      
      app.get('/api', (c) => {
        const kv = c.env.MY_KV
        return c.json({ success: true })
      })
    output: |
      interface Env {
        MY_KV: KVNamespace;
      }
      
      const app = new Hono<{ Bindings: Env }>()
      
      app.get('/api', (c) => {
        const kv = c.env.MY_KV
        return c.json({ success: true })
      })
metadata:

### hono-middleware-patterns

Enforce proper Hono middleware usage patterns

**Actions:**
  - type: suggest
    conditions:
      - pattern: "app\\.use\\("
        message: |
          Use proper middleware patterns with Hono:
          ```typescript
          import { logger } from 'hono/logger'
          import { cors } from 'hono/cors'
          import { secureHeaders } from 'hono/secure-headers'
          
          const app = new Hono<{ Bindings: Env }>()
          
          // Global middleware
          app.use('*', logger())
          app.use('*', secureHeaders())
          app.use('/api/*', cors())
          
          // Route-specific middleware
          app.use('/admin/*', async (c, next) => {
            // Authentication middleware
            await next()
          })
          ```
examples:
  - input: |
      app.use((c, next) => {
        console.log('Request received')
        return next()
      })
    output: |
      import { logger } from 'hono/logger'
      
      app.use('*', logger())
      app.use('*', async (c, next) => {
        console.log('Request received')
        await next()
      })
metadata:

### hono-error-handling

Enforce proper error handling patterns with Hono

**Actions:**
  - type: suggest
    conditions:
      - pattern: "throw new Error"
        message: |
          Use proper error responses with Hono:
          ```typescript
          // 🙁 Don't throw errors
          throw new Error('Something went wrong')
          
          // 😃 Return proper error responses
          return c.json({ error: 'Something went wrong' }, 500)
          
          // Or use Hono's HTTPException
          import { HTTPException } from 'hono/http-exception'
          
          app.onError((err, c) => {
            if (err instanceof HTTPException) {
              return c.json({ error: err.message }, err.status)
            }
            return c.json({ error: 'Internal Server Error' }, 500)
          })
          ```
examples:
  - input: |
      if (error) {
        throw new Error('Failed to process')
      }
    output: |
      if (error) {
        return c.json({ error: 'Failed to process' }, 500)
      }
metadata:

### hono-wrangler-config

Ensure proper wrangler.jsonc configuration for Hono projects

**Actions:**
  - type: suggest
    conditions:
      - pattern: "\\{"
        message: |
          Proper wrangler.jsonc configuration for Hono:
          ```jsonc
          {
            "name": "my-hono-worker",
            "main": "src/index.ts",
            "compatibility_date": "2025-02-11",
            "compatibility_flags": ["nodejs_compat"],
            "observability": {
              "enabled": true
            },
            "vars": {
              "ENVIRONMENT": "production"
            },
            "kv_namespaces": [
              {
                "binding": "MY_KV",
                "id": "your-kv-namespace-id"
              }
            ]
          }
          ```
examples:
  - input: |
      {
        "name": "worker"
      }
    output: |
      {
        "name": "my-hono-worker",
        "main": "src/index.ts",
        "compatibility_date": "2025-02-11",
        "compatibility_flags": ["nodejs_compat"],
        "observability": {
          "enabled": true
        }
      }
metadata:

## Additional Information
# Cloudflare Workers with Hono Best Practices

Enforces best practices for developing Cloudflare Workers using the Hono framework, including proper routing patterns, application structure, and TypeScript usage.


















## Hono Framework Integration Guidelines

### Project Structure for Larger Applications
```
src/
├── index.ts          # Main entry point
├── routes/
│   ├── authors.ts    # Author routes
│   ├── books.ts      # Book routes
│   └── admin.ts      # Admin routes
├── middleware/
│   ├── auth.ts       # Authentication middleware
│   └── cors.ts       # CORS middleware
└── types/
    └── env.ts        # Environment type definitions
```

### Recommended Hono Middleware
```typescript
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'
import { prettyJSON } from 'hono/pretty-json'
import { timing } from 'hono/timing'
```

### Environment Types Template
```typescript
interface Env {
  // KV Namespaces
  MY_KV: KVNamespace;
  
  // D1 Databases
  MY_D1: D1Database;
  
  // R2 Buckets
  MY_R2: R2Bucket;
  
  // Environment Variables
  API_KEY: string;
  ENVIRONMENT: string;
}

const app = new Hono<{ Bindings: Env }>()
```

### Route File Template
```typescript
// routes/books.ts
import { Hono } from 'hono'

type Bindings = {
  MY_KV: KVNamespace;
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', (c) => c.json('list books'))
app.post('/', (c) => c.json('create a book', 201))
app.get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

export default app
```

tests:
  - input: |
      const booksList = (c: Context) => {
        return c.json('list books')
      }
      app.get('/books', booksList)
    output: |
      app.get('/books', (c) => {
        return c.json('list books')
      })

  - input: |
      const app = new Hono()
    output: |
      interface Env {
        // Define your bindings here
      }
      
      const app = new Hono<{ Bindings: Env }>()

  - input: |
      throw new Error('Failed to process')
    output: |
      return c.json({ error: 'Failed to process' }, 500)

  - input: |
      import { createFactory } from 'hono'
    output: |
      import { createFactory } from 'hono/factory'

  - input: |
      app.get('/authors', (c) => c.json('list authors'))
      app.get('/books', (c) => c.json('list books'))
    output: |
      // Separate into route files
      import authors from './routes/authors'
      import books from './routes/books'
      
      app.route('/authors', authors)
      app.route('/books', books)

</rule>