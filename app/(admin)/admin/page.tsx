"use client";
import BarChartTopProduct from "@/components/Dashboard/BarChartTopProduct";
import CardDashBoard from "@/components/Dashboard/CardDashBoard";
import DonutChart from "@/components/Dashboard/DonutChart";
import LineCartSale from "@/components/Dashboard/LineCartSale";
import RecentOrderDataTable from "@/components/Dashboard/RecentOrderDataTable";
import { useGetSummaryDashboard } from "@/services/orderService";
const AdminPage = () => {
  const { data: summaryData } = useGetSummaryDashboard();
  if (!summaryData?.data) {
    return (
      <div className="p-4 text-center text-gray-500">
        Loading summary data...
      </div>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 ">
        <CardDashBoard
          title="Total Orders"
          value={summaryData?.data?.orderTotal ?? 0}
          growth={summaryData?.data?.orderGrowthPercent ?? 0}
          icon="orders"
        />

        <CardDashBoard
          title="Total Revenue"
          value={`$ ${
            summaryData?.data?.revenueThisMonth.toFixed(2) ?? "0.00"
          }`}
          growth={summaryData?.data?.revenueGrowthPercent ?? 0}
          icon="revenue"
        />

        <CardDashBoard
          title="Customers"
          value={summaryData?.data?.customersThisMonth ?? 0}
          growth={summaryData?.data?.customerGrowthPercent ?? 0}
          icon="customers"
        />

        <CardDashBoard
          title="Orders This Month"
          value={summaryData?.data?.ordersThisMonth ?? 0}
          growth={summaryData?.data?.orderGrowthPercent ?? 0}
          icon="delivery"
        />
      </div>
      <div className="grid grid-cols-4  gap-4 p-4">
        <div className="col-span-4 lg:col-span-2">
          <LineCartSale />
        </div>
        <div className="col-span-4 lg:col-span-2">
          <BarChartTopProduct />
        </div>
      </div>
      {/* <div className="grid grid-cols-1  xl:grid-cols-4 gap-4 p-4">
        <div className="col-span-4 xl:col-span-2">
          <RecentOrderDataTable />
        </div>
        <div className="col-span-4 xl:col-span-2">
          <DonutChart />
        </div>
      </div> */}
    </div>
  );
};
export default AdminPage;
