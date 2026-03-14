import { Page, Locator, expect } from "@playwright/test";
import BasePage from "./basePage";
import { pageFixture } from "../../hooks/pageFixture";

/**
 * LoginPage class represents the OrangeHRM login page
 * Contains all locators and methods for login interactions
 */
export class LoginPage extends BasePage {
  readonly loginSection: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly dashboardHeading: Locator;
  readonly userProfile: Locator;
  readonly sidebarMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.loginSection = page.locator('xpath=//div[@class="orangehrm-login-container"]');
    this.usernameField = page.getByRole('textbox', { name: 'Username' });
    this.passwordField = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.dashboardHeading = page.getByRole('heading', { level: 6, name: 'Dashboard' });
    this.userProfile = page.locator('xpath=//paragraph[contains(text(), "Double Test") or contains(text(), "manda user")]');
    this.sidebarMenu = page.locator('nav[aria-label="Sidepanel"]');
  }

  /**
   * Navigates to the OrangeHRM login page
   */
  async navigateToLoginPage(): Promise<void> {
    await this.navigateTo('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await pageFixture.logger.info('Navigated to OrangeHRM login page');
  }

  /**
   * Enters username in the Username field
   * @param username - Username to enter
   */
  async enterUsername(username: string): Promise<void> {
    await this.fillField(this.usernameField, username);
    await pageFixture.logger.info(`Entered username: ${username}`);
  }

  /**
   * Enters password in the Password field
   * @param password - Password to enter
   */
  async enterPassword(password: string): Promise<void> {
    await this.fillField(this.passwordField, password);
    await pageFixture.logger.info('Entered password');
  }

  /**
   * Clicks the Login button to submit credentials
   */
  async clickLoginButton(): Promise<void> {
    await this.clickElement(this.loginButton);
    await pageFixture.logger.info('Clicked login button');
  }

  /**
   * Verifies that the user is redirected to the dashboard page
   */
  async verifyDashboardRedirect(): Promise<void> {
    const currentUrl = await this.getPageUrl();
    expect(currentUrl).toContain('/dashboard/index');
    await pageFixture.logger.info('Verified user redirected to dashboard URL: ' + currentUrl);
  }

  /**
   * Verifies that the dashboard page is fully loaded and displayed
   */
  async verifyDashboardPageDisplayed(): Promise<void> {
    await this.elementIsVisible(this.dashboardHeading);
    await this.elementIsVisible(this.sidebarMenu);
    await this.elementIsVisible(this.userProfile);
    await pageFixture.logger.info('Verified dashboard page is displayed with all main elements');
  }

  /**
   * Performs complete login flow with valid credentials
   * @param username - Username to login with
   * @param password - Password to login with
   */
  async performLogin(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
    await this.verifyDashboardRedirect();
    await this.verifyDashboardPageDisplayed();
    await pageFixture.logger.info('Successfully logged in as ' + username);
  }
}
