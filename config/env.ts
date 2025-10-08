/**
 * Centralized environment configuration for the test framework.
 * Reads from process.env and provides sensible defaults.
 */
export const env = {
  // Base URL of the AUT (application under test)
  baseUrl: process.env.BASE_URL || 'http://automationexercise.com',

  // Headless mode: set HEADLESS=false to run headed
  headless: process.env.HEADLESS === undefined ? true : String(process.env.HEADLESS).toLowerCase() !== 'false',

  // Default action/timeout values (ms)
  defaultTimeout: process.env.DEFAULT_TIMEOUT ? Number(process.env.DEFAULT_TIMEOUT) : 30000,

  // Trace policy: 'on', 'off', 'retain-on-failure', 'on-first-retry' etc.
  trace: process.env.TRACE || 'on-first-retry',

  // Preferred browser: chromium, firefox, webkit
  browser: (process.env.BROWSER as 'chromium' | 'firefox' | 'webkit') || 'chromium',

  // Email prefix used in tests when generating a unique email
  emailPrefix: process.env.EMAIL_PREFIX || 'testuser+',
  // Data file path for data-driven tests
  dataFile: process.env.DATA_FILE || 'data/users.csv',
};

export default env;
