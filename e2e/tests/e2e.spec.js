import { test, expect } from '@playwright/test';

test.describe.configure({ retries: 2 });

test('basic calculation flow', async ({ page }) => {
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

  await page.goto(process.env.BASE_URL);

  await page.click('text=1');
  await page.click('text=+');
  await page.click('text=2');
  await page.click('text==');

  await page.waitForTimeout(1000);

  const value = await page.$eval('#display', el => el.value.trim());

  expect(value).toBe('3');
});
