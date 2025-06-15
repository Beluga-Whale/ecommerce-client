import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, getAllProducts } from "./api/productsApi";

const getGetAllProductQueryKey = "getGetAllProductQueryKey";

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {},
    onError: (error: Error) => {
      console.log("Create Product Failed: ", error.message);
    },
  });
};

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: [getGetAllProductQueryKey],
    queryFn: () => getAllProducts(),
  });
};
