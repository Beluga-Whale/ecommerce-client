import "@testing-library/jest-dom";
import cartReducer, {
  deCreaseCartItemQuantity,
  inCreaseCartItemQuantity,
  removeCardItem,
  setAddress,
  setCartItem,
  setDefaultCartList,
  setPriceTotal,
} from "../cart/cartSlice";
describe("", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const previousState = {
    cartList: [
      {
        productId: 1,
        variant: [
          {
            quantity: 1,
            variantId: 1,
          },
          {
            quantity: 3,
            variantId: 2,
          },
        ],
      },
    ],
    addressDetail: null,
    priceTotal: 0,
  };
  it("should handler CartSlice add new variant", () => {
    const newState = cartReducer(
      previousState,
      setCartItem({
        productId: 1,
        variant: [
          {
            quantity: 4,
            variantId: 3,
          },
        ],
      })
    );
    expect(newState).toEqual({
      ...previousState,
      cartList: [
        {
          productId: 1,
          variant: [
            {
              quantity: 1,
              variantId: 1,
            },
            {
              quantity: 3,
              variantId: 2,
            },
            {
              quantity: 4,
              variantId: 3,
            },
          ],
        },
      ],
    });
  });
  it("should handler CartSlice add existingVariant", () => {
    const newState = cartReducer(
      previousState,
      setCartItem({
        productId: 1,
        variant: [
          {
            quantity: 4,
            variantId: 1,
          },
        ],
      })
    );
    expect(newState).toEqual({
      ...previousState,
      cartList: [
        {
          productId: 1,
          variant: [
            {
              quantity: 5,
              variantId: 1,
            },
            {
              quantity: 3,
              variantId: 2,
            },
          ],
        },
      ],
    });
  });
  it("should handler CartSlice add new product to cart", () => {
    const newState = cartReducer(
      previousState,
      setCartItem({
        productId: 2,
        variant: [
          {
            quantity: 4,
            variantId: 44,
          },
        ],
      })
    );
    expect(newState).toEqual({
      ...previousState,
      cartList: [
        {
          productId: 1,
          variant: [
            {
              quantity: 1,
              variantId: 1,
            },
            {
              quantity: 3,
              variantId: 2,
            },
          ],
        },
        {
          productId: 2,
          variant: [
            {
              quantity: 4,
              variantId: 44,
            },
          ],
        },
      ],
    });
  });
  it("should handler CartSlice remove variant", () => {
    const newState = cartReducer(
      previousState,
      removeCardItem({
        productId: 1,
        variantId: 1,
      })
    );
    expect(newState).toEqual({
      ...previousState,
      cartList: [
        {
          productId: 1,
          variant: [
            {
              quantity: 3,
              variantId: 2,
            },
          ],
        },
      ],
    });
  });
  it("should handler CartSlice remove variant length 0", () => {
    const previousZeroVariantState = {
      cartList: [
        {
          productId: 1,
          variant: [
            {
              quantity: 1,
              variantId: 1,
            },
          ],
        },
      ],
      addressDetail: null,
      priceTotal: 0,
    };

    const newState = cartReducer(
      previousZeroVariantState,
      removeCardItem({
        productId: 1,
        variantId: 1,
      })
    );
    expect(newState).toEqual({
      ...previousState,
      cartList: [],
    });
  });
  it("should handler CartSlice decrease variant quantity", () => {
    const previousTestState = {
      cartList: [
        {
          productId: 1,
          variant: [
            {
              quantity: 3,
              variantId: 1,
            },
            {
              quantity: 3,
              variantId: 2,
            },
          ],
        },
      ],
      addressDetail: null,
      priceTotal: 0,
    };
    const newState = cartReducer(
      previousTestState,
      deCreaseCartItemQuantity({
        productId: 1,
        variantId: 1,
      })
    );
    expect(newState).toEqual({
      ...previousState,
      cartList: [
        {
          productId: 1,
          variant: [
            {
              quantity: 2,
              variantId: 1,
            },
            {
              quantity: 3,
              variantId: 2,
            },
          ],
        },
      ],
    });
  });
  it("should handler CartSlice inCreaseCartItemQuantity variant quantity", () => {
    const previousTestState = {
      cartList: [
        {
          productId: 1,
          variant: [
            {
              quantity: 3,
              variantId: 1,
            },
            {
              quantity: 3,
              variantId: 2,
            },
          ],
        },
      ],
      addressDetail: null,
      priceTotal: 0,
    };
    const newState = cartReducer(
      previousTestState,
      inCreaseCartItemQuantity({
        productId: 1,
        variantId: 1,
      })
    );
    expect(newState).toEqual({
      ...previousState,
      cartList: [
        {
          productId: 1,
          variant: [
            {
              quantity: 4,
              variantId: 1,
            },
            {
              quantity: 3,
              variantId: 2,
            },
          ],
        },
      ],
    });
  });
  it("should handler CartSlice setAddress ", () => {
    const newState = cartReducer(
      previousState,
      setAddress({
        fullName: "Test Address",
        phone: "Test Address",
        address: "Test Address",
        province: "Test Address",
        district: "Test Address",
        subdistrict: "Test Address",
        zipCode: "Test Address",
      })
    );
    expect(newState).toEqual({
      ...previousState,
      addressDetail: {
        fullName: "Test Address",
        phone: "Test Address",
        address: "Test Address",
        province: "Test Address",
        district: "Test Address",
        subdistrict: "Test Address",
        zipCode: "Test Address",
      },
    });
  });
  it("should handler CartSlice setPriceTotal ", () => {
    const newState = cartReducer(previousState, setPriceTotal(1000));
    expect(newState).toEqual({
      ...previousState,
      priceTotal: 1000,
    });
  });
  it("should handler CartSlice setDefaultCartList ", () => {
    const newState = cartReducer(previousState, setDefaultCartList());
    expect(newState).toEqual({
      ...previousState,
      cartList: [],
    });
  });
});
