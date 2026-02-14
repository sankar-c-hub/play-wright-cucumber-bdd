import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false,
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'on-first-retry'
  }
});

