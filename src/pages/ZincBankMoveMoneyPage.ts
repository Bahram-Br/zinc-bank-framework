import {Locator, Page} from "@playwright/test";


export class ZincBankMoveMoneyPage {
    readonly moveMoneyButton: Locator;
    readonly checkingAccount: Locator;
    readonly savingsAccount: Locator;
    readonly amountInput: Locator;
    readonly fromAccountInput: Locator;
    readonly toAccountInput: Locator;
    readonly transferButton: Locator;
    readonly accountsLink: Locator;
    readonly transferResult: Locator;

    constructor(readonly page: Page) {

        this.moveMoneyButton = this.page.locator('[data-testid="nav-move-money"]');
        this.checkingAccount = this.page.locator('[data-testid^="accounts-card-"]', { hasText: 'Checking' });
        this.savingsAccount = this.page.locator('[data-testid^="accounts-card-"]', { hasText: 'Savings' });
        this.amountInput = this.page.locator('[data-testid="transfer-amount"]');
        this.fromAccountInput = this.page.locator('[data-testid="transfer-from"]');
        this.toAccountInput = this.page.locator('[data-testid="transfer-to"]');
        this.transferButton = this.page.locator('[data-testid="transfer-submit"]');
        this.accountsLink = this.page.locator('[data-testid="nav-accounts"]');
        this.transferResult = this.page.locator('[data-testid="transfer-result"]');
    }

    async clickMoveMoneyButton(): Promise<void> {
        await this.moveMoneyButton.click();
    }

    async clickAccounts(): Promise<void> {
        await this.accountsLink.click();
    }

    async selectFromAccount(accountType: 'Checking' | 'Savings'): Promise<void> {
        
        const option = this.fromAccountInput.locator(`option:has-text("${accountType}")`);
        const value = await option.getAttribute('value');
        if(!value) {
            throw new Error(`No ${accountType} account found in the dropdown.`);
        }
        await this.fromAccountInput.selectOption(value);
    }

    async selectToAccount(accountType: 'Checking' | 'Savings'): Promise<void> {

        const option = this.toAccountInput.locator(`option:has-text("${accountType}")`);
        const value = await option.getAttribute('value');
        if(!value) {
            throw new Error(`No ${accountType} account found in the dropdown.`);
        }
        await this.toAccountInput.selectOption(value);
    }

    async fillAmount(amount: string): Promise<void> {
        await this.amountInput.fill(amount);
    }

    async clickTransferButton(): Promise<void> {
        await this.transferButton.click();
    }

    async checkingAccountText(): Promise<string> {
        return this.checkingAccount.innerText();
    }

    async savingsAccountText(): Promise<string> {
        return this.savingsAccount.innerText();
    }

    async transferResultText(): Promise<string> {
        return (await this.transferResult.innerText()).trim();
    }
}