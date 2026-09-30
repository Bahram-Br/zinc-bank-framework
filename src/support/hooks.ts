import { After, AfterAll, Before, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';
import { config } from '../config/config';
import {
  closeBrowser,
  closeContext,
  createContextAndPage,
  launchBrowser,
} from './browser';
import { CustomWorld } from './world';

// Raise the default 5s step timeout so real network navigation and
// assertions against external sites aren't cut off prematurely.
setDefaultTimeout(30_000);

/**
 * Launch the browser once for the entire test run.
 * Reusing a single browser avoids expensive re-launches per step/scenario.
 */
BeforeAll(async function (): Promise<void> {
  await launchBrowser();
});

/**
 * For every scenario: create a fresh browser context + page and expose it
 * through the Cucumber World so Step Definitions can use `this.page`.
 */
Before(async function (this: CustomWorld): Promise<void> {
  this.page = await createContextAndPage();
});

/**
 * After every scenario:
 *  - If it failed, capture a screenshot, attach it to the report and save it
 *    to the screenshots/ folder.
 *  - Always close the isolated context.
 */
After(async function (this: CustomWorld, scenario): Promise<void> {
  if (scenario.result?.status === 'FAILED') {
    const screenshot = await this.page.screenshot({ fullPage: true });

    // Attach to the Cucumber HTML report.
    await this.attach(screenshot, 'image/png');

    // Also persist to disk for easy local inspection.
    const dir = path.resolve(config.screenshotDir);
    fs.mkdirSync(dir, { recursive: true });
    const fileName = `failure-${Date.now()}.png`;
    fs.writeFileSync(path.join(dir, fileName), screenshot);
  }

  await closeContext();
});

/** Close the browser once the whole run has finished. */
AfterAll(async function (): Promise<void> {
  await closeBrowser();
});
