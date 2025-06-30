"use client";

import { useGetOrderAllByAdmin } from "@/services/orderService";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useState } from "react";

import { OrderAllByAdminDTO } from "../../../../types";
import DialogEditStatus from "@/components/Dialog/DialogEditStatus";
import DropdownDataTableOrder from "@/components/DropDownDataTable/DropdownDataTableOrder";
import DialogDeleteOrder from "@/components/Dialog/DialogDeleteOrder";

const OrdersPage = () => {
  const { data: orders } = useGetOrderAllByAdmin();
  const containerStyle = useMemo(() => ({ width: "100%", height: 600 }), []);

  const [columnDefs] = useState<ColDef[]>([
    { headerName: "Order", field: "orderID", filter: true },
    { headerName: "Date", field: "createdAt", filter: true },
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
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params: any) => {
        return (
          <div className="flex items-center h-full space-x-5">
            <DropdownDataTableOrder
              orderId={params?.data?.orderID}
              status={params?.data?.status}
            />
          </div>
        );
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
    <div className="p-4">
      <div style={containerStyle} className="ag-theme-alpine mt-4">
        <AgGridReact<OrderAllByAdminDTO>
          rowData={orders?.data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
      <DialogEditStatus />
      <DialogDeleteOrder />
    </div>
  );
};
export default OrdersPage;
