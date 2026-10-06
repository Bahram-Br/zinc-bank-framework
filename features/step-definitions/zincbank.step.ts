import{ Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import{ CustomWorld } from "../../src/support/world";
import { testData } from "../../src/utils/testData";
import { ZincBankLoginPage } from "../../src/pages/ZincBankLoginPage";
import { ZincBankDashboardPage } from "../../src/pages/ZincBankDashboardPage";
import { ZincBankMoveMoneyPage } from "../../src/pages/ZincBankMoveMoneyPage";

Given("I am on the zinc bank login page", async function (this: CustomWorld) {
    const loginPage = new ZincBankLoginPage(this.page);
    await loginPage.goto();
    this.zincBankLoginPage = loginPage;
});

When("I login to zinc bank with username {string} and password {string}", async function (this: CustomWorld, username: string, password: string) {
    await this.zincBankLoginPage.fillUsername(username);
    await this.zincBankLoginPage.fillPassword(password);
    await this.zincBankLoginPage.clickLogin();
});

Then("I should see the zinc bank dashboard", async function (this: CustomWorld) {
    const dashboardPage = new ZincBankDashboardPage(this.page);
    this.zincBankDashboardPage = dashboardPage;
    
    await expect(this.page).toHaveURL(/.*dashboard/);
    await expect(this.zincBankDashboardPage.pageTitle).toBeVisible();
    
});

When("I login to zinc bank with invalid credentials", async function (this: CustomWorld) {
    const invalidUsername = "invaliduser@zinc.test";
    const invalidPassword = "invalidpassword";
    await this.zincBankLoginPage.fillUsername(invalidUsername);
    await this.zincBankLoginPage.fillPassword(invalidPassword);
    await this.zincBankLoginPage.clickLogin();
});

Then("I should see an error message indicating invalid login", async function (this: CustomWorld) {
    const errorMessage = await this.zincBankLoginPage.errorMessage();
    expect(errorMessage).toContain("Invalid email or password.");
});

// Helper function to convert a string like "$1,234.56" to cents (123456)
function toCents(text: string): number {
    const match = text.match(/\$([0-9,]+)\.(\d{2})/);
    if (!match) {
        throw new Error(`Invalid amount format: ${text}`);
    }
    return Number(match[1].replace(/,/g, "")) * 100 + Number(match[2]);

}

When('I note the checking account balance and the savings account balance', async function (this: CustomWorld) {
    const moveMoneyPage = new ZincBankMoveMoneyPage(this.page);
    this.zincBankMoveMoneyPage = moveMoneyPage;
    await moveMoneyPage.clickAccounts();
    this.checkingCents = toCents(await moveMoneyPage.checkingAccountText());
    this.savingsCents = toCents(await moveMoneyPage.savingsAccountText());
});

When('I submit a transfer of the checking account balance plus ${float} to the savings account', async function (this: CustomWorld, float: number) {
    const extraCents = Math.round(float * 100);
    const amountCents = this.checkingCents + extraCents;
    if (amountCents > 10000 * 100) {
        throw new Error(`Transfer amount is above the $10,000 cap`);
    }

    const dollars = Math.floor(amountCents / 100);
    const cents = String(amountCents % 100).padStart(2, '0');
    const amount = `${dollars}.${cents}`;

    await this.zincBankMoveMoneyPage.clickMoveMoneyButton();
    await this.zincBankMoveMoneyPage.selectFromAccount('Checking');
    await this.zincBankMoveMoneyPage.selectToAccount('Savings');
    await this.zincBankMoveMoneyPage.fillAmount(amount);
    await this.zincBankMoveMoneyPage.clickTransferButton();
});

Then('I should see insufficient funds error message',async function (this: CustomWorld) {
    const message = await this.zincBankMoveMoneyPage.transferResultText();
    expect(message).toBe('INSUFFICIENT_FUNDS');
});

Then('I should see the checking account balance and the savings account balance remain unchanged', async function (this: CustomWorld) {
    await this.zincBankMoveMoneyPage.clickAccounts();
    const checkingNow = toCents(await this.zincBankMoveMoneyPage.checkingAccountText());
    const savingsNow = toCents(await this.zincBankMoveMoneyPage.savingsAccountText());
    expect(checkingNow).toBe(this.checkingCents);
    expect(savingsNow).toBe(this.savingsCents);
});

