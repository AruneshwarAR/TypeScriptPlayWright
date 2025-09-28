// @ts-check
import { defineConfig, devices } from "@playwright/test";

// Load env early if tests need it
// import 'dotenv/config'; // or:
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000, // test-level timeout (affects teardown budget)
  fullyParallel: false, // temporarily disable while stabilizing
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2, // lower local concurrency while debugging
  reporter: "html",
  use: {
    headless: false,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    actionTimeout: 5_000, // per-action, separate from test timeout
    navigationTimeout: 30_000, // per-navigation timeout
    expect: { timeout: 5_000 },
  },
  projects: [
    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
    // Optionally try built-in Chromium if channel behavior causes issues:
    // { name: 'chromium', use: { ...devices['Desktop Chrome'], channel: 'chromium' } },
  ],
});
