import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login";
import { CartPage } from "../pages/cart";

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
test.beforeEach("login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("appu@kutti.com", "Appukutti1");
});

test.only("browser Rahulshetty academy client E2E", async ({ page }) => {
  const inputUserName = "appu@kutti.com";
  const productName = "ZARA COAT 3";

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

  const cartPage = new CartPage(page);
  await cartPage.expectNotification("Login");
  await cartPage.addProductsToCart(productName);
  //click cart section
  await cartPage.viewCart();

  // need to chane cartPage to dashboardPage

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
  // assert same credentials username are appearing for shipping information

  // select country in dynamic dropdown
  await countryDetails.pressSequentially("India", { delay: 100 });

  const dropDown = page.locator("section.ta-results").locator("button");
  await dropDown.last().waitFor();
  const optionCount = await dropDown.count();
  console.log(optionCount);
  for (let i = 0; i < optionCount; ++i) {
    let text = await dropDown.nth(i).textContent();
    console.log(text.trim());
    if (text.trim() == "India") {
      await dropDown.nth(i).click();
      break; //by instructor if found stop the loop to avoid looping again and save time
    }
  }

  await page.locator("select.ddl").first().selectOption("01");
  await page.locator("select.ddl").last().selectOption("17");
  await page.locator("div:nth-child(2) > div:nth-child(2) > input").fill("123");

  //apply rahulshettyacademy coupon after applying after waiting for sometime verify *coupon applied is displayed
  await page.locator("[name='coupon']").fill("rahulshettyacademy");

  await page.getByRole("button", { name: "Apply Coupon" }).click();
  await expect(page.locator(".form__cc .ng-star-inserted")).toContainText(
    "* Coupon Applied"
  );
  //after click pay
  await page.locator(".action__submit").click();
  //added color validation later

  await page.locator("h1").waitFor();
  console.log(await page.locator("h1").textContent());

  //after click pay

  // check for thankyou for the order page and copy the orderid
  const rawOrderId = await page.locator("label.ng-star-inserted").textContent();
  const orderId = rawOrderId.split(" | ")[1];
  // click orders history page
  await page.locator("label[routerlink='/dashboard/myorders']").click();

  await page.locator("h1").waitFor();
  const parentLocat = "th[scope='row']";
  //find the same order id and click view

  const parent = page.locator(parentLocat).filter({ hasText: orderId });
  await parent.waitFor();

  // await page.pause();
  await page
    .getByRole("row", { name: orderId })
    .getByRole("button")
    .first()
    .click();

  await page.locator("text = ORDER SUMMARY").waitFor();
  //check for the same order details present
  await expect(page.locator("div.title")).toContainText(productName);
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
