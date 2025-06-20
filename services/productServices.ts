import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProductByID,
  getAllProducts,
  getProductID,
  updateProductByID,
} from "./api/productsApi";
import {
  ProductAllResponse,
  ProductBodyDTO,
  ProductByIdResponse,
} from "@/types";

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

export const useGetAllProducts = (
  page?: number | undefined,
  category?: string[] | undefined,
  size?: string[] | undefined,
  limit?: number | undefined
) => {
  return useQuery<ProductAllResponse>({
    queryKey: [getGetAllProductQueryKey, page, category, size],
    queryFn: () => getAllProducts(page, category, size, limit),
  });
};

export const useGetProductByID = (id: number) => {
  return useQuery<ProductByIdResponse>({
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

export const upeDeleteProductByID = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteProductByID(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getGetAllProductQueryKey],
      });
    },
    onError: (error: Error) => {
      console.log("Update Product Failed: ", error.message);
    },
  });
};
