import { expect } from "@playwright/test";
import { test } from "./my-test";
test("test 1", async ({ page, person, baseURL }) => {
  await page.pause();
  if(baseURL.includes('wiki')) {
    await page.getByPlaceholder('Search Wikipedia').click();
    await page.getByPlaceholder('Search Wikipedia').fill('apple');
    await page.getByRole('link', { name: 'Apple Inc. American multinational technology corporation' }).click();
    await page.getByRole('heading', { name: 'Apple Inc.' }).getByText('Apple Inc.').click();
    await page.getByRole('heading', { name: 'History' }).getByText('History').click();
    await page.getByText('1980–1990: Success with Macintosh', { exact: true }).click();
    await page.getByText('2011–present: Post-Jobs era, Cook\'s leadership', { exact: true }).click();
  
  } 
  if(baseURL.includes('speed')) {
    await page.getByRole('link', { name: 'Device Privacy Tips' }).click();
    await page.getByRole('heading', { name: 'Device Privacy Tips' }).click();
    await page.getByRole('menuitem', { name: 'Privacy Crash Course' }).getByRole('link', { name: 'Privacy Crash Course' }).click();
    await page.getByRole('heading', { name: 'Crash Course' }).click();
    await page.getByRole('link', { name: 'Privacy Research' }).click();
    await page.getByRole('heading', { name: 'Privacy Research', exact: true }).click();
    await page.getByRole('link', { name: 'DuckDuckGo News' }).click();
    await page.getByRole('heading', { name: 'DuckDuckGo News' }).click();
    await page.getByRole('link', { name: 'Opinion' }).click();
    await page.getByRole('heading', { name: 'Opinion' }).click();
  }
  console.log(baseURL);
  console.log(baseURL);
});