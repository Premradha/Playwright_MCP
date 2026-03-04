import { BeforeAll, Before, AfterAll, After, BeforeStep, AfterStep, Status } from "@cucumber/cucumber";
import { Browser, chromium, Page } from "playwright";
import { Context } from "vm";
import { pageFixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../env/env";
import { createLogger } from "winston";
import { options } from "../helper/utils/logger";
const fs = require("fs-extra");

let browser: Browser;
let context: Context;
let page: Page;

BeforeAll(async () => {
  // Invoking the Browser
  getEnv();
  browser = await invokeBrowser();
});

Before(async ({pickle}) => {
  const scenarioName: string = pickle.name + pickle.id;

  context = await browser.newContext({
    recordVideo: {
      dir: "test-results/videos",
    },
  });

  await context.tracing.start({
    name: scenarioName,
    title: pickle.name,
    sources: true,
    screenshots: true,
    snapshots: true
  });

  // Invoking the Page
  page = await context.newPage();

  await page.evaluate(() => {
    document.body.style.zoom = "80%";
  });

  // Fixture handling
  pageFixture.page = page;
  pageFixture.logger = createLogger(options(scenarioName));
});

After(async function ({pickle, result}) {
  let videoPath: string | undefined;
  let img: Buffer;

  const sanitizedName = pickle.name.replace(/[<>:"/\\|?*]/g, "").replace(/\s+/g, "_");

  const path = `./test-results/trace/${pickle.id}.zip`;
  await context.tracing.stop({ path: path });

  if (result?.status == Status.PASSED) {
    // Screenshot handling
    img = await pageFixture.page.screenshot({
      path: `./test-results/screenshots/${sanitizedName}.png`,
      type: "png"
    });

    // Video handling
    videoPath = await pageFixture.page.video()?.path();

    await this.attach(img, "image/png");

    if (videoPath) {
      await this.attach(fs.readFileSync(videoPath), "video/webm");
    } else {
      console.warn("Skipping video attachment: No video recorded.");
    }

    // Trace File handling
    const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${path}</a>`;
    await this.attach(`Trace file: ${traceFileLink}`, "text/html");
  }

  // Closing the page
  await page.close();
  await context.close();
});

AfterAll(async () => {
  // Closing the browser
  await browser.close();
});

export { page };
