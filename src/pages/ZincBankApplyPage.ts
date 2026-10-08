import { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { config } from "../config/config";

export class ZincBankApplyPage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly continueButton: Locator;
    readonly submitButton: Locator;
    readonly passwordInput: Locator;
    readonly confirmPassword: Locator;
    readonly ssnNumInput: Locator;
    readonly statusOption: Locator;
    readonly streetInput: Locator;
    readonly cityInput: Locator;
    readonly statOption: Locator;
    readonly zipcodeInput: Locator;
    readonly termsCheckbox: Locator;

    constructor(readonly page: Page) {
        this.firstNameInput = this.page.locator('[data-testid="apply-firstname-input"]');
        this.lastNameInput = this.page.locator('[data-testid="apply-lastname-input"]');
        this.emailInput = this.page.locator('[data-testid="apply-email-input"]');
        this.passwordInput = this.page.locator('[data-testid="apply-password-input"]')
        this.confirmPassword = this.page.locator('[data-testid="apply-confirm-input"]')
        this.continueButton = this.page.locator('[data-testid="apply-next"]');
        this.submitButton = this.page.locator('[data-testid="apply-submit"]');
        this.ssnNumInput = this.page.locator('[data-testid="apply-ssn-input"]');
        this.statusOption = this.page.locator('[data-testid="apply-employment-select"]');
        this.streetInput = this.page.locator('[data-testid="apply-addressline-input"]');
        this.cityInput = this.page.locator('[data-testid="apply-city-input"]');
        this.statOption = this.page.locator('[data-testid="apply-state-select"]');
        this.zipcodeInput = this.page.locator('[data-testid="apply-zip-input"]');
        this.termsCheckbox = this.page.locator('[data-testid="apply-terms-checkbox"]');
    }

    async goto(): Promise<void> {
        const original = new URL(config.zincBankBaseURL).origin;
        await this.page.goto(`${original}/apply`);
    }

    async fillFirstName(firstName: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
    }

    async fillLastName(lastName: string): Promise<void> {
        await this.lastNameInput.fill(lastName);
    }

    async fillEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }   

    async fillNewPassword(password:string): Promise<void>{
        await this.passwordInput.fill(password);
    }

    async confirmNewPassword(password:string): Promise<void>{
        await this.confirmPassword.fill(password);
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    async clickSubmit(): Promise<void> {
        await this.submitButton.click();
    }   

    async fillSsnNum(): Promise<void> {
        await this.ssnNumInput.fill("000-0");
    }

    async selfEmployeeOption(): Promise<void> {
        await this.statusOption.selectOption('self_employed');
    }

    async fillStreetInput(street: string): Promise<void> {
        await this.streetInput.fill(street);
    }

    async fillCityInput(city: string): Promise<void> {
        await this.cityInput.fill(city);
    }

    async selectStateOption(state: string): Promise<void> {
        await this.statOption.selectOption(state);
    }

    async fillZipcodeInput(zipcode: string): Promise<void> {
        await this.zipcodeInput.fill(zipcode);
    }

    async clickTermsCheckbox(): Promise<void> {
        await this.termsCheckbox.click();
    }

    async errorMessage(): Promise<string> {
        const errorMessageLocator = this.page.locator('[data-testid="apply-error"]');
        await expect(errorMessageLocator).toBeVisible();
        return (await errorMessageLocator.innerText()).trim();
    }

};
