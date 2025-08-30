import { test, expect } from '@playwright/test';

test('open google', async ({ page }) => {
    await page.goto('https://google.com');
    await expect(page).toHaveTitle(/Google/);
});

test('open google and search', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // const practicePage = page.getByTestId('openwindow');
    // await practicePage.click();
    // await practicePage.fill("india");
page.getByTestId('openwindow').click();

}
);