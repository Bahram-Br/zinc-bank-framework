import{ Locator, Page } from "@playwright/test";

export class ZincBankDashboardPage {
    readonly pageTitle: Locator;
    readonly moveMoneyBtn: Locator;
    readonly accountCards: Locator;
    readonly totalDepositBalance: Locator;
    readonly creditCard: Locator;
    readonly recentActivitySection: Locator;
    readonly activities: Locator;

    constructor(readonly page: Page) {
        this.pageTitle = this.page.locator('[data-testid="dashboard-welcome"]');
        this.moveMoneyBtn = this.page.locator('[data-testid="dashboard-quick-transfer"]');
        this.accountCards = this.page.locator('[data-testid^="dashboard-account-card-"]');
        this.totalDepositBalance = this.page.locator('[data-testid="dashboard-total-deposit"]');
        this.creditCard = this.page.locator('[data-testid="dashboard-card-summary"]');
        this.recentActivitySection = this.page.locator('[data-testid="dashboard-recent-activity"]');
        this.activities = this.page.locator('[data-testid^="txn-row-"]');
        
    }

    async clickMoveMoneyButton(): Promise<void> {
        await this.moveMoneyBtn.click();
    }
}