import { defineConfig, devices } from "@playwright/test";
import type { TestOptions } from "./tests/my-test";

export default defineConfig<TestOptions>({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? process.env.WORKERS : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    trace: "on-first-retry",
    headless: process.env.CI ? true : false,
  },
  /* Configure projects for major browsers */
  projects: [
    { name: "setup", testMatch: /.*\.setup\.ts/ },

    {
      name: "duckduck",
      use: {
        ...devices["Desktop Chrome"],
        person: "https://duck.com",
        baseURL: "https://spreadprivacy.com/",
        userName: "a",
      },
    },
    {
      name: "wiki",
      use: {
        ...devices["Desktop Chrome"],
        person: "https://wikipedia.org",
        baseURL: "https://en.wikipedia.org/wiki/Main_Page",
        userName: "a",
      },
    },
  ],
});
