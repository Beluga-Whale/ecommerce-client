"use client";
import { useGetCustomerDetail } from "@/services/orderService";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useState } from "react";
import { CustomerDTO } from "../../../../types";

const CustomersPage = () => {
  const { data: customerDetailData } = useGetCustomerDetail();
  const containerStyle = useMemo(() => ({ width: "100%", height: 600 }), []);

  const [columnDefs] = useState<ColDef[]>([
    { headerName: "UserID", field: "id", filter: true },
    { headerName: "Email", field: "email", filter: true },
    { headerName: "Phone", field: "phone", filter: true },
    {
      headerName: "Orders",
      field: "orders",
    },
    {
      headerName: "TotalSpent",
      field: "totalSpent",
    },
    { headerName: "LastOrderDate", field: "lastOrderDate" },
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
        <AgGridReact<CustomerDTO>
          rowData={customerDetailData?.data ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
    </div>
  );
};
export default CustomersPage;
