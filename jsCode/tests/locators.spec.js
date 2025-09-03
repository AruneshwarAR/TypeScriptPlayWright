import { test, expect } from "@playwright/test";
test("browser launch", async ({ page }) => {
  const userName = page.locator("#username");
  const passWord = page.locator("#password");
  const signIn = page.locator("[value='Sign In']");
  const card = page.locator(".card-title a");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await userName.fill("asfasfas");
  await passWord.fill("fasfaf");
  await page.locator("[type='checkbox']").check();
  await signIn.click();
  console.log(await page.locator("[style*='block']").textContent()); // to get text from the element
  await expect(page.locator("[style*='block']")).toContainText("Incorrec"); // assert webelement contains text
  await userName.fill("rahulshettyacademy");
  await passWord.fill("learning");
  await signIn.click();
  //   let links = await card.nth(1).textContent();
  //   let linkss = await card.first().textContent();
  //   console.log(linkss);
  //   console.log(links);
  await expect(card.last()).toBeVisible();
  let Products = await card.allTextContents();
  //   for (let Product in Products) {
  console.log(Products.toString());
  console.log(Products);
  //   }
});

test.only("browser Rahulshetty academy client", async ({ page }) => {
  const loginPage = "https://rahulshettyacademy.com/client/auth/login";
  const userName = page.locator("#userEmail"); //appu@kutti.com
  const passWord = page.locator("#userPassword"); //Appukutti1
  const loginbtn = page.locator("#login");
  const cardBody = page.locator(".card-body b");

  await page.goto(loginPage);
  await userName.fill("appu@kutti.com");
  await passWord.fill("Appukutti1");
  await loginbtn.click();
  //await expect(cardBody.last()).toBeVisible(); //aruneshwar way to wait
  await cardBody.last().waitFor(); //instructor way to wait latest
  //   await page.waitForLoadState("networkidle"); //instructor way to wait old
  const products = await cardBody.allTextContents();
  console.log(products);
  await page.pause();
});
