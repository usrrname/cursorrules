# Test Distribution Analysis Command 🧪

This command guides the AI agent to analyze test distribution across unit, integration, and E2E tests, and provide recommendations for increasing test coverage and improving test distribution in line with business and technical strategy.

## Critical Rules

- Always start by identifying the test framework and available coverage tools
- Analyze test distribution using framework-specific commands to list all test files
- Classify tests accurately as unit, integration, or E2E based on multiple indicators
- Target distribution: 70% unit tests, 20% integration tests, 10% E2E tests (this is a guideline at early stages of a project, not a strict requirement)
- Provide actionable recommendations when distribution deviates from ideal ratios
- Consider test file organization, naming conventions, and co-location with source code
- Evaluate test quality indicators (arrange-act-assert pattern, independence, clarity)
- Identify common violations and suggest improvements

## Workflow Phases

### 1. Framework Identification

- Check `package.json` for test framework dependencies:
  - **Jest**: `jest` or `@jest/core` in dependencies/devDependencies
  - **Vitest**: `vitest` in dependencies/devDependencies
  - **Playwright**: `@playwright/test` in dependencies/devDependencies
  - **Cypress**: `cypress` in dependencies/devDependencies
  - **Mocha**: `mocha` in dependencies/devDependencies
- Identify coverage tools and scripts in `package.json`:
  - Look for `test:coverage`, `coverage`, or scripts with `--coverage` flags
  - Note available coverage reporters and formats

### 2. Test Discovery

Use framework-specific commands to list all test files:

- **Jest**: `npx jest --listTests` (lists all test files without running)
- **Vitest**: `npx vitest list` (lists all test files)
- **Playwright**: `npx playwright test --list` (lists all test specs)
- **Cypress**: Check `cypress.config.js` for `specPattern` or run `npx cypress run --dry-run`

**Checkpoint:** Verify all test files are discovered and no test directories are missed.

### 3. Test Classification

Classify each test file as unit, integration, or E2E based on multiple indicators:

#### Classification Criteria

**File Path Indicators:**

- `e2e/`, `tests/e2e/`, `__e2e__/` → E2E tests
- `integration/`, `tests/integration/`, `__integration__/` → Integration tests
- `unit/`, `tests/unit/`, `__tests__/` → Unit tests (if not in e2e/integration folders)

**Content Keywords:**

- **E2E indicators**: `playwright`, `cypress`, `page.goto`, `browser`, `user journey`, `visit`, `click`, `fill`
- **Integration indicators**: `database`, `api`, `service`, `repository`, `endpoint`, `http`, `fetch`, `axios`, `click`, `fill`
- **Unit indicators**: `mock`, `stub`, `spy`, `jest.fn()`, `vi.fn()`, isolated function testing

**Test Framework Indicators:**

- E2E frameworks have distinct APIs (page objects, browser commands, navigation)
- Integration tests often use test databases or mock servers
- Unit tests focus on isolated function/component behavior

**Checkpoint:** Review classification accuracy by sampling test files from each category.

### 4. Distribution Analysis

Calculate test distribution:

1. Count tests by category:

   - Total unit tests
   - Total integration tests
   - Total E2E tests
   - Total tests overall

2. Calculate percentages:

   - Unit percentage: `(unit tests / total tests) × 100`
   - Integration percentage: `(integration tests / total tests) × 100`
   - E2E percentage: `(e2e tests / total tests) × 100`

3. Compare to ideal ratios:
   - Target: 70% unit, 20% integration, 10% E2E
   - Identify deviations and their magnitude

**Checkpoint:** Present distribution findings and highlight significant deviations.

### 5. Quality Assessment

Evaluate test quality indicators:

- **Structure**: Do tests follow Arrange-Act-Assert pattern? Do E2E tests follow page object model or Given-When-Then pattern?
- **Independence**: Can tests run in any order?
- **Clarity**: Are test names descriptive and scenario-focused?
- **Coverage**: Are critical paths and edge cases covered?
- **Maintainability**: Is test code clean and well-organized? Are tests coupled to the implementation details of the codebase?
- **Speed**: Are unit tests fast? Are slow tests appropriately categorized?

### 6. Violation Detection

Identify common violations:

1. **Inverted pyramid** (more E2E than unit tests)
2. **Missing integration tests** between critical services
3. **Testing implementation details** in E2E tests
4. **Excessive mocking** in integration tests
5. **Testing multiple units** in a single unit test
6. **Missing Arrange-Act-Assert** structure
7. **Dependent tests** that must run in specific order
8. **Missing error case** coverage
9. **Brittle tests** that break with minor changes
10. **Insufficient test documentation**

### 7. Recommendations

Provide actionable recommendations:

- **Distribution adjustments**: Suggest adding/removing tests in specific categories
- **Test organization**: Recommend file structure improvements
- **Test quality**: Suggest refactoring for better patterns
- **Coverage gaps**: Identify missing test scenarios
- **Framework optimization**: Suggest better use of framework features
- **Test maintenance**: Recommend cleanup and refactoring priorities

## Test Type Standards

### Unit Tests (Target: 70%)

**Characteristics:**

- Test individual functions, methods, or components in isolation
- Fast execution (< 100ms per test typically)
- Deterministic results
- Use mocks for external dependencies
- Focus on business logic and edge cases
- High code coverage

**Best Practices:**

- Co-locate with source code when possible
- Use clear, descriptive test names that describe the test scenario
- Follow Arrange-Act-Assert pattern
- Test one thing per test
- Use meaningful test data
- Mock external dependencies

**Example Structure:**

```typescript
describe("User Processing", () => {
  it("should process valid user data correctly", () => {
    // Arrange
    const mockUser = createMockUser()

    // Act
    const result = processUserData(mockUser)

    // Assert
    expect(result).toEqual(expected)
  })
})
```

### Integration Tests (Target: 20%)

**Characteristics:**

- Test interaction between multiple components or services
- Use real dependencies when possible
- Focus on API contracts and data flow
- Cover main success and error paths
- Slower than unit tests but faster than E2E

**Best Practices:**

- Test service interactions
- Verify data transformations
- Test error handling between layers
- Use test databases or mock servers
- Focus on critical integration points

**Example Structure:**

```typescript
describe("User Authentication Integration", () => {
  it("should successfully authenticate valid user", async () => {
    // Arrange
    const user = await createTestUser()

    // Act
    const result = await authService.authenticate(user.credentials)

    // Assert
    expect(result.authenticated).toBe(true)
  })
})
```

### End-to-End Tests (Target: 10%)

**Characteristics:**

- Test complete user journeys
- Run against production-like environment
- Focus on critical business flows
- Can be slow and more brittle
- Should be minimal but crucial

**Best Practices:**

- Focus on critical user journeys only
- Test happy paths and critical error scenarios
- Use page object models
- Keep tests independent
- Use appropriate wait strategies

**Example Structure:**

```typescript
describe("Critical User Journey", () => {
  it("should allow user to complete checkout process", async () => {
    // Arrange
    await loginAsTestUser()

    // Act
    await navigateToProducts()
    await addItemToCart()
    await proceedToCheckout()
    await fillShippingDetails()
    await completePayment()

    // Assert
    await expect(page.locator("#order-confirmation")).toBeVisible()
  })
})
```

## Analysis Report Template

When presenting analysis results, include:

```markdown
## Test Distribution Analysis

### Framework Information

- **Primary Framework**: [Framework name]
- **Coverage Tool**: [Tool name]
- **Total Test Files**: [Number]

### Distribution Breakdown

- **Unit Tests**: [Count] ([Percentage]%) - Target: 70%
- **Integration Tests**: [Count] ([Percentage]%) - Target: 20%
- **E2E Tests**: [Count] ([Percentage]%) - Target: 10%

### Findings

- [Finding 1]
- [Finding 2]
- [Finding 3]

### Violations Detected

1. [Violation description]
2. [Violation description]

### Recommendations

1. [Actionable recommendation]
2. [Actionable recommendation]
3. [Actionable recommendation]

### Priority Actions

- **High Priority**: [Actions]
- **Medium Priority**: [Actions]
- **Low Priority**: [Actions]
```

## Usage Examples

### Example 1: Analyzing Jest Project

```bash
# Discover tests
npx jest --listTests

# Run analysis
# Classify tests by path and content
# Calculate distribution
# Provide recommendations
```

### Example 2: Analyzing Vitest + Playwright Project

```bash
# Discover unit/integration tests
npx vitest list

# Discover E2E tests
npx playwright test --list

# Combine results and analyze
```

## Key Principles

1. **Accuracy**: Classify tests correctly using multiple indicators
2. **Actionability**: Provide specific, implementable recommendations
3. **Balance**: Maintain proper pyramid distribution
4. **Quality**: Assess test quality, not just quantity
5. **Context**: Consider project size, complexity, and team capabilities
6. **Maintainability**: Recommend sustainable test practices
7. **Coverage**: Identify gaps in test coverage
8. **Performance**: Consider test execution time and CI/CD impact
9. **Independence**: Ensure tests can run in any order
10. **Clarity**: Make recommendations clear and easy to understand
