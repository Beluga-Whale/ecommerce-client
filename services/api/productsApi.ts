import {
  ProductAllResponse,
  ProductBodyDTO,
  ProductByIdResponse,
} from "@/types";
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

export const getAllProducts = async (
  page?: number,
  categoryList?: string[],
  sizeList?: string[],
  limit?: number
): Promise<ProductAllResponse> => {
  const category = categoryList?.join(",");
  const size = sizeList?.join(",");
  const params: any = {
    page,
    category,
    size,
    limit: limit === 0 || limit === undefined ? 0 : 12,
  };

  try {
    const result = await axios.get(`${apiUrl}/product`, {
      params,
      withCredentials: true,
    });
    return result?.data;
  } catch (error) {
    throw error;
  }
};
export const getProductID = async (
  id: number
): Promise<ProductByIdResponse> => {
  try {
    const result = await axios.get(`${apiUrl}/product/${id}`, {
      withCredentials: true,
    });
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const updateProductByID = async (
  id: number,
  payload: ProductBodyDTO
) => {
  try {
    const result = await axios.put(`${apiUrl}/product/${id}`, payload, {
      withCredentials: true,
    });
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProductByID = async (id: number) => {
  try {
    const result = await axios.delete(`${apiUrl}/product/${id}`, {
      withCredentials: true,
    });
    return result?.data;
  } catch (error) {
    throw error;
  }
};
