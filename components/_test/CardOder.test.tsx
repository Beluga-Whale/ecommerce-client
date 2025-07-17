import CardOrder from "@/components/CardOrder";
import { render, screen } from "@testing-library/react";
import { useGetOrderAllByUserId } from "@/services/orderService";
import dayjs from "dayjs";

const mockDispatch = jest.fn();
jest.mock("@/lib/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(),
}));

jest.mock("@/services/orderService", () => ({
  useGetOrderAllByUserId: jest.fn(),
}));

const mockOrders = [
  {
    orderID: 1,
    totalPrice: 100.0,
    status: "paid",
    itemCount: 2,
    createdAt: dayjs(),
  },
  {
    orderID: 2,
    totalPrice: 200.0,
    status: "shipped",
    itemCount: 4,
    createdAt: dayjs(),
  },
  {
    orderID: 3,
    totalPrice: 200.0,
    status: "pending",
    itemCount: 4,
    createdAt: dayjs(),
  },
  {
    orderID: 4,
    totalPrice: 200.0,
    status: "complete",
    itemCount: 4,
    createdAt: dayjs(),
  },
  {
    orderID: 5,
    totalPrice: 200.0,
    status: "cancel",
    itemCount: 4,
    createdAt: dayjs(),
  },
];

describe("CardActivity", () => {
  it("should render success", () => {
    (useGetOrderAllByUserId as jest.Mock).mockReturnValue({
      data: { data: mockOrders },
      isLoading: false,
      isError: false,
    });

    render(<CardOrder />);

    expect(screen.getByText(/my order history/i)).toBeInTheDocument();
    expect(screen.getByText(/order id: #1/i)).toBeInTheDocument();
    expect(screen.getByText(/order id: #2/i)).toBeInTheDocument();
    expect(screen.getByText(/order id: #3/i)).toBeInTheDocument();
    expect(screen.getByText(/order id: #4/i)).toBeInTheDocument();
    expect(screen.getByText(/order id: #5/i)).toBeInTheDocument();

    expect(screen.getByText(/paid/i)).toBeInTheDocument();
    expect(screen.getByText(/shipped/i)).toBeInTheDocument();
    expect(screen.getByText(/pending/i)).toBeInTheDocument();
    expect(screen.getByText(/complete/i)).toBeInTheDocument();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  });
});
