export class LoginPage {
  constructor(page) {
    this.page = page;
    this.url = "https://rahulshettyacademy.com/client/auth/login";
    this.userNameInput = page.locator("#userEmail");
    this.passwordInput = page.locator("#userPassword");
    this.loginButton = page.locator("#login");
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async login(username, password) {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
