# /commit

Create conventional commits with AI assistance.

## Usage

```
/commit [message-or-description]
```

## When to Use

Use this command when:
- Ready to commit changes
- Need help writing commit messages
- Following conventional commit standards

## Conventional Commits Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style (formatting, semicolons, etc.)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Build process or auxiliary tool changes

## Agent

Uses **BasicBitch** for straightforward commits.

## Related

- `/branch` - Branch management
- `/analyze-commits` - Commit history analysis
