import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../src/support/world";
import { testData } from "../../src/utils/testData";
import { ZincTMLoginPage } from "../../src/pages/ZincTMLoginPage";
import { ZincTMDashboardPage } from "../../src/pages/ZincTMDashboardPage";

Given("I am on the login zincTM page", async function (this: CustomWorld) {
    const loginPage = new ZincTMLoginPage(this.page);
    await loginPage.goto();
    this.zincTMLoginPage = loginPage;
});

When("I am logging with valid credentials", async function (this: CustomWorld) {
    const { username, password } = testData.zincTM;
    await this.zincTMLoginPage.fillUsername(username);
    await this.zincTMLoginPage.fillPassword(password);
    await this.zincTMLoginPage.clickLogin();
});

Then("I should see zincTM dashboard", async function (this: CustomWorld) {
    const dashboardPage = new ZincTMDashboardPage(this.page);
    this.zincTMDashboardPage = dashboardPage;

    await expect(this.page).toHaveURL(/.*dashboard/);
    await expect(this.zincTMDashboardPage.pageTitle).toBeVisible();
});
