import { defineConfig, devices } from '@playwright/test';
import env from './config/env';

export default defineConfig({
  testDir: './tests',
  timeout: env.defaultTimeout,
  expect: { timeout: 5000 },
  fullyParallel: false,
  reporter: [['list']],
  use: {
    headless: env.headless,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    // Playwright expects a limited set of trace values; fall back to 'on-first-retry' when unknown
    trace: (['on', 'off', 'retain-on-failure', 'on-first-retry'] as const).includes(env.trace as any)
      ? (env.trace as any)
      : 'on-first-retry',
    baseURL: env.baseUrl,
  },
  projects: [
    // Allow selecting the active browser via env.BROWSER; default is chromium
    ...(env.browser === 'chromium' ? [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }] : []),
    ...(env.browser === 'firefox' ? [{ name: 'firefox', use: { ...devices['Desktop Firefox'] } }] : []),
    ...(env.browser === 'webkit' ? [{ name: 'webkit', use: { ...devices['Desktop Safari'] } }] : []),
  ],
});
