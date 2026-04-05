# Enforces best practices for component tests using Vitest

## Description
Enforces best practices for component tests using Vitest

## Applicability
- **Files:** `**/*.{test}.{js,ts,jsx,tsx}`
- **Always Apply:** false

## Rules
- Use a DOM-oriented library (e.g. `@testing-library/react`, `@vue/test-utils`) for rendering; avoid shallow rendering utilities that inspect implementation details.
- Prefer accessibility queries (`getByRole`, `getByLabelText`, etc.) over `getByTestId` or CSS selectors.
- Interact with the UI via `userEvent` (or framework-equivalent) instead of firing raw DOM events directly.
- Clean up side-effects by calling `cleanup()` (or rely on library auto-cleanup) after each test.
- Group related component behaviours in `describe` blocks with descriptive titles.
- Every test must contain at least one assertion via `expect`.
- Avoid querying private DOM nodes with `container.querySelector`; focus on visible user output.
- Do **not** snapshot the entire DOM tree for dynamic components; instead, assert specific, stable text/attributes.
- Use `vi.mock()` for module mocks and restore with `vi.resetModules()` or `vi.clearAllMocks()` in `afterEach`.

### vitest-component-testing

Enforces best practices for component tests using Vitest

**Actions:**
  # Suggest more descriptive titles
  - type: suggest
    message: |
      Test titles should clearly describe user behaviour, e.g. `it('shows error message when API call fails', ...)`.

  # Suggest replacing container.querySelector
  - type: suggest
    pattern: "container\\.querySelector"
    message: |
      Avoid querying DOM directly. Prefer queries like `screen.getByRole` or `screen.getByText` so tests reflect real user interactions.

  # Suggest using userEvent over fireEvent
  - type: suggest
    pattern: "fireEvent\\."
    message: |
      Use `userEvent` to simulate real user behaviour instead of `fireEvent`, e.g. `await userEvent.click(button)`.

  # Suggest adding an expect if missing
  - type: suggest
    message: "Each component test should contain at least one assertion (`expect`)."

examples:
  - input: |
      it('renders', () => {
        const { container } = render(<Login />)
        container.querySelector('button[type="submit"]')
      })
    output: |
      it('renders submit button', () => {
        render(<Login />)
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
      })

  - input: |
      it('submit works', async () => {
        render(<Login />)
        await fireEvent.click(screen.getByText('Submit'))
      })
    output: |
      it('triggers onSubmit when form is valid', async () => {
        render(<Login />)
        const submit = screen.getByRole('button', { name: /submit/i })
        await userEvent.click(submit)
        expect(mockOnSubmit).toHaveBeenCalled()
      })

  - input: "test.skip('unimplemented component test', () => {})"
    output: "// Remove .skip or implement the test"

tests:
  - input: "it('short', () => { render(<Btn />) })"
    output: "Suggest rewriting title and adding assertion"
  - input: "container.querySelector('div')"
    output: "Suggest replacing direct querySelector with RTL queries"
  - input: "fireEvent.click(button)"
    output: "Suggest using userEvent instead of fireEvent"

metadata:

## Additional Information
# Vitest Component Testing Best Practices

This rule enforces best practices for **component tests** written with Vitest (e.g., React Testing Library, Vue Test Utils, or other DOM-based libs). The goal is to ensure tests remain stable, user-focused, and easy to maintain.