import { createAction } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import userReducer, { initialState, setUserId } from "../user/userSlice";

describe("dialogSlice", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return the initial state", () => {
    // NOTE - สร้าง action ปลอมๆที่ไม่มีอยู่ใน reducer เพื่อให้มันไม่รู้จัก
    const unkownAction = createAction("unknown");
    // NOTE - ส่ง undefined ไปเพื่อให้ reducer ใช้ initialState

    expect(userReducer(undefined, unkownAction())).toEqual(initialState);
  });

  it("should handler setUserId", () => {
    const previousState = {
      userId: undefined,
    };
    const newState = userReducer(previousState, setUserId(1));
    expect(newState).toEqual({
      userId: 1,
    });
  });
});
