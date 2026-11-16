import { Locator, Page } from "@playwright/test";

export class ZincBankAccountsPage {
    readonly accountsNavLink: Locator;
    readonly accountCards: Locator;
    readonly openSavingsAccountButton: Locator;

    constructor(readonly page: Page) {
        this.accountsNavLink = this.page.locator('[data-testid="nav-accounts"]');
        this.accountCards = this.page.locator('[data-testid^="accounts-card-"]');
        this.openSavingsAccountButton = this.page.locator('[data-testid="accounts-open-savings"]');
    }

    async clickNavAccounts(): Promise<void> {
        await this.accountsNavLink.click();
    }

    async clickCheckingAccount(): Promise<void> {
        await this.accountCards.filter({ hasText: 'Checking' }).click();
    }

    async clickOpenSavingsAccountButton(): Promise<void> {
        await this.openSavingsAccountButton.click();
    }
}
