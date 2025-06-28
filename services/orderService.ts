import {
  OderAllByUserIdResponse,
  OrderByIdResponse,
  OrderDto,
  salePerDayResponse,
  summaryDashboardResponse,
  topProductResponse,
  UpdateStatusOrderDTO,
} from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrder,
  getAllOrderAdmin,
  getAllOrderUserId,
  getOrders,
  getProductTop,
  getSalePerDay,
  getSummaryDashboard,
  updateStatusOrder,
  updateStatusOrderByAdmin,
} from "./api/orderApi";

const getOrderByIdQueryKey = "getOrderByIdQueryKey";
const getOrderAllByUserIdQueryKey = "getOrderAllByUserIdQueryKey";
const getOrderAllByAdminQueryKey = "getOrderAllByAdminQueryKey";
const getSummaryDashboardQueryKey = "getSummaryDashboardQueryKey";
const getProductTopQueryKey = "getProductTopQueryKey";
const getSalePerDayQueryKey = "getSalePerDayQueryKey";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (payload: OrderDto) => createOrder(payload),
    onSuccess: () => {},
    onError: (error: Error) => {
      console.log("Create Product Failed: ", error.message);
    },
  });
};

export const useGetOrderById = (orderId: number, userId: number) => {
  return useQuery<OrderByIdResponse>({
    queryKey: [getOrderByIdQueryKey, orderId, userId],
    queryFn: () => getOrders(orderId, userId),
    enabled: orderId !== 0 && orderId !== undefined,
  });
};

export const useGetOrderAllByUserId = () => {
  return useQuery<OderAllByUserIdResponse>({
    queryKey: [getOrderAllByUserIdQueryKey],
    queryFn: getAllOrderUserId,
  });
};

export const useUpdateStatusOder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateStatusOrderDTO) =>
      updateStatusOrder(payload.orderId, payload.status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getOrderAllByUserIdQueryKey],
      });
      queryClient.invalidateQueries({
        queryKey: [getOrderByIdQueryKey],
      });
    },
    onError: (error: Error) => {
      console.log("Update Status Order Failed: ", error.message);
    },
  });
};

export const useUpdateStatusOrderAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateStatusOrderDTO) =>
      updateStatusOrderByAdmin(payload.orderId, payload.status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getOrderAllByUserIdQueryKey],
      });
      queryClient.invalidateQueries({
        queryKey: [getOrderByIdQueryKey],
      });
      queryClient.invalidateQueries({
        queryKey: [getOrderAllByAdminQueryKey],
      });
    },
    onError: (error: Error) => {
      console.log("Update Status Order Failed: ", error.message);
    },
  });
};

export const useGetOrderAllByAdmin = () => {
  return useQuery({
    queryKey: [getOrderAllByAdminQueryKey],
    queryFn: getAllOrderAdmin,
  });
};

export const useGetSummaryDashboard = () => {
  return useQuery<summaryDashboardResponse>({
    queryKey: [getSummaryDashboardQueryKey],
    queryFn: getSummaryDashboard,
  });
};

export const useGetProductTop = () => {
  return useQuery<topProductResponse>({
    queryKey: [getProductTopQueryKey],
    queryFn: getProductTop,
  });
};

export const useGetSalePerDay = () => {
  return useQuery<salePerDayResponse>({
    queryKey: [getSalePerDayQueryKey],
    queryFn: getSalePerDay,
  });
};
