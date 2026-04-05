---
name: mysql
description: MySQL database best practices and query patterns
triggers:
  - file_pattern: "*.sql"
  - command: "/mysql"
---

# MySQL Skill

Write efficient, secure MySQL queries and database schemas.

## When to Use

- Designing database schemas
- Writing SQL queries
- Optimizing query performance
- Managing database migrations

## Critical Rules

### Schema Design
- Use appropriate data types
- Define primary keys on all tables
- Add indexes for frequently queried columns
- Use foreign keys for referential integrity
- Normalize to 3NF, denormalize when needed for performance

### Query Writing
- Use parameterized queries (never string concatenation)
- SELECT only needed columns
- Use EXPLAIN to analyze query performance
- Avoid SELECT * in production
- Use JOINs appropriately

### Security
- Never expose database credentials in code
- Use connection pooling
- Sanitize all user inputs
- Grant least privilege access
- Enable SSL/TLS for connections

### Performance
- Index foreign keys
- Use EXPLAIN ANALYZE for optimization
- Batch inserts when possible
- Use transactions for multi-statement operations
- Monitor slow query log

## Examples

### Good
```sql
-- Parameterized query
SELECT id, name, email 
FROM users 
WHERE status = ? AND created_at > ?;

-- Proper indexing
CREATE INDEX idx_user_status ON users(status, created_at);
```

### Bad
```sql
-- String concatenation (SQL injection risk)
SELECT * FROM users WHERE name = '$userInput';

-- Missing LIMIT on large tables
SELECT * FROM logs;
```

## Related

- `/typescript` - For database interface types
- `/laravel` - Laravel database patterns
