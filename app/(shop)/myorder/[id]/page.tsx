"use client";
import DialogCreateReview from "@/components/Dialog/DialogCreateReview";
import StepStatusOrder from "@/components/StepStatusOrder";
import { Button } from "@/components/ui/button";
import {
  setDialogCreateReviewOpen,
  setProductID,
  setProductName,
} from "@/lib/features/dialog/dialogSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useGetOrderById, useUpdateStatusOder } from "@/services/orderService";
import { useUserReview } from "@/services/reviewServices";
import { UpdateStatusOrderDTO } from "@/types";
import { CircleCheck, PenLine } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const MyOrderId = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { data: orderData } = useGetOrderById(Number(id), Number(user.userId));
  const { mutateAsync: updateStatusMutate } = useUpdateStatusOder();

  const uniqueProductItems = orderData?.data?.orderItem?.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.productId === item.productId)
  );

  const { data: userReviews } = useUserReview();
  const isReviewed = (productId: number) => {
    return userReviews?.data?.some((review) => review.productId === productId);
  };

  useEffect(() => {}, [orderData?.data]);

  return (
    <main className="bg-gray-100">
      <div className="  max-w-4xl mx-auto py-10 px-6">
        <h1 className="text-2xl font-bold mb-6">
          <span className="text-amber-600 ">
            Order Details #{orderData?.data.orderID}{" "}
          </span>
          <span
            className={`px-4 py-1 rounded-xl  uppercase  ${
              orderData?.data.status === "paid"
                ? "text-blue-500 bg-blue-100"
                : orderData?.data.status === "pending"
                ? "text-blue-500 bg-blue-100"
                : orderData?.data.status === "shipped"
                ? "text-purple-500 bg-purple-100"
                : orderData?.data.status === "complete"
                ? "text-green-500 bg-green-100"
                : "bg-red-100 text-red-700"
            }`}
          >
            {orderData?.data.status}
          </span>
        </h1>
        <StepStatusOrder orderData={orderData?.data} />

        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <div>
            <h1>Customer Name:</h1> {orderData?.data.fullName}
            <h1>Phone:</h1> {orderData?.data.phone}
            <h1>Address:</h1> {orderData?.data.address},{" "}
            {orderData?.data.subdistrict}, {orderData?.data.district},{" "}
            {orderData?.data.province}, {orderData?.data.zipcode}
            <h1>Total Price:</h1> ฿{orderData?.data.totalPrice}
            <h1>Order Date:</h1> {orderData?.data.createdAt}
          </div>

          <div>
            <h2 className="font-bold text-gray-800 mb-2">Product list</h2>
            {orderData?.data?.orderItem?.map((item, i) => (
              <div key={i} className="border-b py-2 flex justify-between">
                <p>
                  {item.productName} (Size {item.size})
                </p>
                <p>
                  ฿{item.priceAtPurchase} x {item.quantity}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-end items-center text-lg font-semibold mt-4">
            <span>Total: </span>
            <span className="ml-2 text-amber-600">
              ${orderData?.data.totalPrice}
            </span>
          </div>

          {orderData?.data.status === "complete" && (
            <div className="mt-6">
              <h2 className="font-bold text-gray-800 mb-2">Rate Products</h2>
              {uniqueProductItems?.map((item) => (
                <div
                  key={item.variantID}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div>
                    <p>{item.productName}</p>
                  </div>
                  <div>
                    {isReviewed(item.productId) ? (
                      <div className="flex items-center space-x-3">
                        <CircleCheck className="text-green-600" />
                        <span className="text-green-600 text-sm">Reviewed</span>
                      </div>
                    ) : (
                      <Button
                        className="bg-amber-500 hover:bg-amber-600 text-white hover:cursor-pointer "
                        onClick={() => {
                          dispatch(setDialogCreateReviewOpen());
                          dispatch(setProductName(item.productName));
                          dispatch(setProductID(item.productId));
                        }}
                      >
                        <PenLine />
                        Add Review
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {orderData?.data.status === "pending" && (
            <div className="space-x-2">
              <Button
                onClick={() => {
                  const payload: UpdateStatusOrderDTO = {
                    orderId: Number(orderData?.data?.orderID),
                    status: "cancel",
                  };
                  updateStatusMutate(payload);
                }}
                className="mt-3 inline-block px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md transition hover:cursor-pointer"
              >
                Cancel Order
              </Button>
              <Button
                onClick={() =>
                  router.push(`/payment/${orderData?.data.orderID}`)
                }
                className="mt-3 inline-block px-4 py-2 text-white bg-amber-500 hover:bg-amber-600 rounded-md transition"
              >
                Retry Payment
              </Button>
            </div>
          )}
        </div>
      </div>
      <DialogCreateReview id={Number(id)} userId={user.userId ?? 0} />
    </main>
  );
};
export default MyOrderId;
