import{ Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import{ CustomWorld } from "../../src/support/world";
import { testData } from "../../src/utils/testData";
import { ZincBankLoginPage } from "../../src/pages/ZincBankLoginPage";
import { ZincBankDashboardPage } from "../../src/pages/ZincBankDashboardPage";

Given("I am on the zinc bank login page", async function (this: CustomWorld) {
    const loginPage = new ZincBankLoginPage(this.page);
    await loginPage.goto();
    this.zincBankLoginPage = loginPage;
});

When("I login to zinc bank with valid credentials", async function (this: CustomWorld) {
    const { username, password } = testData.zincBank;
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
