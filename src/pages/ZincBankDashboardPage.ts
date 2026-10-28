import{ Locator, Page } from "@playwright/test";

export class ZincBankDashboardPage {
    readonly pageTitle: Locator;
    readonly moveMoneyBtn: Locator;

    constructor(readonly page: Page) {
        this.pageTitle = this.page.locator('[data-testid="dashboard-welcome"]');
        this.moveMoneyBtn = this.page.locator('[data-testid="dashboard-quick-transfer"]');
        
    }

    async clickMoveMoneyButton(): Promise<void> {
        await this.moveMoneyBtn.click();
    }
}