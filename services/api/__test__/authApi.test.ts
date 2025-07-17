import axios from "axios";
import { getProfile, signIn, signOut, signUp, updateProfile } from "../authApi";
import dayjs from "dayjs";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("AuthApi", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call axios login", async () => {
    const mockData = { email: "test@gmail.com", password: "123456" };
    const mockResponse = {
      token: "fakeToken",
    };

    mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await signIn(mockData);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining("/login"),
      mockData,
      { withCredentials: true }
    );
    expect(result).toEqual(mockResponse);
  });

  it("should throw error when login fails", async () => {
    const mockError = new Error("Request failed");
    mockedAxios.post.mockRejectedValueOnce(mockError);
    const mockData = { email: "test@gmail.com", password: "123456" };
    await expect(signIn(mockData)).rejects.toThrow("Request failed");

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining("/login"),
      mockData,
      { withCredentials: true }
    );
  });

  it("should call axios logout", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: "logout success" });

    const result = await signOut();

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining("/logout"),
      {},
      { withCredentials: true }
    );
    expect(result).toEqual("logout success");
  });

  it("should throw error when logout fails", async () => {
    const mockError = new Error("Logout failed");
    mockedAxios.post.mockRejectedValueOnce(mockError);
    await expect(signOut()).rejects.toThrow("Logout failed");

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining("/logout"),
      {},
      { withCredentials: true }
    );
  });

  it("should call axios signUp", async () => {
    const mockData = {
      email: "admin@gmail.com",
      firstName: "halay1",
      lastName: "halay1teT",
      password: "password",
      phone: "0874853567",
      birthDate: dayjs(),
    };
    const mockResponse = {
      data: "User registered successfully ",
    };

    mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await signUp(mockData);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining("/register"),
      mockData,
      { withCredentials: true }
    );
    expect(result).toEqual(mockResponse);
  });

  it("should throw error when login fails", async () => {
    const mockError = new Error("Request failed");
    mockedAxios.post.mockRejectedValueOnce(mockError);
    const mockData = {
      email: "admin@gmail.com",
      firstName: "halay1",
      lastName: "halay1teT",
      password: "password",
      phone: "0874853567",
      birthDate: dayjs(),
    };
    await expect(signUp(mockData)).rejects.toThrow("Request failed");

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining("/register"),
      mockData,
      { withCredentials: true }
    );
  });

  it("should call axios getProfile", async () => {
    const mockResponse = {
      data: "Get Profile Successful",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getProfile();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/user/profile"),
      { withCredentials: true }
    );
    expect(result).toEqual(mockResponse);
  });

  it("should call axios getProfile fails", async () => {
    const mockError = new Error("Request failed");
    mockedAxios.get.mockRejectedValueOnce(mockError);

    await expect(getProfile()).rejects.toThrow("Request failed");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/user/profile"),
      { withCredentials: true }
    );
  });

  it("should call axios updateProfile", async () => {
    const mockData = {
      firstName: "TESTUPDATE",
    };
    const mockResponse = {
      data: "Update Profile Successful",
    };

    mockedAxios.patch.mockResolvedValueOnce({ data: mockResponse });

    const result = await updateProfile(mockData);

    expect(mockedAxios.patch).toHaveBeenCalledWith(
      expect.stringContaining("/user/profile"),
      mockData,
      { withCredentials: true }
    );
    expect(result).toEqual(mockResponse);
  });

  it("should throw error when updateProfile fails", async () => {
    const mockError = new Error("Request failed");
    mockedAxios.patch.mockRejectedValueOnce(mockError);
    const mockData = {
      firstName: "TESTUPDATE Fail",
    };

    await expect(updateProfile(mockData)).rejects.toThrow("Request failed");

    expect(mockedAxios.patch).toHaveBeenCalledWith(
      expect.stringContaining("/user/profile"),
      mockData,
      { withCredentials: true }
    );
  });
});
