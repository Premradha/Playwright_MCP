export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            
            // Dynamically handling the different options for the Properties
            BROWSER: "chrome" | "firefox" | "webkit",
            ENV: "dev" | "qa" | "prod",
            BASEURL: string,
            HEADLESS: string
        }
    }
}