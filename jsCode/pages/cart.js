export class CartPage {
  constructor(page) {
    this.page = page;
    this.toastNotificationMessage = page.locator(".toast-success");
    this.cardBody = page.locator(".card-body b");
    this.addToCartButton = page.locator("div button .fa-shopping-cart");
    this.CartButton = page.locator("ul button .fa-shopping-cart");
  }
  async expectNotification(message) {
    await expect(this.toastNotificationMessage).toBeVisible();
    await expect(this.toastNotificationMessage).toContainText(message);
  }
  async addProductsToCart(productName) {
    //await expect(cardBody.last()).toBeVisible(); //aruneshwar way to wait
    await this.cardBody.last().waitFor(); //instructor way to wait latest
    //   await page.waitForLoadState("networkidle"); //instructor way to wait old
    const products = await this.cardBody.allTextContents();
    //add selected product to the cart
    for (let product in products) {
      if ((await this.cardBody.nth(product).textContent()) == productName) {
        console.log(
          `found adidas ${product}`,
          await this.cardBody.nth(product).textContent()
        );
        await this.addToCartButton.nth(product).click();
        break; //by instructor if found stop the loop to avoid looping again and save time
      }
    }
    // product added to the cart
    await this.expectNotification("Cart");
    //click cart section
  }
  async viewCart() {
    await this.CartButton.click();
  }
}
