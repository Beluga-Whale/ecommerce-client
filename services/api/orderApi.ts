import {
  OderAllByUserIdResponse,
  OrderAddByAdminResponse,
  OrderByIdResponse,
  OrderDto,
  OrderResponseDto,
  salePerDayResponse,
  summaryDashboardResponse,
  topProductResponse,
} from "@/types";
import axios from "axios";
const apiUrl: string = process.env.NEXT_PUBLIC_PORT || "";

export const createOrder = async (
  data: OrderDto
): Promise<OrderResponseDto> => {
  try {
    const result = await axios.post(`${apiUrl}/user/order`, data, {
      withCredentials: true,
    });
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const getOrders = async (
  orderId: number,
  userId: number
): Promise<OrderByIdResponse> => {
  try {
    const result = await axios.get(
      `${apiUrl}/user/order/${orderId}?userId=${userId}`,
      {
        withCredentials: true,
      }
    );
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const getAllOrderUserId = async (): Promise<OderAllByUserIdResponse> => {
  try {
    const result = await axios.get(`${apiUrl}/user/order`, {
      withCredentials: true,
    });
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const updateStatusOrder = async (orderId: number, status: string) => {
  try {
    const result = await axios.patch(
      `${apiUrl}/user/order/${orderId}/status`,
      { status },
      {
        withCredentials: true,
      }
    );
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const getAllOrderAdmin = async (): Promise<OrderAddByAdminResponse> => {
  try {
    const result = await axios.get(`${apiUrl}/admin/order`, {
      withCredentials: true,
    });
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const updateStatusOrderByAdmin = async (
  orderId: number,
  status: string
) => {
  try {
    const result = await axios.patch(
      `${apiUrl}/admin/order/${orderId}/status`,
      { status },
      {
        withCredentials: true,
      }
    );
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const getSummaryDashboard =
  async (): Promise<summaryDashboardResponse> => {
    try {
      const result = await axios.get(`${apiUrl}/admin/dashboard`, {
        withCredentials: true,
      });
      return result?.data;
    } catch (error) {
      throw error;
    }
  };

export const getProductTop = async (): Promise<topProductResponse> => {
  try {
    const result = await axios.get(`${apiUrl}/admin/dashboard/topproduct`, {
      withCredentials: true,
    });
    return result?.data;
  } catch (error) {
    throw error;
  }
};
export const getSalePerDay = async (): Promise<salePerDayResponse> => {
  try {
    const result = await axios.get(`${apiUrl}/admin/dashboard/slatePerday`, {
      withCredentials: true,
    });
    return result?.data;
  } catch (error) {
    throw error;
  }
};
