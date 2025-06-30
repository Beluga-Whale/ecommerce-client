import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createReview, getUserReview } from "./api/reviewApi";
import { reviewUserDTO, reviewUserResponse } from "@/types";
import { getOrderByIdQueryKey } from "./orderService";

const getReviewUserQueryKey = "getReviewUserQueryKey";

export const useUserReview = () => {
  return useQuery<reviewUserResponse>({
    queryKey: [getReviewUserQueryKey],
    queryFn: getUserReview,
  });
};

export const useCreateReview = (orderId: number, userId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: reviewUserDTO) => createReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getOrderByIdQueryKey, orderId, userId],
      });
      queryClient.invalidateQueries({
        queryKey: [getReviewUserQueryKey],
      });
    },
  });
};
