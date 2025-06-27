import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import BookmarkCard from "../../Bookmarks/BookmarkCard";
import { MemoryRouter } from "react-router-dom";

const dummyUser = {
  id: 0,
  name: "Dummy User",
  bookmarkedCourseIds: ["CS2030S"],
};

vi.mock("@/components/my-hooks/UserProfileContext", () => ({
  useUserProfile: () => ({
    userProfile: dummyUser,
    toggleBookmark: vi.fn(),
    refetchUserProfile: vi.fn(),
    setUserProfile: vi.fn(),
  }),
}));

afterEach(() => {
  cleanup();
});

describe("BookmarkCard", () => {
  test("Renders the correct Bookmark card when the course is not taken", () => {
    const course = {
      moduleCode: "CS2040S",
      title: "Data Structures and Algorithms",
      description: "This is a dummy text",
      moduleCredit: "4",
    };

    render(
      <MemoryRouter>
        <BookmarkCard courseInfo={course} />
      </MemoryRouter>
    );

    expect(screen.getByText("CS2040S")).not.toBeNull();
    expect(screen.getByText("Data Structures and Algorithms")).not.toBeNull();
    expect(screen.getByText("This is a dummy text")).not.toBeNull();
    expect(screen.getByText("4 MCs")).not.toBeNull();

    expect(screen.getByRole("button").textContent).toBe("☆ Bookmark");
  });

  test("Renders the correct Bookmark card when the course is taken", () => {
    const course = {
      moduleCode: "CS2030S",
      title: "Programming Methodology II",
      description: "This is a dummy text",
      moduleCredit: "4",
    };

    render(
      <MemoryRouter>
        <BookmarkCard courseInfo={course} />
      </MemoryRouter>
    );

    expect(screen.getByText("CS2030S")).not.toBeNull();
    expect(screen.getByText("Programming Methodology II")).not.toBeNull();
    expect(screen.getByText("This is a dummy text")).not.toBeNull();
    expect(screen.getByText("4 MCs")).not.toBeNull();

    expect(screen.getByRole("button").textContent).toBe("★ Bookmarked");
  });
});
