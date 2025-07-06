import {
  LoginBodyDTO,
  signUpBodyDTO,
  userProfileResponse,
  userProfileUpdateDTO,
} from "@/types";
import axios from "axios";

const apiUrl: string = process.env.NEXT_PUBLIC_PORT || "";

export const signIn = async (data: LoginBodyDTO) => {
  try {
    const result = await axios.post(`${apiUrl}/login`, data, {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    const result = await axios.post(
      `${apiUrl}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (data: signUpBodyDTO) => {
  try {
    const result = await axios.post(`${apiUrl}/register`, data, {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getProfile = async (): Promise<userProfileResponse> => {
  try {
    const result = await axios.get(`${apiUrl}/user/profile`, {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (data: userProfileUpdateDTO) => {
  try {
    const result = await axios.patch(`${apiUrl}/user/profile`, data, {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};
