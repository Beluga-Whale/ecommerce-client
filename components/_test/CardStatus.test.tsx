import { render, screen } from "@testing-library/react";
import CardStatus from "../CardStatus";

const mockDispatch = jest.fn();
jest.mock("@/lib/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(),
}));

describe("CardStatus", () => {
  it("Render CardStatus Success", () => {
    render(<CardStatus order={1} statusTitle="Paid" />);

    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/paid/i)).toBeInTheDocument();
  });
});
