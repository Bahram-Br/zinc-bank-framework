import{ Locator, Page } from "@playwright/test";

export class ZincBankDashboardPage {
    readonly pageTitle: Locator;
    readonly moveMoneyBtn: Locator;
    readonly accountCards: Locator;
    readonly totalDepositBalanece: Locator;

    constructor(readonly page: Page) {
        this.pageTitle = this.page.locator('[data-testid="dashboard-welcome"]');
        this.moveMoneyBtn = this.page.locator('[data-testid="dashboard-quick-transfer"]');
        this.accountCards = this.page.locator('[data-testid^="dashboard-account-card-"]');
        this.totalDepositBalanece = this.page.locator('[data-testid="dashboard-total-deposit"]');
        
    }

    async clickMoveMoneyButton(): Promise<void> {
        await this.moveMoneyBtn.click();
    }
}