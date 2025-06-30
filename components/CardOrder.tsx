"use client";
import { useGetOrderAllByUserId } from "@/services/orderService";
import { OrderAllByUserId } from "@/types";
import dayjs from "dayjs";
import { Package } from "lucide-react";
import Link from "next/link";

const CardOrder = () => {
  const { data: ordersData } = useGetOrderAllByUserId();

  return (
    <div className="min-h-screen  py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-amber-600 mb-6">
          My Order History
        </h1>
        <div className="space-y-4">
          {ordersData?.data?.map((order: OrderAllByUserId) => (
            <Link
              href={`/myorder/${order.orderID}`}
              key={order.orderID}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-start md:items-center hover:bg-amber-200"
            >
              <div className="flex items-start gap-3">
                <Package className="text-amber-500 w-6 h-6 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">
                    Order ID: #{order.orderID}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Date: {dayjs(order.createdAt).format("DD/MM/YYYY")}
                  </p>
                  <p className="text-sm mt-1">
                    Status:{" "}
                    <span
                      className={`font-medium ${
                        order.status === "paid"
                          ? "text-blue-500"
                          : order.status === "pending"
                          ? "text-yellow-500"
                          : order.status === "shipped"
                          ? "text-purple-500"
                          : order.status === "complete"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-4 md:mt-0 text-right">
                <p className="text-lg font-bold text-amber-600">
                  ${order.totalPrice}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CardOrder;
