import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import dialogReducer from "@/lib/features/dialog/dialogSlice";
import filterReducer from "@/lib/features/filter/filerSlice";
import cartReducer from "@/lib/features/cart/cartSlice";
import userReducer from "@/lib/features/user/userSlice";
import Pagination from "../Pagination";
import userEvent from "@testing-library/user-event";

const mockSetCurrentPage = jest.fn();

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

describe("Pagination", () => {
  it("When Click Next", async () => {
    RenderWithProvider(
      <Pagination
        setCurrentPage={mockSetCurrentPage}
        currentPage={1}
        totalPage={2}
      />
    );
    const clickNext = screen.getAllByRole("button", { name: /next/i });
    await userEvent.click(clickNext[1]);
    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
  });
  it("When Click Previous", async () => {
    RenderWithProvider(
      <Pagination
        setCurrentPage={mockSetCurrentPage}
        currentPage={2}
        totalPage={2}
      />
    );
    const clickPrevious = screen.getAllByRole("button", { name: /previous/i });
    await userEvent.click(clickPrevious[0]);
    expect(mockSetCurrentPage).toHaveBeenCalledWith(1);
  });
  it("When Click IndexNumber", async () => {
    RenderWithProvider(
      <Pagination
        setCurrentPage={mockSetCurrentPage}
        currentPage={2}
        totalPage={2}
      />
    );
    const page1 = screen.getByLabelText("page-1");
    await userEvent.click(page1);
    expect(mockSetCurrentPage).toHaveBeenCalledWith(1);
  });
});
