import axios from "axios";
import {
  createReview,
  getReviewAllByProductId,
  getUserReview,
} from "../reviewApi";
import { reviewUserDTO } from "@/types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("ReviewApi", () => {
  it("should call axios getUserReview", async () => {
    const mockResponse = {
      message: "getUserReview success",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getUserReview();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/user/review"),
      {
        withCredentials: true,
      }
    );
    expect(result).toEqual(mockResponse);
  });
  it("should throw error when getUserReview", async () => {
    const mockError = new Error("Request failed");
    mockedAxios.get.mockRejectedValueOnce(mockError);

    await expect(getUserReview()).rejects.toThrow("Request failed");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/user/review"),
      {
        withCredentials: true,
      }
    );
  });
  it("should call axios create review ", async () => {
    const mockData: reviewUserDTO = {
      comment: "GOOD",
      productId: 1,
      rating: 3,
    };
    const mockResponse = {
      message: "create review success",
      data: mockData,
    };

    mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await createReview(mockData);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining("/user/review"),
      mockData,
      { withCredentials: true }
    );
    expect(result).toEqual(mockResponse);
  });
  it("should throw error when create review", async () => {
    const mockError = new Error("Request failed");
    mockedAxios.post.mockRejectedValueOnce(mockError);
    const mockData: reviewUserDTO = {
      comment: "GOOD",
      productId: 1,
      rating: 3,
    };
    await expect(createReview(mockData)).rejects.toThrow("Request failed");

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining("/user/review"),
      mockData,
      { withCredentials: true }
    );
  });
  it("should call axios getReviewAllByProductId", async () => {
    const mockResponse = {
      message: "getReviewAllByProductId success",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getReviewAllByProductId(1);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/product/review-all/1"),
      {
        withCredentials: true,
      }
    );
    expect(result).toEqual(mockResponse);
  });
  it("should throw error when getReviewAllByProductId", async () => {
    const mockError = new Error("Request failed");
    mockedAxios.get.mockRejectedValueOnce(mockError);

    await expect(getReviewAllByProductId(1)).rejects.toThrow("Request failed");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/product/review-all/1"),
      {
        withCredentials: true,
      }
    );
  });
});
