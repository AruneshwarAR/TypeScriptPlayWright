import { test, expect } from "@playwright/test";
test.only("playwright special locators", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me").check();
  await page.getByLabel("Employed").click();
});
