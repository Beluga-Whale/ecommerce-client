import dialogReducer, {
  setCategory,
  setDialogAddCategoryClose,
  setDialogAddCategoryOpen,
  setDialogCreateReviewClose,
  setDialogCreateReviewOpen,
  setDialogDeleteCategoryClose,
  setDialogDeleteCategoryOpen,
  setDialogDeleteOrderClose,
  setDialogDeleteOrderOpen,
  setDialogDeleteProductClose,
  setDialogDeleteProductOpen,
  setDialogEditCategoryClose,
  setDialogEditCategoryOpen,
  setDialogEditStatusClose,
  setDialogEditStatusOpen,
  setDialogLoginClose,
  setDialogLoginOpen,
  setOrderIdDelete,
  setProductID,
  setProductName,
  setStatusOrder,
} from "../dialog/dialogSlice";

describe("dialogSlice", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const previousState = {
    loginToggle: false,
    deleteProductToggle: false,
    productID: undefined,
    productName: "",
    editStatusToggle: false,
    orderId: 0,
    status: "",
    orderIdDelete: 0,
    deleteOrderToggle: false,
    createReviewToggle: false,
    deleteCategoryToggle: false,
    editCategoryToggle: false,
    categoryId: 0,
    categoryName: "",
    addCategoryToggle: false,
  };
  it("should handler setDialogLoginOpen", () => {
    const newState = dialogReducer(previousState, setDialogLoginOpen());
    expect(newState).toEqual({
      ...previousState,
      loginToggle: true,
    });
  });
  it("should handler setDialogLoginClose", () => {
    const newState = dialogReducer(previousState, setDialogLoginClose());
    expect(newState).toEqual({
      ...previousState,
      loginToggle: false,
    });
  });
  it("should handler setDialogDeleteProductOpen", () => {
    const newState = dialogReducer(previousState, setDialogDeleteProductOpen());
    expect(newState).toEqual({
      ...previousState,
      deleteProductToggle: true,
    });
  });
  it("should handler setDialogDeleteProductClose", () => {
    const newState = dialogReducer(
      previousState,
      setDialogDeleteProductClose()
    );
    expect(newState).toEqual({
      ...previousState,
      deleteProductToggle: false,
    });
  });
  it("should handler setProductID", () => {
    const newState = dialogReducer(previousState, setProductID(1));
    expect(newState).toEqual({
      ...previousState,
      productID: 1,
    });
  });
  it("should handler setProductName", () => {
    const newState = dialogReducer(previousState, setProductName("Halay"));
    expect(newState).toEqual({
      ...previousState,
      productName: "Halay",
    });
  });
  it("should handler setDialogEditStatusOpen", () => {
    const newState = dialogReducer(previousState, setDialogEditStatusOpen());
    expect(newState).toEqual({
      ...previousState,
      editStatusToggle: true,
    });
  });
  it("should handler setDialogEditStatusClose", () => {
    const newState = dialogReducer(previousState, setDialogEditStatusClose());
    expect(newState).toEqual({
      ...previousState,
      editStatusToggle: false,
    });
  });
  it("should handler setStatusOrder", () => {
    const newState = dialogReducer(
      previousState,
      setStatusOrder({ orderId: 1, status: "paid" })
    );
    expect(newState).toEqual({
      ...previousState,
      orderId: 1,
      status: "paid",
    });
  });
  it("should handler setDialogDeleteOrderOpen", () => {
    const newState = dialogReducer(previousState, setDialogDeleteOrderOpen());
    expect(newState).toEqual({
      ...previousState,
      deleteOrderToggle: true,
    });
  });
  it("should handler setDialogDeleteOrderClose", () => {
    const newState = dialogReducer(previousState, setDialogDeleteOrderClose());
    expect(newState).toEqual({
      ...previousState,
      deleteOrderToggle: false,
    });
  });
  it("should handler setOrderIdDelete", () => {
    const newState = dialogReducer(previousState, setOrderIdDelete(1));
    expect(newState).toEqual({
      ...previousState,
      orderIdDelete: 1,
    });
  });
  it("should handler setDialogCreateReviewOpen", () => {
    const newState = dialogReducer(previousState, setDialogCreateReviewOpen());
    expect(newState).toEqual({
      ...previousState,
      createReviewToggle: true,
    });
  });
  it("should handler setDialogCreateReviewClose", () => {
    const newState = dialogReducer(previousState, setDialogCreateReviewClose());
    expect(newState).toEqual({
      ...previousState,
      createReviewToggle: false,
    });
  });
  it("should handler setDialogEditCategoryOpen", () => {
    const newState = dialogReducer(previousState, setDialogEditCategoryOpen());
    expect(newState).toEqual({
      ...previousState,
      editCategoryToggle: true,
    });
  });
  it("should handler setDialogEditCategoryClose", () => {
    const newState = dialogReducer(previousState, setDialogEditCategoryClose());
    expect(newState).toEqual({
      ...previousState,
      editCategoryToggle: false,
    });
  });
  it("should handler setCategory", () => {
    const newState = dialogReducer(
      previousState,
      setCategory({ categoryId: 1, categoryName: "updateCategory" })
    );
    expect(newState).toEqual({
      ...previousState,
      categoryId: 1,
      categoryName: "updateCategory",
    });
  });
  it("should handler setDialogDeleteCategoryOpen", () => {
    const newState = dialogReducer(
      previousState,
      setDialogDeleteCategoryOpen()
    );
    expect(newState).toEqual({
      ...previousState,
      deleteCategoryToggle: true,
    });
  });
  it("should handler setDialogDeleteCategoryClose", () => {
    const newState = dialogReducer(
      previousState,
      setDialogDeleteCategoryClose()
    );
    expect(newState).toEqual({
      ...previousState,
      deleteCategoryToggle: false,
    });
  });
  it("should handler setDialogAddCategoryOpen", () => {
    const newState = dialogReducer(previousState, setDialogAddCategoryOpen());
    expect(newState).toEqual({
      ...previousState,
      addCategoryToggle: true,
    });
  });
  it("should handler setDialogAddCategoryClose", () => {
    const newState = dialogReducer(previousState, setDialogAddCategoryClose());
    expect(newState).toEqual({
      ...previousState,
      addCategoryToggle: false,
    });
  });
});
