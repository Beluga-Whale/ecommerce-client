import { OrderDto, OrderDtoById, OrderResponseDto } from "@/types";
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

export const getOrders = async (orderId: number): Promise<OrderDtoById> => {
  try {
    const result = await axios.get(`${apiUrl}/user/order/${orderId}`, {
      withCredentials: true,
    });
    return result?.data;
  } catch (error) {
    throw error;
  }
};
