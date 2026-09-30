import {
  Browser,
  BrowserContext,
  BrowserType,
  Page,
  chromium,
  firefox,
  webkit,
} from '@playwright/test';
import { config } from '../config/config';

// Module-level singleton browser/context so they survive across scenarios.
let browser: Browser | null = null;
let context: BrowserContext | null = null;

/**
 * Resolve the correct Playwright browser type from the configuration.
 * Chromium is the default; firefox and webkit are supported out of the box.
 */
function getBrowserType(): BrowserType {
  switch (config.browser) {
    case 'firefox':
      return firefox;
    case 'webkit':
      return webkit;
    case 'chromium':
    default:
      return chromium;
  }
}

/** Launch the browser once for the whole test run (called from BeforeAll). */
export async function launchBrowser(): Promise<void> {
  if (!browser) {
    const browserType = getBrowserType();
    browser = await browserType.launch({ headless: config.headless });
  }
}

/**
 * Create an isolated browser context + page for one scenario.
 * A fresh context per scenario keeps tests independent of each other.
 */
export async function createContextAndPage(): Promise<Page> {
  if (!browser) {
    throw new Error('Browser not launched. Call launchBrowser() first (BeforeAll hook).');
  }
  context = await browser.newContext();
  return context.newPage();
}

/** Close the context after each scenario (called from After hook). */
export async function closeContext(): Promise<void> {
  if (context) {
    await context.close();
    context = null;
  }
}

/** Close the browser after the whole run (called from AfterAll hook). */
export async function closeBrowser(): Promise<void> {
  if (browser) {
    await browser.close();
    browser = null;
  }
}
