"use client";
import { useGetOrderById } from "@/services/orderService";
import { useSearchParams } from "next/navigation";
import React from "react";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const orderId = searchParams.get("orderId");

  const { data: orderIdData } = useGetOrderById(Number(orderId));
  console.log("orderIdData", orderIdData);
  // if (orderIdData?.data?.status == "PAID") {
  //   return (
  //     <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
  //       <div className="mb-10">
  //         <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
  //         <h2 className="text-2xl">You successfully sent</h2>

  //         <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
  //           ${amount}
  //         </div>
  //       </div>
  //     </main>
  //   );
  // } else {
  //   return (
  //     <div className="text-center text-red-500">
  //       ❌ Payment failed or order not confirmed.
  //     </div>
  //   );
  // }
};

export default PaymentSuccess;
