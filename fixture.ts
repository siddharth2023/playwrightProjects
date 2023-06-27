import { test as base, chromium, type BrowserContext } from "@playwright/test";
import * as path from "path";
import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();

export type TestOptions = {
  url: string;
};

export const test = base.extend<
  {
    context: BrowserContext;
    extensionId: string;
  },
  { workerStorageState: string } & TestOptions
>({
  // url: ["https://wikipedia.com/", { option: true }],
  // Use the same storage state for all tests in this worker.
  storageState: ({ workerStorageState }, use) => use(workerStorageState),
  workerStorageState: [
    async ({ browser }, use) => {
      // Use parallelIndex as a unique identifier for each worker.
      const id = test.info().parallelIndex;
      const fileName = path.resolve(
        test.info().project.outputDir,
        `.auth/${id}.json`
      );

      if (fs.existsSync(fileName)) {
        // Reuse existing authentication state if any.
        await use(fileName);
        return;
      }

      // Important: make sure we authenticate in a clean environment by unsetting storage state.
      const page = await browser.newPage({ storageState: undefined });

      // Acquire a unique account, for example create a new one.
      // Alternatively, you can have a list of precreated accounts for testing.
      // Make sure that accounts are unique, so that multiple team members
      // can run tests at the same time without interference.
      // const account = await acquireAccount(id);

      // Perform authentication steps. Replace these actions with your own.
      await page.pause();
      await page.goto("https://github.com/login");
      await page.getByLabel("Username or email address").fill("username");
      await page.getByLabel("Password").fill("password");
      await page.getByRole("button", { name: "Sign in" }).click();
      // Wait until the page receives the cookies.
      //
      // Sometimes login flow sets cookies in the process of several redirects.
      // Wait for the final URL to ensure that the cookies are actually set.
      await page.waitForURL("https://github.com/");
      // Alternatively, you can wait until the page reaches a state where all cookies are set.
      await expect(
        page.getByRole("button", { name: "View profile and more" })
      ).toBeVisible();

      // End of authentication steps.

      await page.context().storageState({ path: fileName });
      await page.close();
      await use(fileName);
    },
    { scope: "worker" },
  ],

  page: async ({ page }, use) => {
    await use(page);
  },
  // eslint-disable-next-line no-empty-pattern
  context: async ({}, use) => {
    const pathToExtension = path.join(
      __dirname,
      `../extensions/${process.env.EXTENSION_DIRECTORY_NAME}`
    );
    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
        "--auto-accept-camera-and-microphone-capture",
        "-use-fake-device-for-media-stream",
      ],
    });
    await context.grantPermissions(["camera", "microphone"]);
    await use(context);
    // await context.close();
  },
  extensionId: async ({ context }, use) => {
    let [background] = context.serviceWorkers();
    if (!background) background = await context.waitForEvent("serviceworker");

    const extensionId = background.url().split("/")[2];
    await use(extensionId);
  },
});
export const expect = test.expect;
