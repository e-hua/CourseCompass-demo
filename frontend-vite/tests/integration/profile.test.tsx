// boundary test
// checks if the user profile update handles edge cases correctly, 
// such as when the username exceeds the maximum length, contains special characters,
// or the major field is not selected.

//this version is similar to e2e tests
/*
import { screen, fireEvent } from "@testing-library/react";
import { test, expect } from "@playwright/test";

test.describe("Boundary Test for updating user profile", () => {
  test("Shows error toast when username exceeds 30 characters", async ({ page }) => {

    await page.goto("http://localhost:5173/");
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByRole("button", { name: "Edit Profile" }).click();

    const longName = "x".repeat(31);
    fireEvent.change(screen.getByLabelText(/User Name/i), {
      target: { value: longName },
    });

    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    await expect(page.getByText("Name must not be longer than 30 characters.")).toBeVisible();
  });
});
*/

//another version of the boundary test
/*
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, beforeAll, afterEach, afterAll } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import App from "../../src/App";
import { Toaster } from "sonner";
import "@testing-library/jest-dom/vitest";

const API_URL = "http://localhost:8080/api/auth/login";

const server = setupServer(
  http.get(API_URL, () => {
    return HttpResponse.json({
      userName: "test-user",
      email: "test@example.com",
      currentSemesterIndex: 1,
      major: "CS",
    });
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Boundary Profile Test", () => {
  test("should show toast when username exceeds 30 characters", async () => {

    render(
      <>
        <Toaster />
        <App />
      </>
    );

    fireEvent.click(screen.getByRole("button", { name: "Edit Profile" }));
    const longName = "x".repeat(31);
    fireEvent.change(screen.getByLabelText(/User Name/i), {
      target: { value: longName },
    });
    fireEvent.click(screen.getByRole("button", { name: /Save/i }));
    await waitFor(() => {
      expect(screen.getByText("Name must not be longer than 30 characters.")).toBeVisible();
    });
  });
});
*/