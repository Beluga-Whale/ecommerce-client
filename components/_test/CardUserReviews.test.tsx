import { render, screen } from "@testing-library/react";
import CardUserReviews from "../CardUserReviews";
import { ReviewItem } from "@/types";
import dayjs from "dayjs";

const mockDispatch = jest.fn();
jest.mock("@/lib/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(),
}));

const itemMock: ReviewItem = {
  firstName: "TestName",
  lastName: "TestLast",
  productId: 1,
  rating: 4,
  comment: "GOOD",
  avatar: "Mock",
  created_at: dayjs(),
};

describe("CardStatus", () => {
  it("Render CardStatus Success", () => {
    render(<CardUserReviews item={itemMock} />);

    expect(screen.getByText(/testname testlast/i)).toBeInTheDocument();
    expect(screen.getByText(/good/i)).toBeInTheDocument();
  });
});
