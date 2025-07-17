import { render, screen } from "@testing-library/react";
import CardStatus from "../CardStatus";

describe("CardStatus", () => {
  it("Render CardStatus Success", () => {
    render(<CardStatus order={1} statusTitle="Paid" />);

    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/paid/i)).toBeInTheDocument();
  });
});
