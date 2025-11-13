module.exports = {
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...this.use,
        // przekazanie zmiennej do testów
        env: {
          BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:5000',
        },
      },
    },
  ],
};
