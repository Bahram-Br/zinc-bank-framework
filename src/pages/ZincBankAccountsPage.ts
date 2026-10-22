import { Locator, Page } from "@playwright/test";

export class ZincBankAccountsPage {
    readonly accountsNavLink: Locator;
    readonly accountCards: Locator;

    constructor(readonly page: Page) {
        this.accountsNavLink = this.page.locator('[data-testid="nav-accounts"]');
        this.accountCards = this.page.locator('[data-testid^="accounts-card-"]');
    }

    async clickNavAccounts(): Promise<void> {
        await this.accountsNavLink.click();
    }
}
