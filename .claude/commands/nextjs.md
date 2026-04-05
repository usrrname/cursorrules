# /nextjs

Apply Next.js App Router and React 19 patterns.

## Usage

```
/nextjs [page-or-api-route]
```

## When to Invoke

Use this command when:
- Creating Next.js pages or layouts
- Working with Server Components
- Implementing data fetching
- Setting up API routes

## Standards Applied

### App Router
- Server Components by default
- 'use client' for Client Components
- Async/await in Server Components
- Proper error boundaries

### Data Fetching
- Fetch in Server Components
- React.cache for deduplication
- loading.js for Suspense
- Error handling patterns

### React 19 Features
- Actions for mutations
- useOptimistic for UI
- useFormStatus for pending states
- Server Actions

## Examples

```typescript
// Server Component
async function BlogPage() {
  const posts = await getPosts();
  return (
    <main>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  );
}
```

## Agent

Uses **BasicBitch** for implementation.

## Related

- `/react` - React patterns
- `/typescript` - TypeScript fundamentals
