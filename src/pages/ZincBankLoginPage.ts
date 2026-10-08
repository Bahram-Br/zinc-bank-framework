import{ Locator, Page } from "@playwright/test";
import { config } from "../config/config";
import { expect } from "@playwright/test";

export class ZincBankLoginPage {
    
readonly usernameInput: Locator;
readonly passwordInput: Locator;
readonly loginButton: Locator;

constructor(readonly page: Page) {
    this.usernameInput = this.page.locator('[data-testid="login-email-input"]');
    this.passwordInput = this.page.locator('[data-testid="login-password-input"]');
    this.loginButton = this.page.locator('[data-testid="login-submit"]');
  }

    /** Navigate to the zinc bank login page. */

    async goto(): Promise<void> {
        await this.page.goto(config.zincBankBaseURL);
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

    async errorMessage(): Promise<string> {
        const errorMessageLocator = this.page.locator('[data-testid="login-error"]');
        await expect(errorMessageLocator).toBeVisible();
        
        return (await errorMessageLocator.innerText()).trim();
    }

}