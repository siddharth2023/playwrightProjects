import { test as base } from "@playwright/test";
export type TestOptions = {
  person: string;
  baseURL: string;
  userName: string;
};
export const test = base.extend<TestOptions>({
  // Define an option and provide a default value.
  // We can later override it in the config.
  person: ["https://github.com", { option: true }],
  // Override default "page" fixture.
  page: async ({ page, baseURL, person, userName }, use) => {
    // await page.pause();
    // baseURL = process.env.CI
    //   ? ${process.env.BASE_URL}
    //   : "https://playwright.dev/";
    await page.goto(baseURL);
    console.log(userName);
    console.log(person);
    // Each test will get a "page" that already has the person name.
    await use(page);
  },
});