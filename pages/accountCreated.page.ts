import { Page, expect } from '@playwright/test';

export class AccountCreatedPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async expectAccountCreatedVisible() {
    await expect(this.page.locator('text=Account Created!')).toBeVisible();
  }

  async clickContinue() {
    await this.page.click('a[data-qa="continue-button"]');
  }

  async expectLoggedInAs(name: string) {
    await expect(this.page.locator(`text=Logged in as ${name}`)).toBeVisible();
  }

  async clickDeleteAccount() {
    await this.page.click('a[href="/delete_account"]');
  }

  async expectAccountDeletedVisible() {
    await expect(this.page.locator('text=Account Deleted!')).toBeVisible();
  }
}
