import { render, screen } from "@testing-library/react";
import StepStatusOrder from "../StepStatusOrder";
import { OrderDtoById } from "@/types";

describe("Render StepStatusOrder", () => {
  it("should render StepStatusOrder Cancel", () => {
    const mockStatusOrder: OrderDtoById = {
      status: "cancel",
    };
    render(<StepStatusOrder orderData={mockStatusOrder} />);
    expect(screen.getByText("คำสั่งซื้อนี้ถูกยกเลิกแล้ว")).toBeInTheDocument();
  });
  it("should render StepStatusOrder Pending", () => {
    const mockStatusOrder: OrderDtoById = {
      status: "pending",
    };
    render(<StepStatusOrder orderData={mockStatusOrder} />);
    expect(screen.getByTestId("step-Pending")).toHaveClass("bg-amber-500");
    expect(screen.getByTestId("step-Paid")).toHaveClass("bg-gray-200");
    expect(screen.getByTestId("step-Shipped")).toHaveClass("bg-gray-200");
    expect(screen.getByTestId("step-Complete")).toHaveClass("bg-gray-200");
  });
  it("should render StepStatusOrder Paid", () => {
    const mockStatusOrder: OrderDtoById = {
      status: "paid",
    };
    render(<StepStatusOrder orderData={mockStatusOrder} />);
    expect(screen.getByTestId("step-Pending")).toHaveClass("bg-amber-500");
    expect(screen.getByTestId("step-Paid")).toHaveClass("bg-amber-500");
    expect(screen.getByTestId("step-Shipped")).toHaveClass("bg-gray-200");
    expect(screen.getByTestId("step-Complete")).toHaveClass("bg-gray-200");
  });
  it("should render StepStatusOrder Shipped", () => {
    const mockStatusOrder: OrderDtoById = {
      status: "shipped",
    };
    render(<StepStatusOrder orderData={mockStatusOrder} />);
    expect(screen.getByTestId("step-Pending")).toHaveClass("bg-amber-500");
    expect(screen.getByTestId("step-Paid")).toHaveClass("bg-amber-500");
    expect(screen.getByTestId("step-Shipped")).toHaveClass("bg-amber-500");
    expect(screen.getByTestId("step-Complete")).toHaveClass("bg-gray-200");
  });
  it("should render StepStatusOrder Complete", () => {
    const mockStatusOrder: OrderDtoById = {
      status: "complete",
    };
    render(<StepStatusOrder orderData={mockStatusOrder} />);
    expect(screen.getByTestId("step-Pending")).toHaveClass("bg-amber-500");
    expect(screen.getByTestId("step-Paid")).toHaveClass("bg-amber-500");
    expect(screen.getByTestId("step-Shipped")).toHaveClass("bg-amber-500");
    expect(screen.getByTestId("step-Complete")).toHaveClass("bg-amber-500");
  });
});
