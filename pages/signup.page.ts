import { Page, expect } from '@playwright/test';

export class SignupPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async expectNewUserSignupVisible() {
    await expect(this.page.locator('text=New User Signup!')).toBeVisible();
  }

  async enterNameAndEmail(name: string, email: string) {
    await this.page.fill('input[name="name"]', name);
    await this.page.fill('input[data-qa="signup-email"]', email);
  }

  async clickSignup() {
    await this.page.click('button[data-qa="signup-button"]');
  }

  async expectEnterAccountInfoVisible() {
    await expect(this.page.locator('text=Enter Account Information')).toBeVisible();
  }

  async fillAccountInformation(details: {
    title?: 'Mr' | 'Mrs';
    password: string;
    day?: string;
    month?: string;
    year?: string;
    firstName?: string;
    lastName?: string;
    company?: string;
    address1?: string;
    address2?: string;
    country?: string;
    state?: string;
    city?: string;
    zipcode?: string;
    mobile?: string;
  }) {
    if (details.title === 'Mr') await this.page.check('input[id="id_gender1"]');
    if (details.title === 'Mrs') await this.page.check('input[id="id_gender2"]');
    if (details.password) await this.page.fill('input[id="password"]', details.password);
    if (details.day) await this.page.selectOption('select[id="days"]', details.day);
    if (details.month) await this.page.selectOption('select[id="months"]', details.month);
    if (details.year) await this.page.selectOption('select[id="years"]', details.year);
    if (details.firstName) await this.page.fill('input[id="first_name"]', details.firstName);
    if (details.lastName) await this.page.fill('input[id="last_name"]', details.lastName);
    if (details.company) await this.page.fill('input[id="company"]', details.company);
    if (details.address1) await this.page.fill('input[id="address1"]', details.address1);
    if (details.address2) await this.page.fill('input[id="address2"]', details.address2);
    if (details.country) await this.page.selectOption('select[id="country"]', { label: details.country });
    if (details.state) await this.page.fill('input[id="state"]', details.state);
    if (details.city) await this.page.fill('input[id="city"]', details.city);
    if (details.zipcode) await this.page.fill('input[id="zipcode"]', details.zipcode);
    if (details.mobile) await this.page.fill('input[id="mobile_number"]', details.mobile);
  }

  async checkNewsletter() {
    await this.page.check('input[id="newsletter"]');
  }

  async checkOffers() {
    await this.page.check('input[id="optin"]');
  }

  async clickCreateAccount() {
    await this.page.click('button[data-qa="create-account"]');
  }
}
