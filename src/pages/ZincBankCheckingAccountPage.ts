import { Locator, Page } from "@playwright/test";

export class ZincBankCheckingAccountPage {
    readonly accountNumber: Locator;
    readonly routingNumber: Locator;
    readonly h1Header: Locator;

    constructor(readonly page: Page) {
        this.accountNumber = this.page.locator('[data-testid="account-detail-number"]');
        this.routingNumber = this.page.locator('[data-testid="account-detail-routing"]');
        this.h1Header = this.page.getByRole('heading', { name: 'Checking' });
    }

    
}