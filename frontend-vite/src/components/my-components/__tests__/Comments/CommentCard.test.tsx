import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommentCard from "../../Comments/CommentCard";
import { describe, test, expect, afterEach } from "vitest";

const dummyComment = {
  id: 0,
  content: "This is a dummy comment",
  authorEmail: "Dummy@gmail",
  authorUsername: "John",
  courseCode: "",
  letterGrade: "A",
  difficulty: 0,
  averageWorkload: 0,
  enjoyability: 0,
  createdAt: "",
  updatedAt: "",
};

afterEach(() => {
  cleanup();
});

describe("CommentCard", () => {
  test("Shows textarea when Reply is clicked", async () => {
    render(<CommentCard comment={dummyComment} />);
    const user = userEvent.setup();

    expect(screen.queryByPlaceholderText("Type your reply here...")).toBeNull();

    await user.click(screen.getByRole("button", { name: /reply/i }));

    expect(
      screen.getByPlaceholderText("Type your reply here...")
    ).not.toBeNull();
  });

  test("Shows submit and cancel buttons when Reply is clicked", async () => {
    render(<CommentCard comment={dummyComment} />);
    const user = userEvent.setup();

    expect(screen.queryByPlaceholderText("Type your reply here...")).toBeNull();

    await user.click(screen.getByRole("button", { name: /reply/i }));

    expect(screen.getByRole("button", { name: /cancel/i })).not.toBeNull();
    expect(screen.getByRole("button", { name: /submit/i })).not.toBeNull();
  });

  test("Hides textarea when Cancel is clicked", async () => {
    render(<CommentCard comment={dummyComment} />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /reply/i }));
    expect(
      screen.getByPlaceholderText("Type your reply here...")
    ).not.toBeNull();

    await user.click(screen.getByRole("button", { name: /cancel/i }));
    expect(screen.queryByPlaceholderText("Type your reply here...")).toBeNull();
  });
});
