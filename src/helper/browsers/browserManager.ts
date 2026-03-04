import { LaunchOptions, chromium, firefox, webkit } from "@playwright/test";

const options: LaunchOptions = {
    headless: !true,
    slowMo: Number(process.env.SIDEBAR_COMPONENTS) || 200,
   // args: ['--start-maximized']
}

// Customizing the Browser Launch
export const invokeBrowser = () => {
    const browserType = process.env.BROWSER || "Chrome";
    console.log(`Loaded browser: ${browserType}`);

    switch (browserType.toUpperCase()) {
        case "CHROME":
            return chromium.launch(options);
        case "FIREFOX":
            return firefox.launch(options);
        case "WEBKIT":
            return webkit.launch(options);
        default:
            throw new Error("Please set the proper browser!")
    }
    
}