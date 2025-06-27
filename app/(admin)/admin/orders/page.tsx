"use client";

import { useGetOrderAllByAdmin } from "@/services/orderService";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useState } from "react";

import { OrderAllByAdminDTO } from "../../../../types";
import { Pencil, Trash2 } from "lucide-react";

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
    { headerName: "Status", field: "status" },
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
      cellRenderer: () => {
        return (
          <div className="flex items-center h-full space-x-5">
            <div className="bg-yellow-100 text-yellow-400 rounded-full p-1">
              <Pencil />
            </div>
            <div className="bg-red-100 text-red-700 rounded-full p-1">
              <Trash2 />
            </div>
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
    <div>
      <div style={containerStyle} className="ag-theme-alpine mt-4">
        <AgGridReact<OrderAllByAdminDTO>
          rowData={orders?.data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
    </div>
  );
};
export default OrdersPage;
