// playwright.config.js
module.exports = {
  timeout: 10000, // maksymalny czas trwania testu (10s)
  retries: 2,     // powtórz test w razie niepowodzenia
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000', // poprawny frontend
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
};
