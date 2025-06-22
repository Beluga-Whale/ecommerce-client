"use client";
import CartOrder from "@/components/CartOrder";
import FormAddress from "@/components/FormAddress";
import SideBarOrder from "@/components/SideBarOrder";
import Stepper from "@/components/Stepper";
import { addressDetail, setAddress } from "@/lib/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
const steps = ["Cart", "Shipping", "Payment"];

const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter name product" }),
  phone: z
    .string()
    .length(10, { message: "Phone number must be exactly 10 digits." }),
  address: z.string().min(1, { message: "Please enter your address" }),
  zipCode: z.string().min(1, { message: "Please enter your zipcode" }),
  province: z.string().min(1, { message: "Please enter your province" }),
  district: z.string().min(1, { message: "Please enter your district" }),
  subdistrict: z.string().min(1, { message: "Please enter your subdistrict" }),
});

const OrderPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      province: "",
      district: "",
      subdistrict: "",
      zipCode: "",
    },
  });

  const handleNext = async () => {
    // NOTE - เช็คการ validate หน้ากรอก address
    if (currentStep === 1) {
      const isValid = await form.trigger();
      if (!isValid) {
        return;
      }
      const values = form.getValues();
      const payloadAddress: addressDetail = {
        name: values.name,
        phone: values.phone,
        address: values.address,
        province: values.province,
        district: values.district,
        subdistrict: values.subdistrict,
        zipCode: values.zipCode,
      };
      dispatch(setAddress(payloadAddress));
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <CartOrder />;
      case 1:
        return <FormAddress form={form} />;
      case 2:
        return <div>💳 Payment content here</div>;

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto max-w-2xl min-h-screen py-10 px-4 sm:px-6 lg:px-8 md:max-w-7xl ">
      <h1 className="text-2xl font-bold mb-8 text-center">Stepper Demo</h1>

      <div className="grid grid-cols-5 gap-7">
        <div className="w-full col-span-5 lg:col-span-3">
          {/* Stepper */}
          <div className="max-w-3xl mx-auto ">
            <Stepper steps={steps} currentStep={currentStep} />
          </div>

          {/* Step Content */}
          <div className="mt-8 rounded-md">{renderStepContent()}</div>
        </div>
        <div className="col-span-5 mt-5 lg:col-span-2 lg:mt-21  ">
          <SideBarOrder />
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 bg-amber-400 rounded font-bold disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
