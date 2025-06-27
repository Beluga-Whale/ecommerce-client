"use client";
import StepStatusOrder from "@/components/StepStatusOrder";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/hooks";
import { useGetOrderById, useUpdateStatusOder } from "@/services/orderService";
import { UpdateStatusOrderDTO } from "@/types";
import { useParams, useRouter } from "next/navigation";

const MyOrderId = () => {
  const { id } = useParams();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const { data: orderData } = useGetOrderById(Number(id), Number(user.userId));
  const { mutateAsync: updateStatusMutate } = useUpdateStatusOder();
  return (
    <main className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6">
        <span className="text-amber-600 ">
          รายละเอียดคำสั่งซื้อ #{orderData?.data.orderID}{" "}
        </span>
        <span
          className={`px-4 py-1 rounded-xl  uppercase  ${
            orderData?.data.status === "paid"
              ? "bg-green-100 text-green-700"
              : orderData?.data.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : orderData?.data.status === "shipped"
              ? "bg-blue-100 text-blue-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {orderData?.data.status}
        </span>
      </h1>
      <StepStatusOrder orderData={orderData?.data} />

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div>
          <h1>ชื่อผู้สั่ง:</h1> {orderData?.data.fullName}
          <h1>เบอร์:</h1> {orderData?.data.phone}
          <h1>ที่อยู่:</h1> {orderData?.data.address},{" "}
          {orderData?.data.subdistrict}, {orderData?.data.district},{" "}
          {orderData?.data.province}, {orderData?.data.zipcode}
          <h1>รวมเงิน:</h1> ฿{orderData?.data.totalPrice}
          <h1>วันเวลาสั่ง:</h1> {orderData?.data.createdAt}
        </div>

        <div>
          <h2 className="font-bold text-gray-800 mb-2">รายการสินค้า</h2>
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
          <span>รวมเงินทั้งหมด: </span>
          <span className="ml-2 text-amber-600">
            ${orderData?.data.totalPrice}
          </span>
        </div>

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
              onClick={() => router.push(`/payment/${orderData?.data.orderID}`)}
              className="mt-3 inline-block px-4 py-2 text-white bg-amber-500 hover:bg-amber-600 rounded-md transition"
            >
              ชำระเงินอีกครั้ง
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};
export default MyOrderId;
