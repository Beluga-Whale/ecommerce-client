"use client";

import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ClientSideRowModelModule,
  ColDef,
  ModuleRegistry,
  PaginationModule,
} from "ag-grid-community";
import { AspectRatio } from "@/components/ui/aspect-ratio";

ModuleRegistry.registerModules([PaginationModule, ClientSideRowModelModule]);

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProductBodyDTO } from "@/types";
import { useGetAllProducts } from "@/services/productServices";
import { useGetAllCategory } from "@/services/categoryServices";
import DropdownDataTableProducts from "@/components/DropDownDataTable/DropdownDataTableProducts";

const ProductsPage = () => {
  const router = useRouter();
  const { data: productsData } = useGetAllProducts();
  const containerStyle = useMemo(() => ({ width: "100%", height: 600 }), []);
  const [columnDefs] = useState<ColDef[]>([
    { headerName: "Name", field: "name" },
    {
      headerName: "Image",
      field: "images",
      cellRenderer: (params: any) => {
        const url = params.value?.[0]?.url ?? "https://via.placeholder.com/50";
        return (
          <div className="p-3">
            <img
              src={url}
              alt="Product"
              className="w-[40px] h-[25px] object-cover rounded-md"
            />
          </div>
        );
      },
    },
    {
      headerName: "Category",
      field: "categoryID",
      cellRenderer: (params: any) => {
        const { data: categoryData } = useGetAllCategory();
        const category = categoryData?.data?.find(
          (item: any) => item.ID == params?.data?.categoryID
        );
        return <>{category?.Name ?? "-"}</>;
      },
    },
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
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params: any) => {
        return (
          <div className="flex items-center h-full">
            <DropdownDataTableProducts idProduct={params?.data?.id} />
            {/* 
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button> */}
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
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
        <Button onClick={() => router.push("/admin/products/addproduct")}>
          Add Products
        </Button>
        <div style={containerStyle} className="ag-theme-alpine mt-4">
          <AgGridReact<ProductBodyDTO>
            rowData={productsData?.data?.products}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
          />
        </div>
      </AspectRatio>
    </div>
  );
};

export default ProductsPage;
