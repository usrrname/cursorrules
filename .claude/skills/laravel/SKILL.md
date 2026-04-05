---
name: laravel
description: Laravel PHP framework best practices
triggers:
  - file_pattern: "*.php"
  - file_pattern: "routes/*.php"
  - command: "/laravel"
---

# Laravel Skill

Build robust PHP applications with Laravel framework.

## When to Use

- Creating Laravel applications
- Building APIs with Laravel
- Writing Eloquent models
- Implementing authentication

## Critical Rules

### Architecture
- Follow MVC pattern
- Use Service classes for business logic
- Implement Repository pattern for data access
- Use Form Request classes for validation
- Keep controllers thin, models rich

### Eloquent ORM
- Use eager loading to avoid N+1 queries
- Define relationships explicitly
- Use accessors/mutators sparingly
- Leverage query scopes
- Use factories for testing

### Security
- Use Laravel's authentication system
- Hash passwords with bcrypt
- Use CSRF protection on forms
- Sanitize user inputs
- Use authorization gates/policies

### Code Style
- Follow PSR-12 coding standards
- Use type hints
- Leverage Laravel's helper functions
- Write docblocks for complex methods
- Use meaningful variable names

## Examples

### Good
```php
class UserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $users = User::with('posts')
            ->active()
            ->paginate(20);
            
        return response()->json($users);
    }
}
```

### Bad
```php
// N+1 query problem
$users = User::all();
foreach ($users as $user) {
    echo $user->posts->count(); // Query in loop
}
```

## Related

- `/mysql` - Database patterns
- `/typescript` - For API type definitions
