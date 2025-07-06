import { CategoryResponseDTO, CreateCategoryDTO } from "@/types";
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

export const updateCategory = async (id: number, payload: { name: string }) => {
  try {
    const result = await axios.put(`${apiUrl}/category/${id}`, payload, {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCategory = async (): Promise<CategoryResponseDTO> => {
  try {
    const result = await axios.get(`${apiUrl}/category`, {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (id: number) => {
  try {
    const result = await axios.delete(`${apiUrl}/category/${id}`, {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};
