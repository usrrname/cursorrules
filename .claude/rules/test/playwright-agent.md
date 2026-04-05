# Playwright end-to-end testing best practices

## Description
Playwright end-to-end testing best practices

## Applicability
- **Files:** `*.spec.ts`
- **Always Apply:** false

## Additional Information
# Critical Rules

- Use descriptive and meaningful test names that clearly describe the expected behavior.
- Utilize Playwright fixtures (e.g., `test`, `page`, `expect`) to maintain test isolation and consistency.
- Use `test.beforeEach` and `test.afterEach` for setup and teardown to ensure a clean state for each test.
- Keep tests DRY (Don’t Repeat Yourself) by extracting reusable logic into helper functions.
- Use `page.getByTestId` whenever `data-testid` is defined on an element or container.
- Use the recommended built-in and role-based locators (`page.getByRole`, `page.getByLabel`, `page.getByText`, `page.getByTitle`, etc.) over complex selectors.
- Use `page.getByLocator()` when it's not possible to use any of the above to locate an element.
- Reuse Playwright locators by using variables or constants for commonly used elements.
- Use the `playwright.config.ts` file for global configuration and environment setup.
- Use built-in config objects like `devices` whenever possible.
- Prefer to use web-first assertions (`toBeVisible`, `toHaveText`, etc.) whenever possible.
- Use `expect` matchers for assertions (`toEqual`, `toContain`, `toBeTruthy`, `toHaveLength`, etc.) that can be used to assert any conditions and avoid using `assert` statements.
- Avoid hardcoded timeouts.
- Do not perform exhaustive testing. Stick to critical user paths.
- Use `page.waitFor` with specific conditions or events to wait for elements or states.
- Ensure tests run reliably in parallel without shared state conflicts.
- Avoid commenting on the resulting code.
- Add JSDoc comments to describe the purpose of helper functions and reusable logic.

## 1. Use `@playwright/test`

Leverage the official test runner for built-in fixtures, isolation, and web-first assertions. Avoid the low-level `playwright` library for E2E tests.

❌ BAD: Using `playwright` directly

```typescript
import { chromium } from "playwright"
// ... manual browser/context setup and teardown
const browser = await chromium.launch()
const page = await browser.newPage()
// ...
await browser.close()
```

✅ GOOD: Using `@playwright/test`

```typescript
import { test, expect } from "@playwright/test"
test("should navigate to home", async ({ page }) => {
  await page.goto("/")
  await expect(page).toHaveTitle(/Home/)
})
```

## 2. Prioritize Robust Locators

Use Playwright's built-in Locators API, favoring user-facing attributes over brittle CSS selectors. This drastically improves test stability.

❌ BAD: Fragile, implementation-dependent selectors

```typescript
await page.locator("div.container > ul > li:nth-child(2) > button").click()
```

✅ GOOD: Semantic, user-facing locators

```typescript
await page.getByRole("button", { name: "Add to Cart" }).click()
await page.getByLabel("Username").fill("testuser")
await page.getByTestId("product-item-123").click()
```

## 3. Embrace Web-First Assertions

Playwright's `expect` assertions automatically retry until conditions are met, eliminating manual waits and flakiness. Never use `page.waitForTimeout()`.

❌ BAD: Manual, flaky waits and generic assertions

```typescript
await page.waitForTimeout(2000) // 🚨 Flaky!
const title = await page.title()
assert.equal(title, "My Page") // 🚨 Not web-first
```

✅ GOOD: Reliable, auto-retrying assertions

```typescript
await expect(page).toHaveTitle(/My Page/)
await expect(page.getByText("Welcome")).toBeVisible()
await expect(page.getByRole("checkbox")).toBeChecked()
```

## 4. Implement the Page Object Model (POM)

Encapsulate selectors and actions within dedicated classes. This improves readability, reusability, and maintainability.

❌ BAD: Repeated selectors and logic across tests

```typescript
// test-login.spec.ts
await page.getByLabel("Username").fill("user")
await page.getByLabel("Password").fill("pass")
await page.getByRole("button", { name: "Login" }).click()

// test-profile.spec.ts
// ... same login steps repeated ...
```

✅ GOOD: Centralized Page Object

```typescript
// pages/LoginPage.ts
import { Page, Locator } from "@playwright/test"

export class LoginPage {
  readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.getByLabel("Username")
    this.passwordInput = page.getByLabel("Password")
    this.loginButton = page.getByRole("button", { name: "Login" })
  }

  async navigate() {
    await this.page.goto("/login")
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }
}

// tests/login.spec.ts
import { test, expect } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"

test("should successfully log in", async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.navigate()
  await loginPage.login("testuser", "password")
  await expect(page).toHaveURL(/dashboard/)
})
```

## 5. Optimize Performance with Auth State & Route Blocking

Reduce test execution time by reusing authenticated sessions and blocking unnecessary network requests.

❌ BAD: Logging in for every test and loading all assets

```typescript
test("view profile", async ({ page }) => {
  await page.goto("/login")
  await page.getByLabel("Username").fill("user")
  await page.getByLabel("Password").fill("pass")
  await page.getByRole("button", { name: "Login" }).click()
  await page.goto("/profile") // Loads all images, analytics, etc.
})
```

✅ GOOD: Reusing auth state and blocking requests

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test"
export default defineConfig({
  use: {
    storageState: "playwright-auth.json", // Path to save/load auth state
  },
})

// global-setup.ts (run once before all tests)
import { chromium, expect } from "@playwright/test"
export default async function globalSetup() {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto("/login")
  await page.getByLabel("Username").fill("testuser")
  await page.getByLabel("Password").fill("password")
  await page.getByRole("button", { name: "Login" }).click()
  await expect(page).toHaveURL(/dashboard/)
  await page.context().storageState({ path: "playwright-auth.json" })
  await browser.close()
}

// tests/profile.spec.ts
import { test, expect } from "@playwright/test"
test("should display user profile", async ({ page, context }) => {
  // Block unnecessary resources for faster tests
  await context.route("**/*.{png,jpg,jpeg,gif,webp,svg,css}", (route) =>
    route.abort()
  )
  await page.goto("/profile") // Automatically uses saved auth state
  await expect(page.getByText("Welcome, testuser!")).toBeVisible()
})
```

## 6. Mock APIs for Deterministic Tests

Isolate your UI tests from backend flakiness by intercepting and mocking API responses.

❌ BAD: Relying on a live, potentially unstable backend

```typescript
test("display products", async ({ page }) => {
  await page.goto("/products") // Fetches from real API
  await expect(page.getByText("Product A")).toBeVisible()
})
```

✅ GOOD: Mocking API responses

```typescript
test("display mocked products", async ({ page }) => {
  await page.route("**/api/products", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([{ id: 1, name: "Mock Product" }]),
    })
  })
  await page.goto("/products")
  await expect(page.getByText("Mock Product")).toBeVisible()
})
```

## 7. Leverage CI/CD Features for Debugging

Configure tracing, screenshots, and video recording in your `playwright.config.ts` to instantly diagnose failures in CI.

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test"
export default defineConfig({
  reporter: [["html"], ["list"]],
  use: {
    trace: "on-first-retry", // Record trace only on first retry
    screenshot: "on", // Always take a screenshot on failure
    video: "on-first-retry", // Record video on first retry
  },
})
```