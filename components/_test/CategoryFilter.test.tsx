import { render, screen } from "@testing-library/react";
import CategoryFilter from "../CategoryFilter";

jest.mock("@/services/categoryServices", () => ({
  useGetAllCategory: jest.fn(),
}));

describe("CardStatus", () => {
  it("Render CardStatus Success", () => {
    render(<CategoryFilter />);

    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/paid/i)).toBeInTheDocument();
  });
});
