import { useGetAllProducts } from "@/services/productServices";
import { render, screen, waitFor } from "@testing-library/react";
import NewArrivals from "../NewArrivals";

jest.mock("@/services/productServices", () => ({
  useGetAllProducts: jest.fn(),
}));

jest.mock("next-cloudinary", () => ({
  CldImage: () => <div>Mock Image</div>,
}));

describe("Render NewArrivals", () => {
  it("should render NewArrivals", async () => {
    (useGetAllProducts as jest.Mock).mockReturnValue({
      data: {
        data: {
          products: [
            {
              id: "1",
              name: "Test Product",
              categoryName: "Test Category",
              images: [{ url: "test.jpg" }],
            },
          ],
        },
      },
      isLoading: false,
      isError: false,
    });

    render(<NewArrivals />);

    await waitFor(() => {
      expect(screen.getByText("New Arrivals")).toBeInTheDocument();
      expect(screen.getByLabelText("categoryName")).toBeInTheDocument();
    });
  });
  it("should render empty product", async () => {
    (useGetAllProducts as jest.Mock).mockReturnValue({
      data: {
        data: undefined,
      },
      isLoading: false,
      isError: false,
    });

    render(<NewArrivals />);

    await waitFor(() => {
      expect(screen.getByText("New Arrivals")).toBeInTheDocument();
      expect(screen.queryByLabelText("categoryName")).not.toBeInTheDocument();
    });
  });
});
