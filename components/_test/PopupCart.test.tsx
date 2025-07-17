import { act, render, screen, waitFor } from "@testing-library/react";
import dialogReducer from "@/lib/features/dialog/dialogSlice";
import filterReducer from "@/lib/features/filter/filerSlice";
import userReducer from "@/lib/features/user/userSlice";
import cartReducer from "@/lib/features/cart/cartSlice";
import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import PopupCart from "../PopupCart";
import { getProductID } from "@/services/api/productsApi";
import userEvent from "@testing-library/user-event";
const mockPush = jest.fn();

jest.mock("@/services/api/productsApi", () => ({
  getProductID: jest.fn(),
}));

jest.mock("@/services/productServices", () => ({
  useGetAllProducts: jest.fn(),
}));

jest.mock("next-cloudinary", () => ({
  CldImage: () => <div>Mock Image</div>,
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockCart = {
  cartList: [
    {
      productId: 1,
      variant: [
        { variantId: 101, quantity: 2 },
        { variantId: 102, quantity: 1 },
      ],
    },
  ],
  addressDetail: null,
  priceTotal: 999,
};

const mockProduct = {
  id: 1,
  name: "Mock T-shirt",
  salePrice: 10,
  images: [{ url: "mock.jpg" }],
  variants: [
    { variantID: 101, price: 100, size: "M" },
    { variantID: 102, price: 200, size: "L" },
  ],
};
const RenderWithProvider = (children: React.ReactNode) => {
  const store = configureStore({
    reducer: {
      dialog: dialogReducer,
      filter: filterReducer,
      cart: cartReducer,
      user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    preloadedState: {
      cart: mockCart,
    },
  });
  const queryClient = new QueryClient();
  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};

describe("Render PopupCart", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders items and calculates total", async () => {
    (getProductID as jest.Mock).mockResolvedValue({ data: mockProduct });

    await act(async () => {
      RenderWithProvider(<PopupCart />);
    });

    const cartButton = screen.getByRole("button");
    await act(async () => {
      await userEvent.click(cartButton);
    });

    await waitFor(() => {
      expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
      expect(screen.getByText("Size: M")).toBeInTheDocument();
      expect(screen.getByText("Size: L")).toBeInTheDocument();
      expect(screen.getByText("Quantity: 2")).toBeInTheDocument();
      expect(screen.getByText("Quantity: 1")).toBeInTheDocument();
      expect(screen.getByText(/Order\(\$370.00\)/)).toBeInTheDocument();
    });
  });
  it("renders remove item and calculates total", async () => {
    (getProductID as jest.Mock).mockResolvedValue({ data: mockProduct });
    await act(async () => {
      RenderWithProvider(<PopupCart />);
    });

    const cartButton = screen.getByRole("button");
    await act(async () => {
      await userEvent.click(cartButton);
    });

    const removeItem = screen.getAllByLabelText("remove");
    await act(async () => {
      await userEvent.click(removeItem[0]);
    });

    await waitFor(() => {
      expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
      expect(screen.getByText("Size: L")).toBeInTheDocument();
      expect(screen.getByText("Quantity: 1")).toBeInTheDocument();

      expect(screen.getByText(/Order\(\$190.00\)/)).toBeInTheDocument();
    });
  });
});
