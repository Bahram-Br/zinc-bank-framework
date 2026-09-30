import { Locator, Page } from '@playwright/test';
import { config } from '../config/config';

/**
 * Page Object for the zincTM login page.
 *
 * A Page Object encapsulates:
 *  - the locators for the page, and
 *  - the page-specific actions (fill, click, navigate).
 *
 * It deliberately contains NO assertions and NO Cucumber logic.
 */
export class ZincTMLoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = this.page.locator('[data-testid="login-email-input"]');
    this.passwordInput = this.page.locator('[data-testid="login-password"]');
    this.loginButton = this.page.locator('[data-testid="login-submit"]');
    this.errorMessage = this.page.locator('[data-testid="login-error"]');
  }

  /** Navigate to the zincTM login page. */
  async goto(): Promise<void> {
    await this.page.goto(config.zincTMBaseURL);
  }

  /** Fill the username field. */
  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  /** Fill the password field. */
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /** Click the sign-in button. */
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  /** Convenience method: log in with a username/password in one go. */
  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }
}
