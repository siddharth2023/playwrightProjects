import { test } from "@fixtures/testFixture";

test.describe("Verify blocked extensions", () => {
  test("test 1", async ({ page, person, baseURL, userName }) => {
    if (baseURL.includes("wiki")) {
      await page.getByPlaceholder("Search Wikipedia").click();
      await page.getByPlaceholder("Search Wikipedia").fill("apple");
    }
    if (baseURL.includes("spread")) {
      await page.getByRole("link", { name: "Device Privacy Tips" }).click();
      await page.getByRole("heading", { name: "Device Privacy Tips" }).click();
      await page
        .getByRole("menuitem", { name: "Privacy Crash Course" })
        .getByRole("link", { name: "Privacy Crash Course" })
        .click();
      await page.getByRole("heading", { name: "Crash Course" }).click();
    }
  });
});
