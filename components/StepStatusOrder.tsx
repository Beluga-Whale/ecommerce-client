import { OrderDtoById } from "@/types";
import { Clock, PackageCheck, Truck, XCircle, CreditCard } from "lucide-react";

type StepStatusOrderProps = {
  orderData?: OrderDtoById;
};

const StepStatusOrder = ({ orderData }: StepStatusOrderProps) => {
  const steps = [
    {
      key: "pending",
      label: "Pending",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      key: "paid",
      label: "Paid",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      key: "shipped",
      label: "Shipped",
      icon: <Truck className="w-5 h-5" />,
    },
    {
      key: "complete",
      label: "Complete",
      icon: <PackageCheck className="w-5 h-5" />,
    },
  ];

  if (orderData?.status === "cancel") {
    return (
      <div className="flex items-center justify-center gap-2 mb-8 text-red-600">
        <XCircle className="w-5 h-5" />
        <span className="font-semibold">คำสั่งซื้อนี้ถูกยกเลิกแล้ว</span>
      </div>
    );
  }

  const currentStep = steps.findIndex((step) => step.key === orderData?.status);

  return (
    <div className="flex justify-between items-center mb-8 bg-white  p-6 rounded-xl">
      {steps.map((step, idx) => (
        <div key={step.key} className="flex flex-col items-center text-center">
          <div
            className={`rounded-full p-2 transition ${
              idx <= currentStep
                ? "bg-amber-500 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {step.icon}
          </div>

          <span className="text-sm mt-2">{step.label}</span>
        </div>
      ))}
    </div>
  );
};

export default StepStatusOrder;
