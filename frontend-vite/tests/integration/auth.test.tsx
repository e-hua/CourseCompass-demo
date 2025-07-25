//negative test
//When sending an invalid token(expired or faked) to mocked backend, 
//it should return a 401 status code with an error message.
/*
import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, beforeAll, afterEach, afterAll } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import App from "../../src/App";
import { Toaster } from "sonner";
import "@testing-library/jest-dom/vitest";

const API_URL = "http://localhost:8080/api/auth/login";

const server = setupServer(
  http.post(API_URL, async () => {
    return HttpResponse.json({ error: "Invalid token" }, { status: 401 });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Negative Login Test: Invalid Token", () => {
  test("should show toast and not log in when token is invalid", async () => {
    localStorage.setItem("id_token", "fake-invalid-token");

    window.location.hash = "#id_token=fake-invalid-token";

    render(
      <>
        <Toaster />
        <App />
      </>
    );

    await waitFor(() => {
      expect(screen.getByText(/login failed/i)).toBeVisible();
      expect(screen.getByText(/invalid token/i)).toBeVisible();
    });
  });
});
*/