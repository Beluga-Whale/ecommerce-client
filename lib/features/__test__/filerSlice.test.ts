import "@testing-library/jest-dom";
import filterReducer, {
  setCategoryFilter,
  setSizeFilter,
} from "../filter/filerSlice";

describe("filterSlice", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should handler setCategoryFilter", () => {
    const previousState = {
      category: undefined,
      size: undefined,
    };
    const newState = filterReducer(
      previousState,
      setCategoryFilter(["Jacket", "T-shirt"])
    );
    expect(newState).toEqual({
      category: ["Jacket", "T-shirt"],
      size: undefined,
    });
  });
  it("should handler setSizeFilter", () => {
    const previousState = {
      category: undefined,
      size: undefined,
    };
    const newState = filterReducer(previousState, setSizeFilter(["S", "M"]));
    expect(newState).toEqual({
      category: undefined,
      size: ["S", "M"],
    });
  });
});
