import{ Locator, Page } from "@playwright/test";

export class ZincBankDashboardPage {
    pageTitle: Locator;

    constructor(readonly page: Page) {
        this.pageTitle = this.page.locator('[data-testid="dashboard-welcome"]');
    }
}