import { OrderDto } from "@/types";
import axios from "axios";
import {
  createOrder,
  deleteOrder,
  getAllOrderAdmin,
  getAllOrderUserId,
  getCustomerDetail,
  getOrders,
  getProductTop,
  getSalePerDay,
  getSummaryDashboard,
  updateStatusOrder,
  updateStatusOrderByAdmin,
} from "../orderApi";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("OrderApi", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call axios create order", async () => {
    const mockData: OrderDto = {
      fullName: "T-Shirt Update",
      phone: "0987678976",
      address: "1",
      province: "1",
      district: "1",
      subdistrict: "1",
      zipcode: "1",
      items: [
        {
          variantId: 92,
          quantity: 1,
        },
      ],
    };
    const mockResponse = {
      message: "create category success",
      data: mockData,
    };

    mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await createOrder(mockData);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining("/user/order"),
      mockData,
      { withCredentials: true }
    );
    expect(result).toEqual(mockResponse);
  });
  it("should throw error when create order", async () => {
    const mockError = new Error("Request failed");
    mockedAxios.post.mockRejectedValueOnce(mockError);
    const mockData: OrderDto = {
      fullName: "T-Shirt Update",
      phone: "0987678976",
      address: "1",
      province: "1",
      district: "1",
      subdistrict: "1",
      zipcode: "1",
      items: [
        {
          variantId: 92,
          quantity: 1,
        },
      ],
    };
    await expect(createOrder(mockData)).rejects.toThrow("Request failed");

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining("/user/order"),
      mockData,
      { withCredentials: true }
    );
  });
  it("should call axios get order ById ", async () => {
    const mockResponse = {
      message: "get orderById success",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getOrders(1, 1);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/user/order/1?userId=1"),
      { withCredentials: true }
    );
    expect(result).toEqual(mockResponse);
  });
  it("should throw error when get order ById ", async () => {
    const mockError = new Error("Request failed");
    mockedAxios.get.mockRejectedValueOnce(mockError);
    await expect(getOrders(1, 1)).rejects.toThrow("Request failed");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/user/order/1?userId=1"),
      { withCredentials: true }
    );
  });
  it("should call axios getAllOrderUserId ", async () => {
    const mockResponse = {
      message: "get getAllOrderUserId success",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getAllOrderUserId();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/user/order"),
      { withCredentials: true }
    );
    expect(result).toEqual(mockResponse);
  });
  it("should throw error when getAllOrderUserId ", async () => {
    const mockError = new Error("Request failed");
    mockedAxios.get.mockRejectedValueOnce(mockError);
    await expect(getAllOrderUserId()).rejects.toThrow("Request failed");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/user/order"),
      { withCredentials: true }
    );
  });
  it("should call axios updateStatusOrder ", async () => {
    const mockResponse = {
      message: "get updateStatusOrder success",
    };
    const mockData = {
      status: "pending",
    };

    mockedAxios.patch.mockResolvedValueOnce({ data: mockResponse });

    const result = await updateStatusOrder(1, mockData.status);

    expect(mockedAxios.patch).toHaveBeenCalledWith(
      expect.stringContaining("/user/order/1/status"),
      mockData,
      { withCredentials: true }
    );
    expect(result).toEqual(mockResponse);
  });
  it("should throw error when updateStatusOrder ", async () => {
    const mockError = new Error("Request failed");
    const mockData = {
      status: "pending",
    };
    mockedAxios.patch.mockRejectedValueOnce(mockError);
    await expect(updateStatusOrder(1, mockData.status)).rejects.toThrow(
      "Request failed"
    );

    expect(mockedAxios.patch).toHaveBeenCalledWith(
      expect.stringContaining("/user/order/1/status"),
      mockData,
      { withCredentials: true }
    );
  });
  it("should call axios get getAllOrderAdmin ", async () => {
    const mockResponse = {
      message: "get getAllOrderAdmin success",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getAllOrderAdmin();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/admin/order"),
      { withCredentials: true }
    );
    expect(result).toEqual(mockResponse);
  });
  it("should throw error when get getAllOrderAdmin ", async () => {
    const mockError = new Error("Request failed");
    mockedAxios.get.mockRejectedValueOnce(mockError);
    await expect(getAllOrderAdmin()).rejects.toThrow("Request failed");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/admin/order"),
      { withCredentials: true }
    );
  });
  it("should call axios updateStatusOrderByAdmin ", async () => {
    const mockResponse = {
      message: "get updateStatusOrderByAdmin success",
    };
    const mockData = {
      status: "pending",
    };

    mockedAxios.patch.mockResolvedValueOnce({ data: mockResponse });

    const result = await updateStatusOrderByAdmin(1, mockData.status);

    expect(mockedAxios.patch).toHaveBeenCalledWith(
      expect.stringContaining("/admin/order/1/status"),
      mockData,
      { withCredentials: true }
    );
    expect(result).toEqual(mockResponse);
  });
  it("should throw error when updateStatusOrderByAdmin ", async () => {
    const mockError = new Error("Request failed");
    const mockData = {
      status: "pending",
    };
    mockedAxios.patch.mockRejectedValueOnce(mockError);
    await expect(updateStatusOrderByAdmin(1, mockData.status)).rejects.toThrow(
      "Request failed"
    );

    expect(mockedAxios.patch).toHaveBeenCalledWith(
      expect.stringContaining("/admin/order/1/status"),
      mockData,
      { withCredentials: true }
    );
  });
  it("should call axios get getSummaryDashboard ", async () => {
    const mockResponse = {
      message: "get getSummaryDashboard success",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getSummaryDashboard();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/admin/dashboard"),
      { withCredentials: true }
    );
    expect(result).toEqual(mockResponse);
  });
  it("should throw error when getSummaryDashboard ", async () => {
    const mockError = new Error("Request failed");
    mockedAxios.get.mockRejectedValueOnce(mockError);
    await expect(getSummaryDashboard()).rejects.toThrow("Request failed");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/admin/dashboard"),
      { withCredentials: true }
    );
  });
  it("should call axios get getProductTop ", async () => {
    const mockResponse = {
      message: "get getProductTop success",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getProductTop();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/admin/dashboard/topproduct"),
      { withCredentials: true }
    );
    expect(result).toEqual(mockResponse);
  });
  it("should throw error when getProductTop ", async () => {
    const mockError = new Error("Request failed");
    mockedAxios.get.mockRejectedValueOnce(mockError);
    await expect(getProductTop()).rejects.toThrow("Request failed");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/admin/dashboard/topproduct"),
      { withCredentials: true }
    );
  });
  it("should call axios get getSalePerDay ", async () => {
    const mockResponse = {
      message: "get getSalePerDay success",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getSalePerDay();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/admin/dashboard/slatePerday"),
      { withCredentials: true }
    );
    expect(result).toEqual(mockResponse);
  });
  it("should throw error when getSalePerDay ", async () => {
    const mockError = new Error("Request failed");
    mockedAxios.get.mockRejectedValueOnce(mockError);
    await expect(getSalePerDay()).rejects.toThrow("Request failed");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/admin/dashboard/slatePerday"),
      { withCredentials: true }
    );
  });
  it("should call axios deleteOrder ", async () => {
    const mockResponse = {
      message: "get deleteOrder success",
    };

    mockedAxios.delete.mockResolvedValueOnce({ data: mockResponse });

    const result = await deleteOrder(1);

    expect(mockedAxios.delete).toHaveBeenCalledWith(
      expect.stringContaining("/admin/order/1"),
      { withCredentials: true }
    );
    expect(result).toEqual(mockResponse);
  });
  it("should throw error when deleteOrder ", async () => {
    const mockError = new Error("Request failed");
    mockedAxios.delete.mockRejectedValueOnce(mockError);
    await expect(deleteOrder(1)).rejects.toThrow("Request failed");

    expect(mockedAxios.delete).toHaveBeenCalledWith(
      expect.stringContaining("/admin/order/1"),
      { withCredentials: true }
    );
  });
  it("should call axios get getCustomerDetail ", async () => {
    const mockResponse = {
      message: "get getCustomerDetail success",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getCustomerDetail();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/admin/dashboard/customer"),
      { withCredentials: true }
    );
    expect(result).toEqual(mockResponse);
  });
  it("should throw error when getCustomerDetail ", async () => {
    const mockError = new Error("Request failed");
    mockedAxios.get.mockRejectedValueOnce(mockError);
    await expect(getCustomerDetail()).rejects.toThrow("Request failed");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/admin/dashboard/customer"),
      { withCredentials: true }
    );
  });
});
