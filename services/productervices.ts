import { useMutation } from "@tanstack/react-query";
import { createProduct } from "./api/productsApi";

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {},
    onError: (error: Error) => {
      console.log("Create Product Failed: ", error.message);
    },
  });
};
