import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test } from "vitest";
import RatingCard from "../../Ratings/RatingCard";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

describe("RatingCard", () => {
  test("User can click star to rate the course", async () => {
    render(<RatingCard courseName="CS2100" />);

    // No valid rating, returning 15 outline stars
    const starOutlines = screen.getAllByTestId("StarOutlineIcon");
    expect(starOutlines.length).toBe(15);

    await userEvent.click(starOutlines[0]);

    const stars = screen.getAllByTestId("StarIcon");
    expect(stars.length).toBe(1);

    userEvent.click(stars[0]);
    await userEvent.unhover(stars[0]);
    const updatedOutlines = screen.getAllByTestId("StarOutlineIcon");
    expect(updatedOutlines.length).toBe(15);
  });

  test("Stars will lit up when the user hovers on the icon", async () => {
    render(<RatingCard courseName="CS2030S" />);

    const starOutlines = screen.getAllByTestId("StarOutlineIcon");

    await userEvent.hover(starOutlines[4]);

    const hoveredStarOutlines = screen.getAllByTestId("StarOutlineIcon");
    expect(hoveredStarOutlines.length).toBe(10);

    const hoveredStarIcons = screen.getAllByTestId("StarIcon");
    await userEvent.unhover(hoveredStarIcons[4]);
    const unhoveredStarOutlines = screen.getAllByTestId("StarOutlineIcon");
    expect(unhoveredStarOutlines.length).toBe(15);
  });
});
