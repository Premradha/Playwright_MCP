import { Page, Locator, expect, FrameLocator } from "@playwright/test";
import BasePage from "./basePage";
import { pageFixture } from "../../hooks/pageFixture";


export class BookmarkPage extends BasePage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;

    
    
  }
}
 