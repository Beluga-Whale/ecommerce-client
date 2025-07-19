import { PaymentIntentDto } from "@/types";
import axios from "axios";
import { createPaymentIntent } from "../paymentApi";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("PaymentApi", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should call axios createPaymentIntent", async () => {
    const mockData: PaymentIntentDto = {
      amount: 100,
      orderId: 1,
      userId: 1,
    };
    const mockResponse = {
      message: "create createPaymentIntent success",
    };

    mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await createPaymentIntent(mockData);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining("/stripe/payment-intent"),
      mockData,
      { withCredentials: true }
    );
    expect(result).toEqual(mockResponse);
  });
  it("should throw error when createPaymentIntent", async () => {
    const mockError = new Error("Request failed");
    mockedAxios.post.mockRejectedValueOnce(mockError);
    const mockData: PaymentIntentDto = {
      amount: 100,
      orderId: 1,
      userId: 1,
    };
    await expect(createPaymentIntent(mockData)).rejects.toThrow(
      "Request failed"
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining("/stripe/payment-intent"),
      mockData,
      { withCredentials: true }
    );
  });
});
