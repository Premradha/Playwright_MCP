import { Console } from 'console';
import * as dotenv from 'dotenv'

export const getEnv = () => {
    
    // Check multiple sources for environment
    // 1. process.env.ENV (direct env variable)
    // 2. process.env.npm_config_ENV (npm config style)
    // 3. CLI arguments (--ENV=dev style)
    // 4. default to 'qa'
    
    let currentEnv = process.env.npm_config_ENV?.toLowerCase();
    
    if (!currentEnv) {
        currentEnv = process.env.ENV?.toLowerCase();
    }
    
    // Check CLI arguments for --ENV=dev or --ENV dev
    if (!currentEnv) {
        const envArg = process.argv.find((arg, i) => {
            return arg.startsWith('--ENV') || (arg === '--ENV' && process.argv[i + 1]);
        });
        if (envArg) {
            if (envArg.includes('=')) {
                currentEnv = envArg.split('=')[1].toLowerCase();
            } else {
                const nextArg = process.argv[process.argv.indexOf(envArg) + 1];
                currentEnv = nextArg?.toLowerCase();
            }
        }
    }
    
    // Default to qa if no environment specified
    currentEnv = currentEnv || 'qa';

    //Declaring the path of .env files
        dotenv.config({
            override: true,
            path: `src/env/.env.${currentEnv}`,
            
        });

    console.log(`Loaded environment: .env.${currentEnv}`);
    // Store for use in other modules
    process.env.CURRENT_ENV = currentEnv;

}