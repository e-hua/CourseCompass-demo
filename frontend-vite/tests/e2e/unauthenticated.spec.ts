import { test, expect } from "@playwright/test";

//To run all test cases, use npm run test:e2e

test.describe("Unauthenticated test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("Unauthenticated users are expected to be prompted to login", async ({
    page,
  }) => {
    await expect(page.getByText("You're not logged inPlease")).toBeVisible();
    await page.getByRole("link", { name: "Analysis" }).click();
    await expect(page.getByText("You're not logged inPlease")).toBeVisible();
    await page.getByRole("link", { name: "My Academic Plan" }).click();
    await expect(page.getByText("You're not logged inPlease")).toBeVisible();
    await page.getByRole("link", { name: "Rate My Course" }).click();
    await expect(page.getByText("You're not logged inPlease")).toBeVisible();
  });

  test("Unauthenticated users are expected to be able to browse course previews", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/courses");
    await expect(page.getByText("ABM5001Leadership in")).toBeVisible();
  });

  test("Unauthenticated users are expected to be able to sort/filter course previews", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/courses");
    await expect(page.getByText("ABM5001Leadership in")).toBeVisible();
    await page.getByRole("button", { name: "Filter" }).first().click();
    await page.getByRole("checkbox", { name: "Only show SU-eligible" }).click();
    await page.getByRole("button", { name: "Apply" }).click();
    await expect(page.getByText("Rating")).not.toHaveCount(1);
    await expect(page.getByText("ABM5001Leadership in")).toHaveCount(0);
    await page.getByRole("button", { name: "Reset" }).click();
    await page.getByRole("button", { name: "Apply" }).click();
    await expect(page.getByText("ABM5001Leadership in")).toHaveCount(1);

    await page.getByText("Sort").click();
    await page.getByRole("combobox").filter({ hasText: "None" }).click();
    await page.getByLabel("Workload").getByText("Workload").click();
    await page.getByRole("button", { name: "Apply" }).click();
    await expect(page.getByText("Rating")).toHaveCount(1);
  });

  test("Unauthenticated users are expected to be able to search and view detailed courses", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/courses");
    await page.getByRole("textbox").click();
    await page.getByRole("textbox").fill("CS2030S");
    await expect(page.getByText("CS2030SProgramming")).toBeVisible();
    await page.getByText("CS2030SProgramming").click();
    await expect(page).toHaveURL("http://localhost:5173/courses/CS2030S");
    await expect(
      page.getByRole("heading", { name: "Programming Methodology II" })
    ).toBeVisible();
  });

  test("Unauthenticated users are expected to be able to browse course comments & replies", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/courses");
    await page.getByText("ABM5001Leadership in").click();

    await expect(
      page.getByText("JJohndummy@example.comGrade: A+")
    ).toBeVisible();

    await expect(
      page
        .locator("div")
        .filter({ hasText: /^This is a dummy message$/ })
        .first()
    ).toBeVisible();

    await expect(
      page
        .locator("div")
        .filter({
          hasText: /^Thanks for the comment! This is a dummy reply\.$/,
        })
        .first()
    ).toBeVisible();
  });

  test("Unauthenticated users should not be able to post comments or replies", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/courses");
    await page.getByText("ABM5001Leadership in").click();
    await page.getByRole("button", { name: "Reply" }).first().click();
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(
      page
        .getByRole("region", { name: "Notifications alt+T" })
        .getByRole("listitem")
    ).toBeVisible();
    await expect(
      page
        .getByRole("region", { name: "Notifications alt+T" })
        .getByRole("listitem")
    ).toHaveCount(0);
    await page.getByRole("button", { name: "Reply" }).nth(1).click();
    await page.getByRole("button", { name: "Submit" }).nth(1).click();
    await expect(
      page
        .getByRole("region", { name: "Notifications alt+T" })
        .getByRole("listitem")
    ).toBeVisible();
  });
});
