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
  for (let product in products) {
    if ((await cardBody.nth(product).textContent()) == "ADIDAS ORIGINAL") {
      console.log(
        `found adidas ${product}`,
        await cardBody.nth(product).textContent()
      );
      await page.locator("div button .fa-shopping-cart").nth(product).click();
    }
  }
  await page.waitForEvent("load");
  await expect(page.locator(".toast-success")).toBeVisible;
  await page.pause();
  await page.click("");
});

test("UI Test", async ({ page }) => {
  const userName = page.locator("#username");
  const passWord = page.locator("#password");
  const signIn = page.locator("[value='Sign In']");
  const card = page.locator(".card-title a");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await userName.fill("rahulshettyacademy");
  await passWord.fill("learning");
  await page.locator("span.radiotextsty").last().click();
  await page.getByRole("button", { name: "Okay" }).click();
  const dropDown = page.locator("select.form-control");
  await dropDown.selectOption("consult");
  await page.locator("[type='checkbox']").check();
  console.log(await page.locator("span.radiotextsty").last().isChecked());
  await expect(page.locator("span.radiotextsty").last()).toBeChecked();
  expect(
    await page.locator("span.radiotextsty").first().isChecked()
  ).toBeFalsy();
  await expect(page.locator('[href="https://qasummit.org/"]')).toHaveAttribute(
    "class",
    "blinkingText"
  );
  //await page.pause();
  await signIn.click();
  await card.last().waitFor();
  let Products = await card.allTextContents();
  console.log(Products.toString());
  console.log(Products);
});

test("multiple window handle", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  const document = page.locator("[href*='documents-request']");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    document.click(),
  ]);
  const emailText = await newPage.locator(".red").textContent();
  console.log(emailText);
  const inpuText = emailText.split("@")[1].split(" ")[0];
  await userName.fill(inpuText);
  await page.keyboard.press("Tab");
  console.log(await userName.inputValue());
  await expect(userName).toHaveValue("rahulshettyacademy.com");
});
