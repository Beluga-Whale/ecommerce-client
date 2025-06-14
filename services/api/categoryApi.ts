import { CreateCategoryDTO } from "@/types";
import axios from "axios";
const apiUrl: string = process.env.NEXT_PUBLIC_PORT || "";

export const createCategory = async (data: CreateCategoryDTO) => {
  try {
    const result = await axios.post(`${apiUrl}/category`, data, {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCategory = async () => {
  try {
    const result = await axios.get(`${apiUrl}/category`, {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};
