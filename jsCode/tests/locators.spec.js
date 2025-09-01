import { test, expect } from "@playwright/test";
test.only("browser launch", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  console.log(expect(page.getByTitle()));
});
