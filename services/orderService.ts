import { OrderDto } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "./api/orderApi";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (payload: OrderDto) => createOrder(payload),
    onSuccess: () => {},
    onError: (error: Error) => {
      console.log("Create Product Failed: ", error.message);
    },
  });
};
