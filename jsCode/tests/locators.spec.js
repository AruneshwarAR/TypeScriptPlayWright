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

test.only("browser Rahulshetty academy client E2E", async ({ page }) => {
  const loginPage = "https://rahulshettyacademy.com/client/auth/login";
  const inputUserName = "appu@kutti.com";
  const userName = page.locator("#userEmail"); //appu@kutti.com
  const passWord = page.locator("#userPassword"); //Appukutti1
  const loginbtn = page.locator("#login");
  const cardBody = page.locator(".card-body b");
  const toast = page.locator(".toast-success");
  const CartButton = page.locator("ul button .fa-shopping-cart");
  const productName = "ADIDAS ORIGINAL";
  const MyCart = page.locator(".infoWrap .cartSection");
  const cartProduct = MyCart.locator("h3");
  const checkoutButton = page.getByRole("button", { name: "Checkout" });
  // payment method page
  const itemDetails = page.locator(".item__details");
  const itemTitle = itemDetails.locator(".item__title");
  const itemQuantity = itemDetails.locator(".item__quantity");
  const userDetails = page
    .locator("div.details__user div.user__name input")
    .first();

  const countryDetails = page
    .locator("div.details__user div.user__name input")
    .last();

  await page.goto(loginPage);
  await userName.fill(inputUserName);
  await passWord.fill("Appukutti1");
  await loginbtn.click();
  await expect(toast).toBeVisible();
  await expect(toast).toContainText("Login");

  //await expect(cardBody.last()).toBeVisible(); //aruneshwar way to wait
  await cardBody.last().waitFor(); //instructor way to wait latest
  //   await page.waitForLoadState("networkidle"); //instructor way to wait old
  const products = await cardBody.allTextContents();
  //add selected product to the cart
  for (let product in products) {
    if ((await cardBody.nth(product).textContent()) == productName) {
      console.log(
        `found adidas ${product}`,
        await cardBody.nth(product).textContent()
      );
      await page.locator("div button .fa-shopping-cart").nth(product).click();
    }
  }
  // product added to the cart
  await expect(toast).toBeVisible();
  await expect(toast).toContainText("Cart");
  //click cart section
  await CartButton.click();

  //assert same product is added to the cart
  await expect(cartProduct).toContainText(productName);

  // after successful assert click checkout
  await checkoutButton.click();

  //after check out assert same product and same quantity appeared
  await expect(itemTitle).toContainText(productName);
  await expect(itemQuantity).toContainText("1");
  await expect(userDetails).toHaveValue(inputUserName);

  // click credit card and add payment details
  await countryDetails.click();

  await countryDetails.pressSequentially("India", { delay: 100 });
  // await page.pause();
  // await page
  //   .locator(".section .button")
  //   .filter({ has: page.getByRole("span", { name: "India" }) })
  //   .click();
  const dropDown = page.locator("section.ta-results").locator("button");
  await dropDown.last().waitFor();
  const optionCount = await dropDown.count();
  console.log(optionCount);
  for (let i = 0; i < optionCount; ++i) {
    let text = await dropDown.nth(i).textContent();
    console.log(text.trim());
    if (text.trim() == "India") {
      await dropDown.nth(i).click();
    }
  }

  await page.locator("select.ddl").first().selectOption("01");
  await page.locator("select.ddl").last().selectOption("17");
  await page.locator("div:nth-child(2) > div:nth-child(2) > input").fill("123");

  await page.locator("[name='coupon']").fill("rahulshettyacademy");

  await page.getByRole("button", { name: "Apply Coupon" }).click();
  await expect(page.locator(".form__cc .ng-star-inserted")).toContainText(
    "* Coupon Applied"
  );
  await page.locator(".action__submit").click();
  //added color validation later

  await page.locator("h1").waitFor();
  console.log(await page.locator("h1").textContent());
  // assert same credentials username are appearing for shipping information

  // select country in dynamic dropdown

  //apply rahulshettyacademy coupon after applying after waiting for sometime verify *coupon applied is displayed

  //after click pay

  // check for thankyou for the order page and copy the orderid
  const rawOrderId = page.locator("label.ng-star-inserted").textContent();
  const orderId = rawOrderId.split(" | ")[1];
  page.locator("label[routerlink='/dashboard/myorders']").click();

  page.waitFor();
  page
    .locator("th[scope='row']")
    .filter({ hasText: orderId })
    .getByRole("button", { name: "View" })
    .click();

  // click orders history page

  //find the same order id and click view

  //check for the same order details present
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
