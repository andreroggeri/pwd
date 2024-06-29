import { test, expect } from "@playwright/test";

test("demo", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  await expect(page).toHaveTitle("Playwright");
});
