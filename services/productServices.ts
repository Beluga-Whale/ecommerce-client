import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createProduct,
  getAllProducts,
  getProductID,
  updateProductByID,
} from "./api/productsApi";
import { ProductBodyDTO } from "@/types";

const getGetAllProductQueryKey = "getGetAllProductQueryKey";
const getGetProductByIDQueryKey = "getGetProductByIDQueryKey";

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

export const useGetProductByID = (id: number) => {
  return useQuery({
    queryKey: [getGetProductByIDQueryKey, id],
    queryFn: () => getProductID(id),
  });
};

export const useUpdateProduct = (id: number) => {
  return useMutation({
    mutationFn: (payload: ProductBodyDTO) => updateProductByID(id, payload),
    onSuccess: () => {},
    onError: (error: Error) => {
      console.log("Update Product Failed: ", error.message);
    },
  });
};
