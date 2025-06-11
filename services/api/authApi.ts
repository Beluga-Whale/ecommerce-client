import { LoginBodyDTO } from "@/types";
import axios from "axios";

const apiUrl: string = process.env.NEXT_PUBLIC_PORT || "";

export const login = async (data: LoginBodyDTO) => {
  try {
    const result = await axios.post(`${apiUrl}/login`, data, {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};
