import { render, screen } from "@testing-library/react";
import Stepper from "../Stepper";

describe("Render Stepper", () => {
  it("should render step Cart", () => {
    render(<Stepper steps={["Cart", "Shipping", "Payment"]} currentStep={1} />);
    expect(screen.getByLabelText("step-Cart")).toHaveClass("bg-amber-500");
    expect(screen.getByLabelText("step-Shipping")).toHaveClass("bg-white");
    expect(screen.getByLabelText("step-Payment")).toHaveClass("bg-white");
  });
  it("should render step Shipping", () => {
    render(<Stepper steps={["Cart", "Shipping", "Payment"]} currentStep={2} />);
    expect(screen.getByLabelText("step-Cart")).toHaveClass("bg-amber-500");
    expect(screen.getByLabelText("step-Shipping")).toHaveClass("bg-amber-500");
    expect(screen.getByLabelText("step-Payment")).toHaveClass("bg-white");
  });
  it("should render step Payment", () => {
    render(<Stepper steps={["Cart", "Shipping", "Payment"]} currentStep={3} />);
    expect(screen.getByLabelText("step-Cart")).toHaveClass("bg-amber-500");
    expect(screen.getByLabelText("step-Shipping")).toHaveClass("bg-amber-500");
    expect(screen.getByLabelText("step-Payment")).toHaveClass("bg-amber-500");
  });
});
