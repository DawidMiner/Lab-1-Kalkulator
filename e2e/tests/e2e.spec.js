import { test, expect } from '@playwright/test';

test('basic calculation flow', async ({ page }) => {
  // Wejdź na stronę frontendu
  await page.goto(process.env.BASE_URL);

  // Kliknięcia po tekście, bo przyciski nie mają ID
  await page.click('text=1');
  await page.click('text=+');
  await page.click('text=2');
  await page.click('text=='); // przycisk "="

  // Pobierz wartość z pola #display
  const value = await page.$eval('#display', el => el.value.trim());

  // Oczekujemy wyniku "3"
  expect(value).toBe('3');
});
