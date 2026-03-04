import { expect, FrameLocator, Locator, Page } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";

let element: Locator;

export default class BasePage {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to a specified URL using Playwright's goto method
   * Logs the navigation action for tracking
   * @param url - The URL to navigate to
   */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
    pageFixture.logger.info(`Navigate to URL: ${url}`);
  }

  /**
   * Verifies that the expected URL page has opened by comparing actual and expected URLs
   * Waits for the element to be visible and adds a delay before URL validation
   * @param element - Locator of an element that should be visible on the expected page
   * @param expectedurl - The expected URL to validate against
   */
  async urlPageOpened(element: Locator, expectedurl: string): Promise<void> {
    pageFixture.logger.info('Verifying url Page opened');
    await element.first().waitFor();
    const basePage = new BasePage(pageFixture.page);
    await basePage.waitForFiveSeconds();
    const actualUrl = await this.getPageUrl();
    expect(actualUrl).toEqual(expectedurl);
  }

  /**
   * Waits for 5 seconds (5000 milliseconds) using a Promise wrapper
   * Useful for handling application delays or timing issues
   */
  public async waitForFiveSeconds(): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    });
  }

  /**
   * Waits for 2 seconds (2000 milliseconds) using a Promise wrapper
   * Used for shorter delays between actions
   */
  public async waitForTwoSeconds(): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  /**
   * Waits for 1 minute (60000 milliseconds) using a Promise wrapper
   * Used for longer delays when operations take extended time
   */
  public async waitForOneMinute(): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 60000);
    });
  }

  /**
   * Waits for 10 seconds (10000 milliseconds) using Playwright's native timeout
   * Alternative to Promise-based wait methods
   */
  async wait(): Promise<void> {
    await this.page.waitForTimeout(10000);
  }

  /**
   * Retrieves the current page URL
   * Waits for the page to reach 'domcontentloaded' state before retrieving the URL
   * @returns The current page URL as a string
   */
  public async getPageUrl(): Promise<string> {
    await this.page.waitForLoadState('domcontentloaded', { timeout: 60000 });
    const url = this.page.url();
    return url;
  }

  /**
   * Retrieves the text content of an element
   * Returns empty string if element has no text content
   * @param element - Locator of the element to retrieve text from
   * @returns The text content of the element, or empty string if null
   */
  async getText(element: Locator): Promise<string> {
    return (await element.textContent()) ?? "";
  }

  /**
   * Validates that the page has the expected title
   * Waits for the element to be visible before asserting the page title
   * @param expectedTitle - The expected title of the page
   * @param element - Locator of an element that should be visible before validation
   */
  async validatePageTitle(expectedTitle: string, element: Locator): Promise<void> {
    pageFixture.logger.info('Verifying Title of the url Page opened');
    await element.first().waitFor();
    const title = await this.page.title();
    pageFixture.logger.info(`Title of Application : ${title}`);
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  /**
   * Validates that the reader/heading element has the expected text
   * Waits for the element to be visible before retrieving and asserting the text
   * @param expectedHeading - The expected heading text
   * @param element - Locator of the heading element to validate
   */
  async validateReaderTitle(expectedHeading: string, element: Locator): Promise<void> {
    pageFixture.logger.info('Verifying Title of the E_Reader opened');
    await element.first().waitFor();
    const heading = await this.getText(element);
    pageFixture.logger.info(`Title of Application : ${heading}`);
    expect(heading).toBe(expectedHeading);
  }

  /**
   * Scrolls the specified element into view if needed
   * Waits for the element to be available before scrolling
   * @param element - Locator of the element to scroll into view
   */
  async scrollToWebElement(element: Locator): Promise<void> {
    await element.first().waitFor();
    await element.scrollIntoViewIfNeeded();
  }

  /**
   * Clicks an element after ensuring it is scrolled into view and visible
   * Logs the click action for tracking
   * @param element - Locator of the element to click
   */
  async clickElement(element: Locator): Promise<void> {
    pageFixture.logger.info("clicking value");
    await this.scrollToWebElement(element);
    await expect(element).toBeVisible();
    await element.click();
  }

  /**
   * Double-clicks an element with force flag enabled
   * Scrolls element into view and ensures visibility before double-clicking
   * @param element - Locator of the element to double-click
   */
  async doubleClickElement(element: Locator): Promise<void> {
    pageFixture.logger.info("clicking value");
    await this.scrollToWebElement(element);
    await expect(element).toBeVisible();
    await element.dblclick({ force: true });
  }

  /**
   * Force-clicks an element by bypassing visibility checks
   * Useful when normal click fails due to overlay or similar issues
   * @param element - Locator of the element to force-click
   */
  async forceClick(element: Locator): Promise<void> {
    pageFixture.logger.info("clicking value");
    await this.scrollToWebElement(element);
    await expect(element).toBeVisible();
    await element.click({ force: true });
  }

  /**
   * Gets the current date formatted in card format (MM/DD/YY)
   * Useful for date-based test data or assertions
   * @returns The current date as a string in format MM/DD/YY
   */
  async getCurrentDateInCardFormat(): Promise<string> {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = String(today.getFullYear()).slice(-2);
    return `${month}/${day}/${year}`;
  }

  /**
   * Fills an input field with the specified value
   * Scrolls element into view before filling and logs the action
   * @param element - Locator of the input field to fill
   * @param value - The value to fill into the field
   */
  async fillField(element: Locator, value: string): Promise<void> {
    pageFixture.logger.info("Filling value");
    await this.scrollToWebElement(element);
    await element.fill(value);
    pageFixture.logger.info(`Filled Element: ${value}`);
  }

  /**
   * Edits an input field by appending text to existing content
   * Clicks to ensure focus before typing, unlike fillField which replaces content
   * @param element - Locator of the input field to edit
   * @param value - The text to append to the field
   */
  async editField(element: Locator, value: string): Promise<void> {
    pageFixture.logger.info("Editing value");
    await this.scrollToWebElement(element);
    await element.click();
    await element.type(value);
    pageFixture.logger.info(`Edited Element with value: "${value}"`);
  }

  /**
   * Clears the content of an input field
   * Scrolls element into view before clearing
   * @param element - Locator of the input field to clear
   */
  async clearField(element: Locator): Promise<void> {
    pageFixture.logger.info("Clearing field");
    await this.scrollToWebElement(element);
    await element.clear();
  }

  /**
   * Retrieves the current value of an input field
   * Scrolls element into view before retrieving the value
   * @param element - Locator of the input field to get value from
   * @returns The current value of the input field
   */
  async getValue(element: Locator): Promise<string> {
    pageFixture.logger.info("get field value");
    await this.scrollToWebElement(element);
    return element.inputValue();
  }

  /**
   * Retrieves only the direct text content of an element, excluding nested element text
   * Filters out HTML elements and returns only text nodes
   * @param element - Locator of the element to retrieve text from
   * @returns The text content excluding nested elements
   */
  async getOnlyTextContent(element: Locator): Promise<string> {
    return await element.evaluate((el) => {
      return Array.from(el.childNodes)
        .filter(node => node.nodeType === Node.TEXT_NODE)
        .map(node => node.textContent?.trim())
        .join(' ');
    });
  }

  /**
   * Validates that the product page displays the expected product name
   * Compares the element text with the expected product name
   * @param element - Locator of the element containing the product name
   * @param productname - The expected product name to validate against
   */
  async validateProductPage(element: Locator, productname: string): Promise<void> {
    const title = await this.getText(element);
    expect(title).toEqual(productname);
    pageFixture.logger.info(`Navigated to ${title} product page`);
  }

  /**
   * Hovers over an element to trigger hover-related interactions
   * Scrolls element into view and waits for it before hovering
   * @param element - Locator of the element to hover over
   */
  async hoverElement(element: Locator): Promise<void> {
    pageFixture.logger.info("hovering Element");
    await this.scrollToWebElement(element);
    await element.first().waitFor();
    await element.hover({ force: true });
  }

  /**
   * Asserts that an element is visible on the page
   * Throws an error if the element is not visible
   * @param element - Locator of the element to check visibility for
   */
  async elementIsVisible(element: Locator): Promise<void> {
    await expect(element).toBeVisible();
  }

  /**
   * Asserts that an element is not visible on the page
   * Throws an error if the element is visible
   * @param element - Locator of the element to check non-visibility for
   */
  async elementIsNotVisible(element: Locator): Promise<void> {
    pageFixture.logger.info("Verifying element is not visible");
    await expect(element).not.toBeVisible();
  }

  /**
   * Asserts that an element is displayed and enabled on the page
   * Verifies that the element exists and is in an enabled state
   * @param element - Locator of the element to check display state for
   */
  async elementIsDisplayed(element: Locator): Promise<void> {
    await (element.count()) > 0;
    await expect(element).toBeEnabled();
  }

  /**
   * Checks a checkbox and verifies it is checked
   * Waits for the checkbox element before attempting to check it
   * @param element - Locator of the checkbox element to check
   */
  async selectCheckBox(element: Locator): Promise<void> {
    await element.first().waitFor();
    await element.check();
    await this.verifyCheckboxIsChecked(element);
  }

  /**
   * Asserts that a checkbox is in the checked state
   * Waits for the checkbox element before verifying its checked state
   * @param element - Locator of the checkbox element to verify
   */
  async verifyCheckboxIsChecked(element: Locator): Promise<void> {
    pageFixture.logger.info("Verifying checkbox is checked");
    await element.first().waitFor();
    await expect(element).toBeChecked();
  }

  /**
   * Unchecks a checkbox and verifies it is unchecked
   * Waits for the checkbox element before attempting to uncheck it
   * @param element - Locator of the checkbox element to uncheck
   */
  async uncheckCheckBox(element: Locator): Promise<void> {
    await element.first().waitFor();
    await element.uncheck();
    pageFixture.logger.info("element is unchecked");
    await this.verifyCheckboxIsUnchecked(element);
  }

  /**
   * Asserts that a checkbox is in the unchecked state
   * Waits for the checkbox element before verifying its unchecked state
   * @param element - Locator of the checkbox element to verify
   */
  async verifyCheckboxIsUnchecked(element: Locator): Promise<void> {
    pageFixture.logger.info("Verifying checkbox is unchecked");
    await element.first().waitFor();
    await expect(element).not.toBeChecked();
  }

  /**
   * Asserts that an input element has the expected value
   * Waits for the element before verifying its value
   * @param element - Locator of the input element to verify
   * @param expectedText - The expected value of the element
   */
  async elementHaveValue(element: Locator, expectedText: string): Promise<void> {
    pageFixture.logger.info('Verifying element have expected Text');
    await element.first().waitFor();
    await expect(element).toHaveValue(expectedText);
  }

  /**
   * Asserts that an element has the expected attribute with a specific value
   * Waits for the element before verifying its attribute
   * @param element - Locator of the element to verify
   * @param attributeType - The name of the attribute to check
   * @param attributeValue - The expected value of the attribute
   */
  async elementHaveAttribute(element: Locator, attributeType: string, attributeValue: string): Promise<void> {
    pageFixture.logger.info('Verifying actual element attribute matches with expected attribute');
    await element.first().waitFor();
    await expect(element.first()).toHaveAttribute(attributeType, attributeValue);
  }

  /**
   * Asserts that an element does not have the specified attribute with the given value
   * Waits for the element before verifying its attribute absence
   * @param element - Locator of the element to verify
   * @param attributeType - The name of the attribute to check
   * @param attributeValue - The value that should not be present in the attribute
   */
  async elementNotHaveAttribute(element: Locator, attributeType: string, attributeValue: string): Promise<void> {
    pageFixture.logger.info('Verifying actual element attribute matches with expected attribute');
    await element.first().waitFor();
    await expect(element.first()).not.toHaveAttribute(attributeType, attributeValue);
  }

  /**
   * Retrieves the value of a specific attribute from an element
   * Waits for the element before retrieving the attribute value
   * @param element - Locator of the element to retrieve attribute from
   * @param attributeType - The name of the attribute to retrieve
   * @returns The value of the attribute, or null if the attribute doesn't exist
   */
  async getAttributeValue(element: Locator, attributeType: string): Promise<string | null> {
    pageFixture.logger.info('Verifying actual element attribute matches with expected attribute');
    await element.first().waitFor();
    return await element.getAttribute(attributeType);
  }

  /**
   * Extracts text data from a table element
   * Iterates through all rows and columns, collecting cell text content
   * Excludes the last column from the collection
   * @param element - Locator of the table element to extract data from
   * @returns An array of strings containing all table cell content (excluding last column)
   */
  async getTableData(element: Locator): Promise<string[]> {
    let data: string[] = [];
    await element.first().waitFor();
    const table_name: Locator = element;
    const headers: Locator = table_name.locator("//thead//tr/th");
    const rows: Locator = table_name.locator("//tbody//tr");
    const rowcount = await rows.count();
    pageFixture.logger.info(`Row count is: ${rowcount}`);

    for (let i = 0; i < rowcount; i++) {
      const row: Locator = rows.nth(i);
      const tds: Locator = row.locator("td");
      for (let j = 0; j < await tds.count() - 1; j++) {
        data.push((await tds.nth(j).textContent())?.trim() || "");
      }
    }
    pageFixture.logger.info(`Table data: ${data}`);
    return data;
  }

  /**
   * Retrieves comprehensive layout and styling information for an element
   * Extracts computed styles for dimensions, spacing, colors, fonts, and visual properties
   * @param element - Locator of the element to retrieve layout data from
   * @returns An object containing detailed layout, styling, and visual properties
   */
  async getLayoutData(element: Locator): Promise<{
    width: number;
    height: number;
    lineHeight: string;
    padding: {
      top: string;
      right: string;
      bottom: string;
      left: string;
    };
    margin: {
      top: string;
      right: string;
      bottom: string;
      left: string;
    };
    borderWidth: {
      top: string;
      right: string;
      bottom: string;
      left: string;
    };
    aspectRatio: string;
    backgroundColor: string;
    borderRadius: {
      bottomLeft: string;
      bottomRight: string;
      topLeft: string;
      topRight: string;
    };
    borderColor: {
      top: string;
      right: string;
      bottom: string;
      left: string;
    };
    color: string;
    font: {
      family: string;
      size: string;
      style: string;
      weight: string;
    };
    textDecoration: {
      line: string;
      color: string;
      style: string;
      thickness: string;
    };
    outline: {
      color: string;
      style: string;
      width: string;
      offset: string;
    };
    cursor: string;
    boxShadow: string;
  }> {
    return await element.evaluate((element: Element) => {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height,
        lineHeight: style.lineHeight,
        padding: {
          top: style.paddingTop,
          right: style.paddingRight,
          bottom: style.paddingBottom,
          left: style.paddingLeft,
        },
        margin: {
          top: style.marginTop,
          right: style.marginRight,
          bottom: style.marginBottom,
          left: style.marginLeft,
        },
        borderWidth: {
          top: style.borderTopWidth,
          right: style.borderRightWidth,
          bottom: style.borderBottomWidth,
          left: style.borderLeftWidth,
        },
        aspectRatio: style.aspectRatio || 'not defined',
        backgroundColor: style.backgroundColor,
        borderRadius: {
          bottomLeft: style.borderBottomLeftRadius,
          bottomRight: style.borderBottomRightRadius,
          topLeft: style.borderTopLeftRadius,
          topRight: style.borderTopRightRadius,
        },
        borderColor: {
          top: style.borderTopColor,
          right: style.borderRightColor,
          bottom: style.borderBottomColor,
          left: style.borderLeftColor,
        },
        color: style.color,
        font: {
          family: style.fontFamily,
          size: style.fontSize,
          style: style.fontStyle,
          weight: style.fontWeight,
        },
        textDecoration: {
          line: style.textDecorationLine,
          color: style.textDecorationColor,
          style: style.textDecorationStyle,
          thickness: style.textDecorationThickness,
        },
        outline: {
          color: style.outlineColor,
          style: style.outlineStyle,
          width: style.outlineWidth,
          offset: style.outlineOffset,
        },
        cursor: style.cursor,
        boxShadow: style.boxShadow,
      };
    });
  }

}
