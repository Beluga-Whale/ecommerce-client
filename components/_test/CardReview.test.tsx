import { ReviewAllProductSummaryApiResponse } from "@/types";
import { render, screen } from "@testing-library/react";
import CardReview from "../CardReview";

const mockReview: ReviewAllProductSummaryApiResponse = {
  data: {
    average: 4.2,
    total: 30,
    countPerStar: { 5: 20, 4: 8, 3: 2, 2: 0, 1: 0 },
    reviewList: Array(30).fill({}),
  },
  message: "ok",
  success: true,
};

const mockReviewAvg: ReviewAllProductSummaryApiResponse = {
  data: {
    average: 0,
    total: 30,
    countPerStar: { 5: 20, 4: 8, 3: 2, 2: 0, 1: 0 },
    reviewList: Array(30).fill({}),
  },
  message: "ok",
  success: true,
};
const mockReviewTotal: ReviewAllProductSummaryApiResponse = {
  data: {
    average: 4.2,
    total: 0,
    countPerStar: { 5: 20, 4: 8, 3: 2, 2: 0, 1: 0 },
    reviewList: Array(30).fill({}),
  },
  message: "ok",
  success: true,
};

describe("CardReview ", () => {
  it("render correct", () => {
    render(<CardReview reviewAll={mockReview} />);

    expect(screen.getByText(/4.2/i)).toBeInTheDocument();
    expect(screen.getByText(/30 reviews/i)).toBeInTheDocument();
  });
  it("Avg is 0", () => {
    render(<CardReview reviewAll={mockReviewAvg} />);

    // expect(screen.getByText(/0/i)).toBeInTheDocument();
    // expect(screen.getByText(/30 reviews/i)).toBeInTheDocument();
  });
  //   it("Total is 0", () => {
  //     render(<CardReview reviewAll={mockReviewTotal} />);

  //     expect(screen.getByText(/0/i)).toBeInTheDocument();
  //   });
});
