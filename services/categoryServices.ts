import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategory, getAllCategory } from "./api/categoryApi";
import { CategoryResponseDTO } from "@/types";

const getCategoryQueryKey = "getCategoryQueryKey";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
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
