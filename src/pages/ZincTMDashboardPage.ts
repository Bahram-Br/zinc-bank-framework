import { Locator, Page } from '@playwright/test';

/**
 * Page Object for the zincTM dashboard, shown after a successful login.
 *
 * A Page Object encapsulates:
 *  - the locators for the page, and
 *  - the page-specific actions (click, navigate).
 *
 * It deliberately contains NO assertions and NO Cucumber logic.
 */
export class ZincTMDashboardPage {
  /** The dashboard welcome heading shown after a successful login. */
  readonly pageTitle: Locator;

  /** The signed-in member's username shown in the sidebar. */
  readonly member: Locator;

  /** Stat cards on the dashboard. */
  readonly statCovered: Locator;
  readonly statCases: Locator;
  readonly statRuns: Locator;
  readonly statDefects: Locator;

  /** Empty-state messages. */
  readonly defectsEmpty: Locator;
  readonly runsEmpty: Locator;

  /** Sidebar navigation links. */
  readonly navDashboard: Locator;
  readonly navBoard: Locator;
  readonly navRequirements: Locator;
  readonly navTestCases: Locator;
  readonly navCoverage: Locator;
  readonly navRuns: Locator;
  readonly navDefects: Locator;

  /** Sign-out button in the header. */
  readonly signOut: Locator;

  constructor(private readonly page: Page) {
    this.pageTitle = this.page.locator('h1', { hasText: 'Your QA workspace' });
    this.member = this.page.locator('[data-testid="shell-member"]');
    this.statCovered = this.page.locator('[data-testid="stat-covered"]');
    this.statCases = this.page.locator('[data-testid="stat-cases"]');
    this.statRuns = this.page.locator('[data-testid="stat-runs"]');
    this.statDefects = this.page.locator('[data-testid="stat-defects"]');
    this.defectsEmpty = this.page.locator('[data-testid="dashboard-defects-empty"]');
    this.runsEmpty = this.page.locator('[data-testid="dashboard-runs-empty"]');
    this.navDashboard = this.page.locator('[data-testid="nav-dashboard"]');
    this.navBoard = this.page.locator('[data-testid="nav-board"]');
    this.navRequirements = this.page.locator('[data-testid="nav-requirements"]');
    this.navTestCases = this.page.locator('[data-testid="nav-test-cases"]');
    this.navCoverage = this.page.locator('[data-testid="nav-coverage"]');
    this.navRuns = this.page.locator('[data-testid="nav-runs"]');
    this.navDefects = this.page.locator('[data-testid="nav-defects"]');
    this.signOut = this.page.locator('[data-testid="nav-signout"]');
  }

  /** Click the sign-out button. */
  async clickSignOut(): Promise<void> {
    await this.signOut.click();
  }
}
