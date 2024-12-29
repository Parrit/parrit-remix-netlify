import { test, expect } from "@playwright/test";

test("visits the app", async ({ page }) => {
  await page.goto("/");
  const title = await page.title();
  expect(title).toBe("Parrit");
});
