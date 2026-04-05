---
name: nextjs-react19
description: Next.js with React 19 App Router patterns
triggers:
  - file_pattern: "app/**/page.tsx"
  - file_pattern: "app/**/layout.tsx"
  - command: "/nextjs"
---

# Next.js React 19 Skill

Build modern Next.js applications with App Router and React 19 features.

## When to Use

- Creating Next.js pages and layouts
- Working with Server Components
- Implementing data fetching
- Setting up API routes

## Critical Rules

### App Router
- Use Server Components by default
- Mark Client Components with 'use client'
- Keep Client Components small and focused
- Use async/await in Server Components

### Data Fetching
- Fetch directly in Server Components
- Use React.cache for deduplication
- Implement proper error boundaries
- Use loading.js for suspense states

### Routing
- Use file-based routing in app/
- Implement parallel routes with @folder
- Use intercepting routes for modals
- Handle dynamic segments with [param]

### React 19 Features
- Use Actions for form mutations
- Leverage useOptimistic for UI updates
- Implement useFormStatus for pending states
- Use Server Actions for mutations

## Examples

### Good
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

// Client Component
'use client';

function LikeButton({ postId }: { postId: string }) {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (state) => state + 1
  );
  
  return <button>{optimisticLikes} likes</button>;
}
```

## Related

- `/react` - React TypeScript patterns
- `/typescript` - TypeScript fundamentals
