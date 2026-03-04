import { setDefaultTimeout } from '@cucumber/cucumber';

// Set default timeout for every async step/hook to 60s
setDefaultTimeout(60 * 1000);