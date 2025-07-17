import { render, screen, waitFor } from "@testing-library/react";
import CategoryFilter from "../CategoryFilter";
import { configureStore } from "@reduxjs/toolkit";
import dialogReducer from "@/lib/features/dialog/dialogSlice";
import filterReducer, {
  setCategoryFilter,
} from "@/lib/features/filter/filerSlice";
import cartReducer from "@/lib/features/cart/cartSlice";
import userReducer from "@/lib/features/user/userSlice";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { useGetAllCategory } from "@/services/categoryServices";
import { CategoryDTO } from "@/types";
import dayjs from "dayjs";
import userEvent from "@testing-library/user-event";
import { useGetAllProducts } from "@/services/productServices";
import { useAppSelector } from "@/lib/hooks";

const mockPush = jest.fn();
const mockDispatch = jest.fn();

jest.mock("@/lib/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@/services/categoryServices", () => ({
  useGetAllCategory: jest.fn(),
}));
jest.mock("@/services/productServices", () => ({
  useGetAllProducts: jest.fn(),
}));

const mockCategory: CategoryDTO[] = [
  {
    ID: 1,
    Name: "T-shirt",
    Slug: "t-shirt",
    CreatedAt: dayjs().toISOString(),
    UpdatedAt: dayjs().toISOString(),
    DeletedAt: null,
  },
];
const mockProducts = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  title: "Nice shirt",
  description: "",
  categoryID: 1,
  categoryName: "T-shirt",
  images: [{ url: "test-image.jpg" }],
  isFeatured: false,
  isOnSale: false,
  variants: [{ variantID: 1, size: "S", stock: 10, price: 100, sku: "" }],
  salePrice: 0,
}));

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
      filter: {
        category: [],
        size: [],
      },
    },
  });
  const queryClient = new QueryClient();
  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};

describe("Categoryfilter", () => {
  it("Render category filter success", async () => {
    (useGetAllCategory as jest.Mock).mockReturnValue({
      data: { data: mockCategory },
      isLoading: false,
      isError: false,
    });
    (useAppSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        filter: {
          category: [],
          size: [],
        },
      })
    );

    (useGetAllProducts as jest.Mock).mockReturnValue({
      data: { data: mockProducts },
      isLoading: false,
      isError: false,
    });

    RenderWithProvider(<CategoryFilter />);

    expect(screen.getByText(/Filters/i)).toBeInTheDocument();
    expect(screen.getByText(/Category/i)).toBeInTheDocument();

    // NOTE -กด Category เพื่อเปิดมาดูว่ามีCategoryอะไรบ้าง

    const openCategory = screen.getByRole("button", { name: /category/i });
    userEvent.click(openCategory);

    const openSize = screen.getByRole("button", { name: /size/i });
    userEvent.click(openSize);

    await waitFor(() => {
      expect(screen.getByText("T-shirt")).toBeInTheDocument();
      expect(screen.getByText("S")).toBeInTheDocument();
    });
  });
  it("call dispatch when checkbox clicked", async () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        filter: {
          category: [],
          size: [],
        },
      })
    );
    (useGetAllCategory as jest.Mock).mockReturnValue({
      data: { data: mockCategory },
      isLoading: false,
      isError: false,
    });

    (useGetAllProducts as jest.Mock).mockReturnValue({
      data: { data: mockProducts },
      isLoading: false,
      isError: false,
    });

    RenderWithProvider(<CategoryFilter />);

    const categoryToggle = screen.getByRole("button", { name: /category/i });
    await waitFor(() => userEvent.click(categoryToggle));

    const checkbox = screen.getByRole("checkbox", { name: /T-shirt/i });
    await waitFor(() => userEvent.click(checkbox));

    expect(mockDispatch).toHaveBeenCalledWith(setCategoryFilter(["1"]));
  });
});
