import { useGetAllProducts } from "@/services/productServices";
import ProductLists from "../ProductLists";
import { render, screen, waitFor } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import dialogReducer from "@/lib/features/dialog/dialogSlice";
import filterReducer from "@/lib/features/filter/filerSlice";
import userReducer from "@/lib/features/user/userSlice";
import cartReducer from "@/lib/features/cart/cartSlice";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { useGetAllCategory } from "@/services/categoryServices";
import { useAppSelector } from "@/lib/hooks";
import { CategoryDTO } from "@/types";
import dayjs from "dayjs";
const mockPush = jest.fn();
const mockDispatch = jest.fn();

jest.mock("@/services/productServices", () => ({
  useGetAllProducts: jest.fn(),
}));
jest.mock("@/services/categoryServices", () => ({
  useGetAllCategory: jest.fn(),
}));

jest.mock("@/lib/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(),
}));

jest.mock("next-cloudinary", () => ({
  CldImage: () => <div>Mock Image</div>,
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
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

describe("Render ProductLists", () => {
  it("should render product list", async () => {
    (useGetAllProducts as jest.Mock).mockReturnValue({
      data: {
        data: {
          products: [
            {
              id: "1",
              name: "Test Product",
              title: "test product title",
              categoryName: "Test Category",
              images: [{ url: "test.jpg" }],
              variants: [{ price: 19.99 }, { price: 29.99 }],
            },
            {
              id: "2",
              name: "T-shirt",
              title: "t-shirt it so soft",
              categoryName: "Test Category2",
              images: [{ url: "test.jpg" }],
              variants: [{ price: 19.99 }, { price: 29.99 }],
            },
          ],
        },
      },
      isLoading: false,
      isError: false,
    });
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
    RenderWithProvider(<ProductLists />);

    await waitFor(() => {
      expect(screen.getByText("Customers also purchased")).toBeInTheDocument();
      expect(screen.getByText("Test Product")).toBeInTheDocument();
      expect(screen.getByText("test product title")).toBeInTheDocument();
      expect(screen.getByText("T-shirt")).toBeInTheDocument();
      expect(screen.getByText("t-shirt it so soft")).toBeInTheDocument();
    });
  });
  it("should render product it empty", async () => {
    (useGetAllProducts as jest.Mock).mockReturnValue({
      data: {
        data: {
          products: [],
        },
      },
      isLoading: false,
      isError: false,
    });
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
    RenderWithProvider(<ProductLists />);

    await waitFor(() => {
      expect(screen.getByText("Customers also purchased")).toBeInTheDocument();
      expect(screen.queryByText("SALE")).not.toBeInTheDocument();
      expect(screen.queryByText("name")).not.toBeInTheDocument();
      expect(screen.queryByText("title")).not.toBeInTheDocument();
    });
  });
});
