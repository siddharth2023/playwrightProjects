import { test } from "@fixtures/testFixture";

import { expect } from "@playwright/test";

// test.describe.configure({ mode: 'serial' });
test.describe("A", () => {
  test("1", async ({ page }) => {
    await page.goto("https://jsfiddle.net/haferje/0ab7u85p/");
    await page.pause();
    await page
      .frameLocator('iframe[name="result"]')
      .getByRole("gridcell", { name: "571" })
      .click();
    await page
      .frameLocator('iframe[name="result"]')
      .getByRole("gridcell", { name: "43.2" })
      .click();

    expect(1).toEqual(1);
  });
  test("2", async ({ page }) => {
    await page.goto("https://wikipedia.com/");
    await page.pause();
    await page.getByLabel("Search Wikipedia").click();
    await page.getByLabel("Search Wikipedia").fill("apple");
    await page.getByRole("button", { name: "Search" }).click();
    await page.getByText("Etymology", { exact: true }).click();

    expect("School is not manual").toEqual("2");
  });
  test("3", async ({ page }) => {
    await page.goto("https://apple.com/");
    await page.getByRole("link", { name: "Support", exact: true }).click();
    await page
      .getByRole("heading", { name: "Apple Support", exact: true })
      .click();

    await page.pause();
    expect(1).toEqual(1);
  });
});

test.describe("2", () => {
  test("tricky", async ({ page }) => {
    await page.goto("https://duck.com");
    await page
      .getByRole("option", { name: "Press Enter" })
      .locator("span")
      .first()
      .click();
    await page.pause();
    await page.getByText("List").click();
    await page.pause();
    // await page
    //     .getByRole('row')
    //     .filter({ hasText: 'Text in Row Col1' })
    //     .getByRole('cell')
    //     .getByText('Text to match', { exact: true })
    //     .click();

    await page
      .getByRole("row")
      .filter({ has: page.getByText("Text row1 col1", { exact: true }) })
      .getByRole("cell")
      .getByText("submit", { exact: true });

    await page.pause();

    expect(1).toEqual(1);
  });
  test("2", async () => {
    const message: string = "one";
    const empty1: string = "two";
    const empty2: string = "three";
    if (message === empty1 || message === empty2) {
      console.log(true);
    }
    expect(1).toEqual(2);
  });
  test("3", async () => {
    expect(1).toEqual(1);
  });
});
