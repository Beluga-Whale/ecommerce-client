"use client";

import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ClientSideRowModelModule,
  ColDef,
  ModuleRegistry,
  PaginationModule,
} from "ag-grid-community";

ModuleRegistry.registerModules([PaginationModule, ClientSideRowModelModule]);

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useFetchJson } from "@/components/useFetchJson";
import { IOlympicData } from "@/types";
import { useGetAllProducts } from "@/services/productervices";

const ProductsPage = () => {
  const router = useRouter();
  const containerStyle = useMemo(() => ({ width: "100%", height: 600 }), []);
  const { data: productsData } = useGetAllProducts();

  const [columnDefs] = useState<ColDef[]>([
    { headerName: "Name", field: "name" },
    {
      headerName: "Image",
      field: "images",
      cellRenderer: (params: any) => {
        const url = params.value?.[0]?.url ?? "https://via.placeholder.com/50";
        return (
          <img
            src={url}
            alt="Product"
            className="w-[50px] h-[50px] object-cover rounded-md"
          />
        );
      },
    },
    { headerName: "Category", field: "categoryID" },
    {
      headerName: "Stock",
      field: "stock", // ต้องใส่ field หรือ valueGetter ให้ AG Grid รู้ว่าใช้ค่านี้ในการ sort
      valueGetter: (params) => {
        const variants = params.data.variants ?? [];
        return variants.reduce(
          (sum: number, v: any) => sum + (v.stock ?? 0),
          0
        );
      },
      cellRenderer: (params: any) => {
        return <p>{params.value}</p>; // ✅ ใช้ value ที่คำนวณจาก valueGetter
      },
      sortable: true, // optional (AG Grid เปิด sortable ให้ทุก column ที่มีค่าอยู่แล้ว)
    },

    { headerName: "IsOnSale", field: "isOnSale" },
    { headerName: "IsFeatured", field: "isFeatured" },
  ]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
    };
  }, []);

  return (
    <div className="p-4">
      <Button onClick={() => router.push("/admin/products/addproduct")}>
        Add Products
      </Button>
      <div style={containerStyle} className="ag-theme-alpine mt-4">
        <AgGridReact<IOlympicData>
          rowData={productsData?.data?.products}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
