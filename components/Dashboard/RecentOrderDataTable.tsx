import { useGetOrderAllByAdmin } from "@/services/orderService";
import { useMemo, useState } from "react";
import DropdownDataTableOrder from "../DropDownDataTable/DropdownDataTableOrder";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { OrderAllByAdminDTO } from "../../types";
import dayjs from "dayjs";
const RecentOrderDataTable = () => {
  const { data: orders } = useGetOrderAllByAdmin();
  const containerStyle = useMemo(() => ({ width: "100%", height: 250 }), []);
  const recentOrders = Array.isArray(orders?.data)
    ? orders.data
        .sort(
          (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
        )
        .slice(0, 5)
    : [];

  const [columnDefs] = useState<ColDef[]>([
    { headerName: "Order", field: "orderID" },
    { headerName: "Date", field: "createdAt" },
    {
      headerName: "Customer",
      field: "userName",
      cellRenderer: (params: any) => {
        return <p>{params.value}</p>;
      },
      sortable: true,
    },
    {
      headerName: "Status",
      field: "status",
      cellRenderer: (params: any) => {
        const status = params.value?.toLowerCase();
        let colorClass = "";

        switch (status) {
          case "pending":
            colorClass = "bg-yellow-100 text-yellow-500";
            break;
          case "paid":
            colorClass = "bg-blue-100 text-blue-500";
            break;
          case "shipped":
            colorClass = "bg-purple-100 text-purple-500";
            break;
          case "cancel":
            colorClass = "bg-red-100 text-red-500";
            break;
          case "complete":
            colorClass = "bg-green-100 text-green-500";
            break;
          default:
            colorClass = "bg-gray-100 text-gray-800";
        }

        return (
          <span
            className={`px-2 py-1 text-xs rounded-full font-semibold ${colorClass}`}
          >
            {params.value}
          </span>
        );
      },
    },
    { headerName: "Total", field: "totalPrice" },
    {
      headerName: "items",
      field: "orderItem",
      cellRenderer: (params: any) => {
        const listItem = params.value?.length;
        return <p>{listItem}</p>;
      },
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
    };
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto h-[330px] p-4  rounded-xl shadow-md">
      <h2 className="text-center font-semibold text-xl mb-2">Recent Orders</h2>
      <div style={containerStyle} className="ag-theme-alpine  ">
        <AgGridReact<OrderAllByAdminDTO>
          rowData={recentOrders ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
};
export default RecentOrderDataTable;
