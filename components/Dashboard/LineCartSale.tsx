import { useGetSalePerDay } from "@/services/orderService";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

const LineCartSale = () => {
  const { data: saleData } = useGetSalePerDay();

  const salesChartData = Array.isArray(saleData?.data)
    ? saleData.data.map((item) => ({
        x: item.date,
        y: item.totalSale,
      }))
    : [];

  const options: ApexOptions = {
    chart: {
      type: "area",
      stacked: false,
      height: 225,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: (val: any) => `${val}`,
      },
      title: {
        text: "Total Sales",
      },
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      shared: false,
      y: {
        formatter: (val: any) => `${val}`,
      },
    },
  };

  const series = [
    {
      name: "Sales",
      data: salesChartData,
    },
  ];

  return (
    <div className="w-full  mx-auto p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-center font-semibold text-xl mb-2">Sale Over Time</h2>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={225}
      />
    </div>
  );
};
export default LineCartSale;
