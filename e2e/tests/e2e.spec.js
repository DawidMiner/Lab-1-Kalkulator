import { test, expect } from '@playwright/test';

// 🔁 Pozwala Playwrightowi spróbować ponownie, jeśli pierwszy test się nie uda (np. backend jeszcze się uruchamia)
test.describe.configure({ retries: 2 });

test('basic calculation flow', async ({ page }) => {
  // 🔍 Logowanie wiadomości z konsoli przeglądarki (pomoże w debugowaniu błędów z frontendu/backendu)
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

  // 🌐 Wejdź na stronę frontendu
  await page.goto(process.env.BASE_URL);

  // 🧮 Symulacja kliknięć użytkownika
  await page.click('text=1');
  await page.click('text=+');
  await page.click('text=2');
  await page.click('text==');

  // ⏳ Czekamy chwilę, aż backend odpowie (Flask może potrzebować sekundy)
  await page.waitForTimeout(1000);

  // 🔢 Pobieramy wartość z pola wyświetlacza
  const value = await page.$eval('#display', el => el.value.trim());

  // ✅ Sprawdzamy, czy wynik to 3
  expect(value).toBe('3');
});
