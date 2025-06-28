import { useGetProductTop } from "@/services/orderService";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
const BarChartTopProduct = () => {
  const { data: productTops, isLoading } = useGetProductTop();

  const productNames =
    productTops?.data?.map((item) => `${item.name} (#${item.productId})`) ?? [];
  const totalSold = productTops?.data?.map((item) => item.totalSold) ?? [];

  const series = [
    {
      data: totalSold,
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 225,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: productNames,
    },
  };

  if (isLoading || !productTops) {
    return (
      <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-xl shadow-md">
        <h2 className="text-center font-semibold text-lg mb-2">
          Top Product Sell
        </h2>
        <p className="text-center text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-center font-semibold text-xl mb-2">
        Top Product Sell
      </h2>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        width="100%"
        height={225}
      />
    </div>
  );
};
export default BarChartTopProduct;
