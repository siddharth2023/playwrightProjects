import { test as base, type BrowserContext, chromium } from "@playwright/test";
export type TestOptions = {
  person: string;
  baseURL: string;
  userName: string;
};
export const test = base.extend<
  {
    context: BrowserContext;
  } & TestOptions
>({
  // Define an option and provide a default value.
  // We can later override it in the config.
  person: ["https://github.com", { option: true }],
  userName: ["https://github.com", { option: true }],
  // Override default "page" fixture.
  page: async ({ page, baseURL, person, userName }, use) => {
    // baseURL = process.env.CI
    //   ? ${process.env.BASE_URL}
    //   : "https://playwright.dev/";
    await page.goto(baseURL);
    console.log(userName);
    console.log(person);
    // Each test will get a "page" that already has the person name.
    await use(page);
    // set login storage
  },
  context: async ({}, use) => {
    let context;
    context = await chromium.launchPersistentContext("", {
      headless: false,
      args: [
        "--auto-accept-camera-and-microphone-capture",
        "-use-fake-device-for-media-stream",
        // "--use-fake-ui-for-media-stream",
        // "--use-file-for-fake-video-capture=/assets/sample_video.y4m",
      ],
      ignoreDefaultArgs: ["--enable-automation"],
    });

    await context.grantPermissions(["camera", "microphone"]);
    await use(context);
    // await context.close();
  },
});
