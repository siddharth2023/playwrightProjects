import { defineConfig, devices } from "@playwright/test";
import type { TestOptions } from "./tests/my-test";
/**
Read environment variables from file.
https://github.com/motdotla/dotenv
*/
// require('dotenv').config();
/**
See https://playwright.dev/docs/test-configuration.
*/
// export default defineConfig({
export default defineConfig<TestOptions>({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    headless: false,
  },
  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: "chromium",
    //   use: { ...devices["Desktop Chrome"] },
    // },
    {
      name: "duckduck",
      use: {
        ...devices["Desktop Chrome"],
        person: "https://duck.com",
        baseURL: "https://spreadprivacy.com/",
      },
    },
    {
      name: "wiki",
      use: {
        ...devices["Desktop Chrome"],
        person: "https://wikipedia.org",
        baseURL: "https://en.wikipedia.org/wiki/Main_Page",
      },
    },
  ],
});