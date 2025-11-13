const { test, expect } = require('@playwright/test');

test('basic calculation flow', async ({ page }) => {
  // open your frontend page (if frontend is served separate adjust path)
  await page.goto('/');
  await page.click('button:has-text("1")');
  await page.click('button:has-text("+")');
  await page.click('button:has-text("2")');
  await page.click('button:has-text("=")');
  // check display value
  const value = await page.$eval('#display', el => el.value);
  expect(value).toBe('3');
});
