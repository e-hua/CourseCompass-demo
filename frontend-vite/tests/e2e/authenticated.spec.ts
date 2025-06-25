import { test, expect } from "@playwright/test";

// Run this by typing this command in the terminal :
// npx playwright test tests/e2e/authenticated.spec.ts

test.describe("Authenticated test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await page.getByRole("button", { name: "Login" }).click();
  });

  test("Users are able to view their profile after login", async ({ page }) => {
    await expect(page.getByText("UserName: Test User")).toHaveCount(1);
    await expect(page.getByText("UserName: Test User")).toBeVisible();
  });

  test("Users are not able to view their profile after logout", async ({
    page,
  }) => {
    await expect(page.getByRole("button", { name: "Logout" })).toHaveCount(1);
    await page.getByRole("button", { name: "Logout" }).click();
    await expect(page.getByText("UserName: Test User")).toHaveCount(0);
  });
});
