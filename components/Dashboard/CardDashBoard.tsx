import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  Users,
  ShoppingBag,
  Truck,
} from "lucide-react";
import clsx from "clsx";

type CardDashBoardProps = {
  title: string;
  value: number | string;
  growth: number;
  icon: "revenue" | "orders" | "customers" | "delivery";
};

const iconMap = {
  revenue: <DollarSign className="w-6 h-6 text-green-600" />,
  orders: <ShoppingBag className="w-6 h-6 text-blue-600" />,
  customers: <Users className="w-6 h-6 text-purple-600" />,
  delivery: <Truck className="w-6 h-6 text-orange-600" />,
};

const CardDashBoard = ({
  title,
  value,
  growth,
  icon = "orders",
}: CardDashBoardProps) => {
  const isPositive = (growth ?? 0) >= 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm w-full flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-800">{value}</p>
        </div>
        <div className="bg-gray-100 p-2 rounded-full">{iconMap[icon]}</div>
      </div>

      {growth !== undefined && (
        <div className="mt-3 flex items-center text-sm">
          {isPositive ? (
            <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
          ) : (
            <ArrowDown className="w-4 h-4 text-red-600 mr-1" />
          )}
          <span
            className={clsx("font-medium", {
              "text-green-600": isPositive,
              "text-red-600": !isPositive,
            })}
          >
            {Math.abs(growth)}%
          </span>
          <span className="ml-1 text-gray-500">จากเดือนที่แล้ว</span>
        </div>
      )}
    </div>
  );
};

export default CardDashBoard;
