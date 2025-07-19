import axios from "axios";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../categoryApi";
import { CreateCategoryDTO } from "@/types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("CategoryApi", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call axios create category ", async () => {
    const mockData: CreateCategoryDTO = { name: "Test Category" };
    const mockResponse = {
      message: "create category success",
      data: mockData,
    };

    mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await createCategory(mockData);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining("/category"),
      mockData,
      { withCredentials: true }
    );
    expect(result).toEqual(mockResponse);
  });
  it("should throw error when create category", async () => {
    const mockError = new Error("Request failed");
    mockedAxios.post.mockRejectedValueOnce(mockError);
    const mockData: CreateCategoryDTO = { name: "Test Category" };
    await expect(createCategory(mockData)).rejects.toThrow("Request failed");

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining("/category"),
      mockData,
      { withCredentials: true }
    );
  });
  it("should call axios update category ", async () => {
    const mockData = { name: "Test Category" };
    const mockResponse = {
      message: "update category success",
    };

    mockedAxios.put.mockResolvedValueOnce({ data: mockResponse });

    const result = await updateCategory(1, mockData);

    expect(mockedAxios.put).toHaveBeenCalledWith(
      expect.stringContaining("/category/1"),
      mockData,
      { withCredentials: true }
    );
    expect(result).toEqual(mockResponse);
  });
  it("should throw error when update category", async () => {
    const mockError = new Error("Request failed");
    mockedAxios.put.mockRejectedValueOnce(mockError);
    const mockData: CreateCategoryDTO = { name: "Test Category" };
    await expect(updateCategory(1, mockData)).rejects.toThrow("Request failed");

    expect(mockedAxios.put).toHaveBeenCalledWith(
      expect.stringContaining("/category/1"),
      mockData,
      { withCredentials: true }
    );
  });
  it("should call axios getAll category ", async () => {
    const mockResponse = {
      message: "getAll category success",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getAllCategory();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/category"),
      { withCredentials: true }
    );
    expect(result).toEqual(mockResponse);
  });
  it("should throw error when getAll category", async () => {
    const mockError = new Error("Request failed");
    mockedAxios.get.mockRejectedValueOnce(mockError);
    await expect(getAllCategory).rejects.toThrow("Request failed");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/category"),
      { withCredentials: true }
    );
  });
  it("should call axios delete category ", async () => {
    const mockResponse = {
      message: "delete category success",
    };

    mockedAxios.delete.mockResolvedValueOnce({ data: mockResponse });

    const result = await deleteCategory(1);

    expect(mockedAxios.delete).toHaveBeenCalledWith(
      expect.stringContaining("/category/1"),
      { withCredentials: true }
    );
    expect(result).toEqual(mockResponse);
  });
  it("should throw error when delete category", async () => {
    const mockError = new Error("Request failed");
    mockedAxios.delete.mockRejectedValueOnce(mockError);
    await expect(deleteCategory(1)).rejects.toThrow("Request failed");

    expect(mockedAxios.delete).toHaveBeenCalledWith(
      expect.stringContaining("/category/1"),
      { withCredentials: true }
    );
  });
});
