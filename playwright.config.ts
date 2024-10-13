import { type PlaywrightTestConfig, defineConfig, devices } from '@playwright/test';

/** https://playwright.dev/docs/test-configuration */
const config: PlaywrightTestConfig = {
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: true,
  workers: 2,
  retries: 1,
  reporter: 'github',
  webServer: {
    timeout: 30000,
    command: 'pnpm dev --port 3000',
    url: 'http://localhost:3000',
    reuseExistingServer: false,
    stdout: 'pipe',
    stderr: 'pipe',
  },
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
};

// Override config for local development
if (!process.env.CI) {
  config.workers = 1;
  config.retries = 0;
  config.reporter = 'html';
  config.forbidOnly = false;

  if (config.use) {
    config.use.trace = 'on';
  }

  if (config.webServer && 'reuseExistingServer' in config.webServer) {
    config.webServer.reuseExistingServer = true;
  }

  config.projects = [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ];
}

export default defineConfig(config);
