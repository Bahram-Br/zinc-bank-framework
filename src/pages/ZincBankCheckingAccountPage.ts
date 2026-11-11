import { Locator, Page } from "@playwright/test";

export class ZincBankCheckingAccountPage {
    readonly accountNumber: Locator;
    readonly routingNumber: Locator;

    constructor(readonly page: Page) {
        this.accountNumber = this.page.locator('[data-testid="account-detail-number"]');
        this.routingNumber = this.page.locator('[data-testid="account-detail-routing"]');
    }

    
}