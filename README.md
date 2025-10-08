<<<<<<< HEAD
# playwrightPractise2
playwrightPractise2
=======
# Playwright TypeScript Demo

This project contains a minimal Playwright + TypeScript framework and a test for the "Register User" scenario against http://automationexercise.com.

How to run (Windows PowerShell):

```powershell
npm install
npx playwright install --with-deps
npm test
```

Files:
- `playwright.config.ts` - Playwright configuration
- `tests/register.spec.ts` - The Register User test
- `pages/` - Page object classes
 
Page Object Model (POM) strategy used in this framework
-----------------------------------------------------

This repository follows a Page Object Model design to keep tests readable, maintainable, and reusable. The core idea is to encapsulate the behavior and structure of each page in a dedicated class (page object). Tests then use those page objects to perform high-level actions and assertions.

Key principles used here:

- Single responsibility: each page object represents one page (or a logical portion of it) and exposes only actions and verifications that are meaningful at the page level.
- Locators centralized: all selectors live in the page object implementation to avoid duplication. If the UI changes, update the selector in one place.
- High-level methods: page objects expose descriptive methods such as `login()`, `clickSignupLogin()`, or `expectAccountCreatedVisible()` rather than low-level sequences of clicks and fills in tests.
- Minimal test logic: tests orchestrate the scenario by calling page object methods and contain only scenario flow and assertions about business outcomes (not DOM details).
- Reuse and composition: page objects can compose other page objects or helper methods to avoid repeating logic for common UI fragments.

Page object structure and conventions
-----------------------------------

- Location: put page objects under the `pages/` folder. Each page should be in its own file, named with `.page.ts` suffix (for example `signup.page.ts`).
- Class name: use PascalCase and include the page name (for example `SignupPage`).
- Constructor: accept a Playwright `Page` instance and store it as a readonly property.
- Public API: expose async methods for actions and assertions. Avoid exposing raw locators publicly when possible.
- Selectors: prefer data attributes when available (for example `data-qa`), otherwise use stable ids or visible text. Avoid brittle selectors like deep CSS paths.

Example page object (pattern)

1) Constructor and locator usage

```ts
// pages/example.page.ts
import { Page, expect } from '@playwright/test';

export class ExamplePage {
	readonly page: Page;
	constructor(page: Page) { this.page = page; }

	async goto() { await this.page.goto('https://example.com'); }
	async clickPrimary() { await this.page.click('button[data-qa="primary"]'); }
	async expectLoaded() { await expect(this.page.locator('text=Welcome')).toBeVisible(); }
}
```

2) Using the page object in a test

```ts
import { test } from '@playwright/test';
import { ExamplePage } from '../pages/example.page';

test('example flows', async ({ page }) => {
	const example = new ExamplePage(page);
	await example.goto();
	await example.expectLoaded();
	await example.clickPrimary();
});
```

Guidance for adding new pages and tests
---------------------------------------

- Identify the page or fragment you want to encapsulate and create a new `*.page.ts` file.
- Add stable selectors and implement high-level methods for the operations your tests require.
- Keep assertions inside the page object as helper `expect*` methods where it makes tests clearer (for example `expectLoginError()`), but keep scenario-level assertions in the tests wherever the assertion is about flow or business logic.
- Reuse helpers for repeated UI patterns (modals, header, footer) by creating small page objects for those fragments and composing them in page classes.

Troubleshooting and tips
------------------------

- If a test fails because an element is not found, open the app in a headed session and inspect the element. Run the test with `--headed` and `--debug` to step through failures interactively.
- Prefer `data-*` attributes for selectors. If none exist, ask developers to add them for testability.
- Add explicit wait helpers in page objects where necessary (for example `waitForNavigation`, `waitForSelector`) instead of sprinkling `waitForTimeout` across tests.

Files in this repo
------------------
- `playwright.config.ts` - configuration for timeouts, projects, and reporter
- `tsconfig.json` - TypeScript config for the project
- `pages/` - Page object classes used by tests
- `tests/` - Test specifications using Playwright test runner

If you'd like, I can also:
- Add a small helper for commonly used header actions (login, logout) and wire it into the tests.
- Add screenshots on failure and a tiny test reporter configuration for CI.

Environment configuration
-------------------------

This framework reads runtime configuration from `process.env` via `config/env.ts`. You can override defaults by setting environment variables. Supported variables:

- BASE_URL - Base URL of the application under test (default: `http://automationexercise.com`)
- HEADLESS - If set to `false` (string), tests will run with a visible browser. Any other value or unset defaults to headless mode.
- DEFAULT_TIMEOUT - Numeric timeout in ms for the test harness (default: 30000)
- TRACE - Playwright trace mode (examples: `on`, `off`, `retain-on-failure`, `on-first-retry`)
- BROWSER - Preferred browser: `chromium`, `firefox`, or `webkit` (default: chromium)
- EMAIL_PREFIX - Prefix to use when generating unique test emails (default `testuser+`)

Examples (PowerShell):

```powershell
# Run tests against a staging URL, headed, using Firefox
$env:BASE_URL = 'https://staging.example.com';
$env:HEADLESS = 'false';
$env:BROWSER = 'firefox';
npm test
```

Or, temporarily for a single command:

```powershell
cmd /c "set BASE_URL=https://staging.example.com && set HEADLESS=false && npm test"
```

Data-driven tests using CSV
--------------------------

This project includes a simple CSV-based data provider at `utils/csvReader.ts` and a sample `data/users.csv` file. The test `tests/register.spec.ts` reads `data/users.csv` and runs the Register User test once per row.

CSV format notes:
- The first line is a header row containing column names (for example `name,email,password,firstName,lastName,...`).
- For unique values (like emails), use the `{{ts}}` placeholder — it will be replaced with a timestamp at runtime. Example: `testuser+{{ts}}@example.com`.
- To add more data-driven cases, add rows to `data/users.csv` following the header columns.

Override CSV file path via environment variable
----------------------------------------------

You can point the framework to a different CSV file by setting the `DATA_FILE` environment variable (example uses PowerShell):

```powershell
$env:DATA_FILE = 'data/my-other-users.csv'
npm test
```


If you'd like a richer data format (JSON, YAML, or fixtures with secrets), I can add support for that as well.


>>>>>>> ff560bc (chore: initial Playwright TypeScript framework)
