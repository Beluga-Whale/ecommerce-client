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
import { ProductDTO } from "@/types";
import { useGetAllProducts } from "@/services/productServices";
import { useGetAllCategory } from "@/services/categoryServices";
import DropdownDataTableProducts from "@/components/DropDownDataTable/DropdownDataTableProducts";
import DialogDeleteProduct from "@/components/Dialog/DialogDeleteProduct";

const ProductsPage = () => {
  const router = useRouter();
  const { data: productsData } = useGetAllProducts(
    undefined,
    undefined,
    undefined,
    0
  );
  const containerStyle = useMemo(() => ({ width: "100%", height: 600 }), []);
  const [columnDefs] = useState<ColDef[]>([
    { headerName: "Name", field: "name", filter: true },
    { headerName: "Title", field: "title", filter: true },
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
      filter: true,
    },
    {
      headerName: "Stock",
      field: "stock",
      valueGetter: (params) => {
        const variants = params.data.variants ?? [];
        return variants.reduce(
          (sum: number, v: any) => sum + (v.stock ?? 0),
          0
        );
      },
      cellRenderer: (params: any) => {
        return <p>{params.value}</p>;
      },
      sortable: true,
    },

    { headerName: "IsOnSale", field: "isOnSale" },
    { headerName: "IsFeatured", field: "isFeatured" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params: any) => {
        return (
          <div className="flex items-center h-full">
            <DropdownDataTableProducts
              idProduct={params?.data?.id}
              nameProduct={params?.data?.name}
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
      <Button onClick={() => router.push("/admin/products/addproduct")}>
        Add Products
      </Button>
      <div style={containerStyle} className="ag-theme-alpine mt-4">
        <AgGridReact<ProductDTO>
          rowData={productsData?.data?.products}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
      <DialogDeleteProduct />
    </div>
  );
};

export default ProductsPage;
