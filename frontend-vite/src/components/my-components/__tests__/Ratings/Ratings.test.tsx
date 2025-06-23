import { render, screen } from "@testing-library/react";
import Ratings from "../../Ratings/Ratings";
import { describe, expect, test } from "vitest";

describe("Ratings", () => {
  test("Renders correct number of filled stars according to the given index on mount", () => {
    render(<Ratings existingIndex={3} onChange={() => {}} />);

    const filledStars = screen.getAllByTestId("StarIcon");
    expect(filledStars).toHaveLength(3);
  });
});
