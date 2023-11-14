import { test } from "./testFixture";

test("Login ", async ({ page }) => {
  await page.goto("https://www.w3schools.com/howto/howto_css_login_form.asp");
  await page.getByLabel("Login to your account").click();
  await page.locator("#modalusername").fill("aaa");
  await page.getByLabel("Password").fill("asdf");
  await page.getByRole("button", { name: "Log in" }).click();
  await page.pause();
});
