# Provides guidance on testing pyramid principles and how to analyze test distribution

## Description
Provides guidance on testing pyramid principles and how to analyze test distribution. Use this rule when discussing test distribution, test strategy, or when analyzing test coverage across unit, integration, and E2E tests.

## Applicability
- **Files:** `**/*.test.js, *.spec.js, *.test.ts, *.spec.ts, *.test.jsx, *.spec.jsx, *.test.tsx`
- **Always Apply:** false

## Rules
- Follow the testing pyramid ratio: 70% unit tests, 20% integration tests, 10% end-to-end tests
- Every new feature must include tests at appropriate levels of the pyramid
- Unit tests must be written for all business logic and utility functions
- Integration tests must cover all critical paths and service interactions
- End-to-end tests should focus on critical user journeys only
- Test files must be co-located with the code they test
- Mock external dependencies in unit tests, use real dependencies in integration tests
- Test names must clearly describe the scenario being tested
- Each test should follow the Arrange-Act-Assert pattern
- Avoid test interdependence - each test should be able to run independently

### testing-pyramid-analysis

Guides developers on testing pyramid principles and how to analyze test distribution

**Actions:**
  - type: suggest
    message: |
      To analyze test distribution, first identify the test framework and check for coverage commands:
      
      1. Check package.json for test framework dependencies (jest, vitest, playwright, cypress, mocha)
      2. Look for coverage scripts in package.json scripts section (test:coverage, coverage, etc.)
      3. Use the framework's list command to identify test files:
         - Jest: `npx jest --listTests`
         - Vitest: `npx vitest list`
         - Playwright: `npx playwright test --list`
         - Cypress: Check cypress.config.js for test patterns
      
      Then classify tests by:
      - File path (e2e/, integration/, unit/)
      - Content keywords (mock, playwright, cypress, database, etc.)
      - Test framework indicators
      
      Target distribution: 70% unit, 20% integration, 10% E2E

examples:

- description: "Unit Test Example"

## Additional Information
# Testing Pyramid Analysis

This rule provides guidance on the testing pyramid principle and how to analyze test distribution in your repository.

## Identifying Test Framework and Coverage Commands

When analyzing test distribution, follow these steps:

### 1. Identify Test Framework

Check `package.json` for test framework dependencies:

- **Jest**: `jest` or `@jest/core` in dependencies/devDependencies
- **Vitest**: `vitest` in dependencies/devDependencies
- **Playwright**: `@playwright/test` in dependencies/devDependencies
- **Cypress**: `cypress` in dependencies/devDependencies
- **Mocha**: `mocha` in dependencies/devDependencies

### 2. Check for Coverage Commands

Look in `package.json` scripts section for:

- `test:coverage` or `coverage` scripts
- Scripts that include coverage flags (`--coverage`, `--coverage-report`, etc.)

### 3. Use Framework Commands to List Tests

- **Jest**: `npx jest --listTests` (lists all test files without running)
- **Vitest**: `npx vitest list` (lists all test files)
- **Playwright**: `npx playwright test --list` (lists all test specs)
- **Cypress**: Check `cypress.config.js` for `specPattern` or run `npx cypress run --dry-run`

### 4. Classify Tests

Classify each test file as unit, integration, or E2E based on:

- **File path**: `e2e/`, `integration/`, `unit/` directories
- **Content keywords**:
  - E2E: `playwright`, `cypress`, `page.goto`, `browser`, `user journey`
  - Integration: `database`, `api`, `service`, `repository`, `endpoint`
  - Unit: `mock`, `stub`, `spy`, isolated function testing
- **Test framework indicators**: E2E frameworks have distinct APIs (page objects, browser commands)

## Testing Pyramid Standards

This rule defines the standards for maintaining a proper testing pyramid in your codebase, ensuring comprehensive test coverage across all levels while maintaining the right balance between different types of tests.


## Test File Organization

- Test files should be named with `.test.{js,ts,jsx,tsx}` or `.spec.{js,ts,jsx,tsx}` suffix
- Test files should mirror the structure of the source code
- Group related tests using describe blocks
- Use clear, descriptive test names that explain the scenario and expected outcome

## Test Types and Their Characteristics

### Unit Tests (70%)

- Test individual functions, methods, or components in isolation
- Should be fast and deterministic
- Use mocks for external dependencies
- Focus on business logic and edge cases
- Should have high code coverage

### Integration Tests (20%)

- Test interaction between multiple components or services
- Use real dependencies when possible
- Focus on API contracts and data flow
- Cover main success and error paths
- Can be slower than unit tests

### End-to-End Tests (10%)

- Test complete user journeys
- Run against production-like environment
- Focus on critical business flows
- Can be slow and more brittle
- Should be minimal but crucial

## Analyzing Test Distribution

To analyze your test distribution:

1. **Identify all test files** using your framework's list command
2. **Classify each test** as unit, integration, or E2E
3. **Calculate percentages**: unit / total, integration / total, e2e / total
4. **Compare to ideal ratios**: 70% unit, 20% integration, 10% E2E
5. **Make recommendations** based on deviations from ideal

Example workflow:

```bash
# For Jest projects
npx jest --listTests > test-files.txt
# Then manually classify or use path/content analysis
```

## Common Violations

1. Inverting the pyramid (more E2E tests than unit tests)
2. Missing integration tests between critical services
3. Testing implementation details in E2E tests
4. Excessive mocking in integration tests
5. Testing multiple units in a single unit test
6. Writing tests without clear arrange-act-assert structure
7. Dependent tests that must run in a specific order
8. Missing error case coverage
9. Brittle tests that break with minor changes
10. Insufficient test documentation

Regularly analyze your test distribution using the framework's list commands to catch these issues early.

## Best Practices

1. Write tests before or while writing code (TDD/BDD)
2. Keep tests focused and concise
3. Use meaningful test data
4. Avoid test code duplication
5. Maintain test code quality as production code
6. Regular test maintenance and refactoring
7. Monitor test execution time
8. Include both positive and negative test cases
9. Document test setup and special conditions
10. Use appropriate testing tools and frameworks