import { Page, expect } from '@playwright/test';
import env from '../config/env';

export class HomePage {
  readonly page: Page;
  readonly signupLoginButton = 'a[href="/login"]';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    // Use configured base URL; playwright's baseURL is also set in config, but this provides a fallback
    await this.page.goto(env.baseUrl);
  }

  async expectVisible() {
    await expect(this.page.locator('body')).toBeVisible();
  }

  async clickSignupLogin() {
    await this.page.click(this.signupLoginButton);
  }
}
