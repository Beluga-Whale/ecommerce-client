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

describe("CardReview ", () => {
  it("render correct", () => {
    render(<CardReview reviewAll={mockReview} />);

    expect(screen.getByText(/4.2/i)).toBeInTheDocument();
    expect(screen.getByText(/30 reviews/i)).toBeInTheDocument();
  });
  it("handles reviewAll undefined", () => {
    render(<CardReview reviewAll={undefined} />);
    expect(screen.getByText("0.0")).toBeInTheDocument();
    expect(screen.getByText("0 reviews")).toBeInTheDocument();
  });
  it("handles data undefined", () => {
    render(
      <CardReview reviewAll={{ data: undefined, message: "", success: true }} />
    );
    expect(screen.getByText("0.0")).toBeInTheDocument();
    expect(screen.getByText("0 reviews")).toBeInTheDocument();
  });

  it("handles missing average", () => {
    const mock: ReviewAllProductSummaryApiResponse = {
      data: {
        average: undefined,
        total: 10,
        countPerStar: { 5: 5, 4: 3, 3: 2, 2: 0, 1: 0 },
        reviewList: [],
      },
      message: "",
      success: true,
    };
    render(<CardReview reviewAll={mock} />);
    expect(screen.getByText("0.0")).toBeInTheDocument();
    expect(screen.getByText("10 reviews")).toBeInTheDocument();
  });

  it("handles missing countPerStar", () => {
    const mock: ReviewAllProductSummaryApiResponse = {
      data: {
        average: 4.5,
        total: 5,
        countPerStar: undefined,
        reviewList: [],
      },
      message: "",
      success: true,
    };
    render(<CardReview reviewAll={mock} />);
    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(screen.getByText("5 reviews")).toBeInTheDocument();

    const stars = screen.getAllByTestId(/star-(filled|empty)/);
    expect(stars).toHaveLength(5);
  });

  it("renders correct star fill count for average 3.6", () => {
    const mock: ReviewAllProductSummaryApiResponse = {
      data: {
        average: 3.6,
        total: 20,
        countPerStar: { 5: 10, 4: 5, 3: 5, 2: 0, 1: 0 },
        reviewList: [],
      },
      message: "",
      success: true,
    };
    render(<CardReview reviewAll={mock} />);
    const filledStars = screen.getAllByTestId("star-filled");
    const emptyStars = screen.getAllByTestId("star-empty");

    expect(filledStars).toHaveLength(3);
    expect(emptyStars).toHaveLength(2);
  });
});
