import { type Page } from '@playwright/test';

/**
 * Creates a list of default todo items.
 * @param page The Playwright page object.
 * @param items The array of todo item strings to create.
 */
export async function createTodos(page: Page, items: readonly string[]) {
  const newTodo = page.getByPlaceholder('What needs to be done?');
  for (const item of items) {
    await newTodo.fill(item);
    await newTodo.press('Enter');
  }
}

export async function checkNumberOfTodosInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction(e => {
    return JSON.parse(localStorage['react-todos']).length === e;
  }, expected);
}

export async function checkNumberOfCompletedTodosInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction(e => {
    return JSON.parse(localStorage['react-todos']).filter((todo: any) => todo.completed).length === e;
  }, expected);
}

export async function checkTodosInLocalStorage(page: Page, title: string) {
  return await page.waitForFunction(t => {
    return JSON.parse(localStorage['react-todos']).map((todo: any) => todo.title).includes(t);
  }, title);
}
