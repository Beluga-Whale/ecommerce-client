import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategory, getAllCategory } from "./api/categoryApi";

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
  return useQuery({
    queryKey: [getCategoryQueryKey],
    queryFn: () => getAllCategory(),
  });
};

// export const useGetCompleteTasks = (priority?: string) => {
//   return useQuery({
//     queryKey: [getTasksCompleteQueryKey, priority],
//     queryFn: () => getCompleteTasks(priority ?? ""),
//     enabled: priority != undefined,
//   });
// };
