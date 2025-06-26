import { useMutation } from "@tanstack/react-query";
import { createPaymentIntent } from "./api/paymentApi";
import { PaymentIntentDto } from "@/types";

export const usePaymentServices = () => {
  return useMutation({
    mutationFn: (data: PaymentIntentDto) => createPaymentIntent(data),
    onSuccess: () => {},
    onError: (error: Error) => {
      console.error("Payment creation failed: ", error.message);
    },
  });
};
