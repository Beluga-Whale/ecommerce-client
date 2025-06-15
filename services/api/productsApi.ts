import { ProductBodyDTO } from "@/types";
import axios from "axios";
const apiUrl: string = process.env.NEXT_PUBLIC_PORT || "";

export const createProduct = async (data: ProductBodyDTO) => {
  try {
    const result = await axios.post(`${apiUrl}/product`, data, {
      withCredentials: true,
    });
    return result?.data;
  } catch (error) {
    throw error;
  }
};
