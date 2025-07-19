import { ProductBodyDTO } from "@/types";
import axios from "axios";
import {
  createProduct,
  deleteProductByID,
  getAllProducts,
  getProductID,
  updateProductByID,
} from "../productsApi";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("ProductApi", () => {
  it("should call axios create product ", async () => {
    const mockData: ProductBodyDTO = {
      name: "T-Shirt",
      title: "test title",
      description: "<p>TEST</p>",
      images: [
        {
          url: "https://res.cloudinary.com/dnue94koc/image/upload/v1750060281/Beluga_Whale_gtyr3j.webp",
        },
        {
          url: "https://res.cloudinary.com/dnue94koc/image/upload/v1750060282/beluga-whale-swimming-Norway_oelbul.jpg",
        },
        {
          url: "https://res.cloudinary.com/dnue94koc/image/upload/v1750060282/03_white-tee_model-front-scaled-scaled_i69es8.jpg",
        },
      ],
      isFeatured: false,
      isOnSale: true,
      salePrice: 20,
      categoryId: 9,
      variants: [
        {
          size: "S",
          stock: 3,
          sku: "T-SHIRT-S",
          price: 130,
        },
        {
          size: "M",
          stock: 1,
          sku: "T-SHIRT-M",
          price: 140,
        },
      ],
    };
    const mockResponse = {
      message: "create product success",
      data: mockData,
    };

    mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await createProduct(mockData);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining("/product"),
      mockData,
      { withCredentials: true }
    );
    expect(result).toEqual(mockResponse);
  });
  it("should throw error when create product", async () => {
    const mockError = new Error("Request failed");
    mockedAxios.post.mockRejectedValueOnce(mockError);
    const mockData: ProductBodyDTO = {
      name: "T-Shirt",
      title: "test title",
      description: "<p>TEST</p>",
      images: [
        {
          url: "https://res.cloudinary.com/dnue94koc/image/upload/v1750060281/Beluga_Whale_gtyr3j.webp",
        },
        {
          url: "https://res.cloudinary.com/dnue94koc/image/upload/v1750060282/beluga-whale-swimming-Norway_oelbul.jpg",
        },
        {
          url: "https://res.cloudinary.com/dnue94koc/image/upload/v1750060282/03_white-tee_model-front-scaled-scaled_i69es8.jpg",
        },
      ],
      isFeatured: false,
      isOnSale: true,
      salePrice: 20,
      categoryId: 9,
      variants: [
        {
          size: "S",
          stock: 3,
          sku: "T-SHIRT-S",
          price: 130,
        },
        {
          size: "M",
          stock: 1,
          sku: "T-SHIRT-M",
          price: 140,
        },
      ],
    };
    await expect(createProduct(mockData)).rejects.toThrow("Request failed");

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining("/product"),
      mockData,
      { withCredentials: true }
    );
  });
  it("should call axios getAllProducts", async () => {
    const mockResponse = {
      message: "getAllProducts success",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getAllProducts(1, ["test"], ["S"], 10);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/product"),
      {
        params: {
          page: 1,
          category: "test",
          size: "S",
          limit: 12,
        },
        withCredentials: true,
      }
    );
    expect(result).toEqual(mockResponse);
  });
  it("should throw error when getAllProducts", async () => {
    const mockError = new Error("Request failed");
    mockedAxios.get.mockRejectedValueOnce(mockError);

    await expect(getAllProducts(1, ["test"], ["S"], 10)).rejects.toThrow(
      "Request failed"
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/product"),
      {
        params: {
          page: 1,
          category: "test",
          size: "S",
          limit: 12,
        },
        withCredentials: true,
      }
    );
  });
  it("should call axios getProductID", async () => {
    const mockResponse = {
      message: "getProductID success",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getProductID(1);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/product/1"),
      {
        withCredentials: true,
      }
    );
    expect(result).toEqual(mockResponse);
  });
  it("should throw error when getProductID", async () => {
    const mockError = new Error("Request failed");
    mockedAxios.get.mockRejectedValueOnce(mockError);

    await expect(getProductID(1)).rejects.toThrow("Request failed");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/product/1"),
      {
        withCredentials: true,
      }
    );
  });
  it("should call axios updateProductByID", async () => {
    const mockResponse = {
      message: "updateProductByID success",
    };
    const mockData: ProductBodyDTO = {
      name: "T-Shirt",
      title: "test title",
      description: "<p>TEST</p>",
      images: [
        {
          url: "https://res.cloudinary.com/dnue94koc/image/upload/v1750060281/Beluga_Whale_gtyr3j.webp",
        },
        {
          url: "https://res.cloudinary.com/dnue94koc/image/upload/v1750060282/beluga-whale-swimming-Norway_oelbul.jpg",
        },
        {
          url: "https://res.cloudinary.com/dnue94koc/image/upload/v1750060282/03_white-tee_model-front-scaled-scaled_i69es8.jpg",
        },
      ],
      isFeatured: false,
      isOnSale: true,
      salePrice: 20,
      categoryId: 9,
      variants: [
        {
          size: "S",
          stock: 3,
          sku: "T-SHIRT-S",
          price: 130,
        },
        {
          size: "M",
          stock: 1,
          sku: "T-SHIRT-M",
          price: 140,
        },
      ],
    };
    mockedAxios.put.mockResolvedValueOnce({ data: mockResponse });

    const result = await updateProductByID(1, mockData);

    expect(mockedAxios.put).toHaveBeenCalledWith(
      expect.stringContaining("/product/1"),
      mockData,
      {
        withCredentials: true,
      }
    );
    expect(result).toEqual(mockResponse);
  });
  it("should throw error when updateProductByID", async () => {
    const mockError = new Error("Request failed");
    const mockData: ProductBodyDTO = {
      name: "T-Shirt",
      title: "test title",
      description: "<p>TEST</p>",
      images: [
        {
          url: "https://res.cloudinary.com/dnue94koc/image/upload/v1750060281/Beluga_Whale_gtyr3j.webp",
        },
        {
          url: "https://res.cloudinary.com/dnue94koc/image/upload/v1750060282/beluga-whale-swimming-Norway_oelbul.jpg",
        },
        {
          url: "https://res.cloudinary.com/dnue94koc/image/upload/v1750060282/03_white-tee_model-front-scaled-scaled_i69es8.jpg",
        },
      ],
      isFeatured: false,
      isOnSale: true,
      salePrice: 20,
      categoryId: 9,
      variants: [
        {
          size: "S",
          stock: 3,
          sku: "T-SHIRT-S",
          price: 130,
        },
        {
          size: "M",
          stock: 1,
          sku: "T-SHIRT-M",
          price: 140,
        },
      ],
    };
    mockedAxios.put.mockRejectedValueOnce(mockError);

    await expect(updateProductByID(1, mockData)).rejects.toThrow(
      "Request failed"
    );

    expect(mockedAxios.put).toHaveBeenCalledWith(
      expect.stringContaining("/product/1"),
      mockData,
      {
        withCredentials: true,
      }
    );
  });
  it("should call axios deleteProductByID", async () => {
    const mockResponse = {
      message: "deleteProductByID success",
    };

    mockedAxios.delete.mockResolvedValueOnce({ data: mockResponse });

    const result = await deleteProductByID(1);

    expect(mockedAxios.delete).toHaveBeenCalledWith(
      expect.stringContaining("/product/1"),
      {
        withCredentials: true,
      }
    );
    expect(result).toEqual(mockResponse);
  });
  it("should throw error when deleteProductByID", async () => {
    const mockError = new Error("Request failed");

    mockedAxios.delete.mockRejectedValueOnce(mockError);

    await expect(deleteProductByID(1)).rejects.toThrow("Request failed");

    expect(mockedAxios.delete).toHaveBeenCalledWith(
      expect.stringContaining("/product/1"),
      {
        withCredentials: true,
      }
    );
  });
});
