"use client";
import { useAppSelector } from "@/lib/hooks";
import { useGetOrderById } from "@/services/orderService";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import React from "react";
import { CircleCheck, XCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const orderId = searchParams.get("orderId");
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const { data: orderIdData } = useGetOrderById(
    Number(orderId),
    Number(user.userId)
  );

  const goToCheckout = () => {
    router.push(`/checkout/${orderId}`);
  };

  if (orderIdData?.data?.status === "paid") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600">
        <div className="bg-white max-w-xl w-full rounded-2xl shadow-md p-10 text-center border border-amber-200">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1.4 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="text-amber-500 mb-6 flex justify-center"
          >
            <CircleCheck className="text-amber-500" size={64} />
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank you!</h1>
          <p className="text-lg text-gray-600">
            Your payment was successful 🎉
          </p>
          <p className="mt-4 text-sm text-gray-500">Order ID: #{orderId}</p>

          <Separator className="mt-5" />

          <p className="mt-4 text-lg text-gray-700">Order List</p>

          {orderIdData?.data?.orderItem?.map((item) => (
            <div key={item.variantID} className="mt-2">
              <p>
                - {item?.productName} (Size {item?.size} x {item?.quantity}) $
                {item?.priceAtPurchase.toFixed(2)}
              </p>
            </div>
          ))}

          <div className="bg-amber-100 text-amber-700 font-bold text-2xl mt-6 py-3 rounded-md">
            ${amount}
          </div>

          <p>Address :</p>
          <p>Name: {orderIdData?.data?.fullName}</p>
          <p>
            Address : {orderIdData?.data?.address}{" "}
            {orderIdData?.data?.subdistrict} {orderIdData?.data?.district}{" "}
            {orderIdData?.data?.province} {orderIdData?.data?.zipcode}
          </p>
          <Separator className="mt-5" />
          <button
            className="bg-amber-500 mt-5 hover:bg-amber-600 text-white px-4 py-2 rounded-md hover:cursor-pointer"
            onClick={() => router.push(`/myorder/${Number(orderId)}`)}
          >
            See my order
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600">
      <div className="bg-white max-w-xl w-full rounded-2xl shadow-md p-10 text-center border border-amber-200">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 180, damping: 12 }}
          className="text-red-500 mb-6 flex justify-center"
        >
          <XCircle className="text-red-500" size={64} />
        </motion.div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Failed
        </h2>
        <p className="text-gray-600 mb-4">
          Something went wrong. Please try again.
        </p>
        <p className="text-sm text-gray-500">Order ID: #{orderId}</p>

        <Separator className="mt-5" />

        <button
          className="bg-red-500 hover:bg-red-600 mt-5 text-white px-4 py-2 rounded-md"
          onClick={goToCheckout}
        >
          Pay again
        </button>
      </div>
    </main>
  );
};

export default PaymentSuccess;
