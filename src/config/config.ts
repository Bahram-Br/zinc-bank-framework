import dotenv from 'dotenv';

// Load environment variables from the `.env` file into process.env.
// Calling dotenv.config() again anywhere is harmless - it never overrides
// variables that are already set in the environment.
dotenv.config();

/**
 * Central, typed application configuration.
 *
 * All environment-specific values (URLs, browser, headless flag) are read
 * here so they are never hardcoded inside Page Objects or Step Definitions.
 */
export const config = {
  /** Base URL of the zinc bank practice site. */
  zincBankBaseURL: process.env.BASE_URL || 'https://zincbank.cydeo.io/login',
  /** Base URL of the zincTM practice site. */
  zincTMBaseURL: process.env.ZINCTM_BASE_URL || 'https://zinctm.cydeo.io',

  /** Browser to run against: 'chromium' | 'firefox' | 'webkit'. */
  browser: process.env.BROWSER || 'chromium',

  /** Run headless by default; set HEADLESS=false to run with a visible window. */
  headless: process.env.HEADLESS !== 'false',

  /** Directory where failure screenshots are saved. */
  screenshotDir: process.env.SCREENSHOT_DIR || 'screenshots',
} as const;
