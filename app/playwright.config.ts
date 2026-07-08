import { defineConfig, devices } from "@playwright/test"

const frontendPort = 3100
const apiPort = 4100
const baseURL = `http://localhost:${frontendPort}`
const apiURL = `http://localhost:${apiPort}`

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  webServer: [
    {
      command: `PORT=${apiPort} WEB_ORIGIN=${baseURL} npm run dev`,
      cwd: "../api",
      url: `${apiURL}/health`,
      reuseExistingServer: !process.env.CI,
      timeout: 30_000,
    },
    {
      command: `NEXT_PUBLIC_API_URL=${apiURL} npm run dev -- -p ${frontendPort}`,
      url: baseURL,
      reuseExistingServer: !process.env.CI,
      timeout: 30_000,
    },
  ],
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
})
