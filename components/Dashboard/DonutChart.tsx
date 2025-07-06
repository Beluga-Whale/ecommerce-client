"use client";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useGetSummaryDashboard } from "@/services/orderService";
const DonutChart = () => {
  const { data: summaryData } = useGetSummaryDashboard();

  const options: ApexOptions = {
    chart: {
      type: "donut", // literal type "donut"
    },
    labels: ["Pending", "Paid", "Shipped", "Cancel"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 260,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const series = [
    Number(summaryData?.data?.statusPending ?? 0),
    Number(summaryData?.data?.statusPaid ?? 0),
    Number(summaryData?.data?.statusShipped ?? 0),
    Number(summaryData?.data?.statusCancel ?? 0),
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-center font-semibold text-xl mb-2">Order Status</h2>
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        width="100%"
        height={260}
      />
    </div>
  );
};

export default DonutChart;
