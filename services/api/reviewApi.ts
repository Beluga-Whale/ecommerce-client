import { reviewUserDTO, reviewUserResponse } from "@/types";
import axios from "axios";
const apiUrl: string = process.env.NEXT_PUBLIC_PORT || "";

export const getUserReview = async (): Promise<reviewUserResponse> => {
  try {
    const result = await axios.get(`${apiUrl}/user/review`, {
      withCredentials: true,
    });
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const createReview = async (data: reviewUserDTO) => {
  try {
    const result = await axios.post(`${apiUrl}/user/review`, data, {
      withCredentials: true,
    });
    return result?.data;
  } catch (error) {
    throw error;
  }
};
