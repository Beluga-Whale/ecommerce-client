import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "./api/categoryApi";
import { CategoryResponseDTO, CreateCategoryDTO } from "@/types";

const getCategoryQueryKey = "getCategoryQueryKey";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCategoryDTO) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getCategoryQueryKey],
      });
    },
    onError: (error: Error) => {
      console.log("Create Category Failed: ", error.message);
    },
  });
};

export const useGetAllCategory = () => {
  return useQuery<CategoryResponseDTO>({
    queryKey: [getCategoryQueryKey],
    queryFn: () => getAllCategory(),
  });
};

export const updateCategoryById = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { name: string }) => updateCategory(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getCategoryQueryKey],
      });
    },
    onError: (error: Error) => {
      console.log("Update Category Failed: ", error.message);
    },
  });
};

export const deleteCategoryById = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getCategoryQueryKey],
      });
    },
    onError: (error: Error) => {
      console.log("Update Category Failed: ", error.message);
    },
  });
};
