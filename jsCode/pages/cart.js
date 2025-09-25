import { expect } from "@playwright/test";
export class CartPage {
  constructor(page) {
    this.page = page;
    this.MyCart = page.locator(".infoWrap .cartSection");
    this.cartProduct = this.MyCart.locator("h3");
    this.checkoutButton = page.getByRole("button", { name: "Checkout" });
  }
  async checkProducInCart(productName) {
    await expect(this.cartProduct).toContainText(productName);
  }
  async clickCheckoutButton() {
    this.checkoutButton.click();
  }
}
