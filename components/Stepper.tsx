import { Check, Circle } from "lucide-react";

const steps = ["Cart", "Shipping", "Payment", "Done"];
const currentStep = 2; // index เริ่มที่ 0
type StepperProps = {
  steps: string[];
  currentStep: number;
};
const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="flex items-center justify-between w-full">
      {steps.map((label, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={label} className="flex-1 flex flex-col items-center">
            {/* Step Circle */}
            <div
              className={`rounded-full w-8 h-8 flex items-center justify-center border-2 transition mb-1 ${
                isCompleted
                  ? "bg-amber-500 border-amber-500 text-white"
                  : isActive
                  ? "bg-white border-amber-500 text-amber-500"
                  : "bg-white border-gray-300 text-gray-300"
              }`}
            >
              {isCompleted ? <Check size={16} /> : index + 1}
            </div>

            {/* Step Label */}
            <div className="text-xs text-center">{label}</div>

            {/* Line (except last) */}
            {index !== steps.length - 1 && (
              <div className="h-1 w-full bg-gray-200 absolute top-4 left-1/2 right-0 z-[-1]"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
