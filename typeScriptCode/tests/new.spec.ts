const { test } = require('@playwright/test');

test.only('first playwright', async ({page}) => {
    await page.goto('https://YOUTUBE.COM');
});