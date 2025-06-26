import { OrderByIdResponse, OrderDto, OrderDtoById } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createOrder, getOrders } from "./api/orderApi";

const getOrderByIdQueryKey = "getOrderByIdQueryKey";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (payload: OrderDto) => createOrder(payload),
    onSuccess: () => {},
    onError: (error: Error) => {
      console.log("Create Product Failed: ", error.message);
    },
  });
};

export const useGetOrderById = (orderId: number) => {
  return useQuery<OrderByIdResponse>({
    queryKey: [getOrderByIdQueryKey, orderId],
    queryFn: () => getOrders(orderId),
    enabled: orderId !== 0 && orderId !== undefined,
  });
};
