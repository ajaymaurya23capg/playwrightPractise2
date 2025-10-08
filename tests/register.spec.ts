import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { SignupPage } from '../pages/signup.page';
import { AccountCreatedPage } from '../pages/accountCreated.page';
import { readCsv } from '../utils/csvReader';
import env from '../config/env';

const users = readCsv(env.dataFile);

for (const user of users) {
  // Use stable test title based on name only (avoid embedding runtime-generated email)
  test(`Register User - ${user.name}`, async ({ page }) => {
    const home = new HomePage(page);
    const signup = new SignupPage(page);
    const account = new AccountCreatedPage(page);

    // Generate runtime values from templated CSV fields (e.g. replace {{ts}})
    const now = String(Date.now());
    let runtimeEmail = (user.email || '').replace(/{{\s*ts\s*}}/g, now);
    if (runtimeEmail && !/\+.*@/.test(runtimeEmail)) {
      // ensure uniqueness by appending +timestamp if there's no +token
      const atIdx = runtimeEmail.indexOf('@');
      if (atIdx > 0) {
        const local = runtimeEmail.substring(0, atIdx);
        const domain = runtimeEmail.substring(atIdx + 1);
        runtimeEmail = `${local}+${now}@${domain}`;
      }
    }
    // Apply templating for other fields if needed
    const runtimeUser = { ...user } as any;
    for (const k of Object.keys(runtimeUser)) {
      if (typeof runtimeUser[k] === 'string') runtimeUser[k] = runtimeUser[k].replace(/{{\s*ts\s*}}/g, now);
    }
    runtimeUser.email = runtimeEmail;

    await home.goto();
    await home.expectVisible();
    await home.clickSignupLogin();

    await signup.expectNewUserSignupVisible();
  // use the runtime computed email
  await signup.enterNameAndEmail(runtimeUser.name, runtimeUser.email);
    await signup.clickSignup();

    await signup.expectEnterAccountInfoVisible();
    await signup.fillAccountInformation({
      title: (user.title as any) || 'Mr',
      password: user.password,
      day: user.day,
      month: user.month,
      year: user.year,
      firstName: user.firstName,
      lastName: user.lastName,
      company: user.company,
      address1: user.address1,
      address2: user.address2,
      country: user.country,
      state: user.state,
      city: user.city,
      zipcode: user.zipcode,
      mobile: user.mobile,
    });

    // Optional checkboxes
    try { await signup.checkNewsletter(); } catch { /* ignore if selector missing */ }
    try { await signup.checkOffers(); } catch { /* ignore if selector missing */ }
    await signup.clickCreateAccount();

    await account.expectAccountCreatedVisible();
    await account.clickContinue();
  await account.expectLoggedInAs(runtimeUser.name);
    await account.clickDeleteAccount();
    await account.expectAccountDeletedVisible();
    await account.clickContinue();
  });
}
