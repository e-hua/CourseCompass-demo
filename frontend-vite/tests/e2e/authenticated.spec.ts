import { test, expect } from "@playwright/test";

// Run this by typing this command in the terminal :
// npx playwright test tests/e2e/authenticated.spec.ts

test.describe("Authenticated test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await page.getByRole("button", { name: "Login" }).click();
  });

  test("Users should be able to view their profile after login", async ({
    page,
  }) => {
    await expect(page.getByText("UserName: Test User")).toHaveCount(1);
    await expect(page.getByText("UserName: Test User")).toBeVisible();
    await expect(page.getByText("Email: coursecompasstest@")).toBeVisible();
  });

  test("Users should not be able to view their profile after logout", async ({
    page,
  }) => {
    await expect(page.getByRole("button", { name: "Logout" })).toHaveCount(1);
    await page.getByRole("button", { name: "Logout" }).click();
    await expect(page.getByText("UserName: Test User")).toHaveCount(0);
  });

  test("Users should be able to add taken courses, and view them on the academic page", async ({
    page,
  }) => {
    await page.getByPlaceholder("Search...").click();
    await page.getByPlaceholder("Search...").fill("CS1101S");
    await page.getByPlaceholder("Search...").press("Enter");
    await page.getByRole("button", { name: "Add" }).click();
    await page
      .getByRole("combobox")
      .filter({ hasText: "Select semester" })
      .click();
    await page.getByRole("option", { name: "Y1S1" }).click();
    await page
      .getByRole("combobox")
      .filter({ hasText: "Select letter grade" })
      .click();
    await page.getByRole("option", { name: "A", exact: true }).click();
    await page.getByRole("button", { name: "Submit" }).click();
    await page.locator(".data-\\[state\\=open\\]\\:animate-in").first().click();
    await expect(page.getByText("Successfully added CS1101S!")).toBeVisible();
    await page.getByRole("link", { name: "My Academic Plan" }).click();
    await expect(page.getByRole("link", { name: "CS1101S" })).toBeVisible();
    await page.getByTestId("rf__node-CS1101S").locator("div").first().click();
    await expect(page).toHaveURL("http://localhost:5173/courses/CS1101S");
    await page.getByPlaceholder("Search...").click();
    await page.getByPlaceholder("Search...").fill("CS1101S");
    await page.getByRole("option", { name: "CS1101S Programming" }).click();
    await page
      .getByRole("button", { name: "Remove CS1101S from Taken" })
      .click();
    await page.locator(".data-\\[state\\=open\\]\\:animate-in").first().click();
    await expect(page.getByText("Course deleted from Taken")).toBeVisible();
    await page.getByRole("link", { name: "My Academic Plan" }).click();
    await expect(page.getByRole("link", { name: "CS1101S" })).toHaveCount(0);
  });

  test("Users should be able to add bookmarks, and view them on the bookmarks page", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Courses" }).click();
    await page.getByRole("textbox").click();
    await page.getByRole("textbox").fill("CS1101S");
    await page.getByText("CS1101SProgramming").click();
    await page.getByRole("button", { name: "☆ Bookmark" }).click();
    await expect(page.getByText("CS1101S has been added to")).toBeVisible();
    await page.getByRole("link", { name: "My Bookmarks" }).click();
    await expect(page.getByText("CS1101SProgramming")).toBeVisible();
    await page.getByText("Programming Methodology").click();
    await page.getByRole("button", { name: "★ Bookmarked" }).click();
    await expect(page.getByText("CS1101S has been removed from")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "☆ Bookmark" })
    ).toBeVisible();
  });

  /*
  test("Users should be able to leave comment on specific courses", async ({
    page,
  }) => {});
*/
});
