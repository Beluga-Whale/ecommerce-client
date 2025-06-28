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
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const series = [
    Number(summaryData?.data?.statusPending),
    Number(summaryData?.data?.statusPaid),
    Number(summaryData?.data?.statusShipped),
    Number(summaryData?.data?.statusCancel),
  ];

  return (
    <div className="w-full flex justify-center items-center">
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        width={380}
      />
    </div>
  );
};

export default DonutChart;
