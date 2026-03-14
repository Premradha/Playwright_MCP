import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "../../hooks/pageFixture";
import { LoginPage } from "../pages/loginPage.spec";

/**
 * Step Definitions for OrangeHRM Login Page Feature
 * Maps Gherkin scenarios to LoginPage methods
 */

let loginPage: LoginPage;

/**
 * Navigate to OrangeHRM login page
 * Matches: Given I navigate to OrangeHRM login page
 */
Given('I navigate to OrangeHRM login page', async function () {
  loginPage = new LoginPage(pageFixture.page);
  await loginPage.navigateToLoginPage();
  await pageFixture.logger.info('Background: Navigated to login page');
});

/**
 * Enter username in the Username field
 * Matches: When I enter "Admin" in the Username field
 */
When('I enter {string} in the Username field', async function (username: string) {
  loginPage = new LoginPage(pageFixture.page);
  await loginPage.enterUsername(username);
  await pageFixture.logger.info(`When: Entered username "${username}"`);
});

/**
 * Enter password in the Password field
 * Matches: And I enter "admin123" in the Password field
 */
When('I enter {string} in the Password field', async function (password: string) {
  loginPage = new LoginPage(pageFixture.page);
  await loginPage.enterPassword(password);
  await pageFixture.logger.info('When: Entered password');
});

/**
 * Click the Login button
 * Matches: And I click the Login button
 */
When('I click the Login button', async function () {
  loginPage = new LoginPage(pageFixture.page);
  await loginPage.clickLoginButton();
  await pageFixture.logger.info('When: Clicked login button');
});

/**
 * Verify user is redirected to the dashboard
 * Matches: Then I should be redirected to the dashboard
 */
Then('I should be redirected to the dashboard', async function () {
  loginPage = new LoginPage(pageFixture.page);
  await loginPage.verifyDashboardRedirect();
  await pageFixture.logger.info('Then: Verified redirect to dashboard');
});

/**
 * Verify the dashboard page is displayed
 * Matches: And the dashboard page should display
 */
Then('the dashboard page should display', async function () {
  loginPage = new LoginPage(pageFixture.page);
  await loginPage.verifyDashboardPageDisplayed();
  await pageFixture.logger.info('Then: Verified dashboard page is displayed');
});
