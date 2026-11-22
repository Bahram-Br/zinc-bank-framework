import { Locator, Page } from "@playwright/test";

export class ZincBankCheckingAccountPage {
    readonly accountNumber: Locator;
    readonly routingNumber: Locator;
    readonly h1Header: Locator;
    readonly display404Message: Locator;
    readonly displayNotFoundMessage: Locator;

    constructor(readonly page: Page) {
        this.accountNumber = this.page.locator('[data-testid="account-detail-number"]');
        this.routingNumber = this.page.locator('[data-testid="account-detail-routing"]');
        this.h1Header = this.page.getByRole('heading', { name: 'Checking' });
        this.display404Message = this.page.getByRole('heading', { name: '404' });
        this.displayNotFoundMessage = this.page.getByText('This page could not be found.');
    }

    
}