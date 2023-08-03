import { test } from "./testFixture";
// import { test } from "./../fixture";

test("Video tests", async ({ page, baseURL, person, userName }) => {
  console.log("1");
  await page.pause();
  await page.goto(
    "https://webrtc.github.io/samples/src/content/devices/input-output/"
  );
  if (baseURL.includes("wiki")) {
    await page.getByPlaceholder("Search Wikipedia").click();
    await page.getByPlaceholder("Search Wikipedia").fill("apple");
  }
});
