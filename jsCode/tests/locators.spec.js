import { test, expect } from "@playwright/test";
test.only("browser launch", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(page.title());
  await page.locator("#username").fill("asfasfas");
  await page.locator("#password").fill("fasfaf");
  await page.locator("[type='checkbox']").check();
  await page.locator("[value='Sign In']").click();
});
