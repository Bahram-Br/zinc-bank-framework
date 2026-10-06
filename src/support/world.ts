import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import type { Page } from '@playwright/test';
import type { ZincTMDashboardPage } from '../pages/ZincTMDashboardPage';
import type { ZincTMLoginPage } from '../pages/ZincTMLoginPage';
import type { ZincBankLoginPage } from '../pages/ZincBankLoginPage';
import type { ZincBankDashboardPage } from '../pages/ZincBankDashboardPage';
import type { ZincBankMoveMoneyPage } from '../pages/ZincBankMoveMoneyPage';

/**
 * Custom Cucumber "World".
 *
 * The World is a fresh instance created for every scenario and shared with all
 * of that scenario's step definitions via `this`. It gives every step access
 * to the Playwright `Page` and to already-created Page Objects, all fully typed.
 */
export class CustomWorld extends World {
  /** The Playwright page for the current scenario (created in the Before hook). */
  page!: Page;

  /** Page Objects, created lazily by Step Definitions and reused via `this`. */
  zincBankLoginPage!: ZincBankLoginPage;
  zincBankDashboardPage!: ZincBankDashboardPage;
  zincTMLoginPage!: ZincTMLoginPage;
  zincTMDashboardPage!: ZincTMDashboardPage;
  zincBankMoveMoneyPage!: ZincBankMoveMoneyPage;

  /** Checking and savings account balances */
  checkingCents!: number;
  savingsCents!: number;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

// Tell Cucumber to use this World class for every scenario.
setWorldConstructor(CustomWorld);
