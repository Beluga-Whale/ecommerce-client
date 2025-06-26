import { PaymentIntentDto } from "@/types";
import axios from "axios";
const apiUrl: string = process.env.NEXT_PUBLIC_PORT || "";

export const createPaymentIntent = async (
  payload: PaymentIntentDto
): Promise<{ clientSecret: string }> => {
  try {
    const response = await axios.post(
      `${apiUrl}/stripe/payment-intent`,
      payload,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
