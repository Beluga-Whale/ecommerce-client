"use client";

import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ClientSideRowModelModule,
  ColDef,
  ModuleRegistry,
  PaginationModule,
} from "ag-grid-community";

import { Button } from "@/components/ui/button";
import { useGetAllCategory } from "@/services/categoryServices";
import dayjs from "dayjs";
import DialogEditCategory from "@/components/Dialog/DialogEditCategory";
import DropdownDataTableCategory from "@/components/DropDownDataTable/DropdownDataTableCategory";
import DialogDeleteCategory from "@/components/Dialog/DialogDeleteCategory";
import DialogAddCategory from "@/components/Dialog/DialogAddCategory";
import { useAppDispatch } from "@/lib/hooks";
import { setDialogAddCategoryOpen } from "@/lib/features/dialog/dialogSlice";

const CategoryPage = () => {
  const router = useRouter();
  const { data: categoryData } = useGetAllCategory();
  const dispatch = useAppDispatch();
  const containerStyle = useMemo(() => ({ width: "100%", height: 600 }), []);

  const [columnDefs] = useState<ColDef[]>([
    { headerName: "ID", field: "ID", filter: true, sortable: true },
    { headerName: "Name", field: "Name", filter: true },
    {
      headerName: "Created At",
      field: "CreatedAt",
      valueFormatter: (params) =>
        dayjs(params.value).format("YYYY-MM-DD HH:mm"),
    },
    {
      headerName: "Updated At",
      field: "UpdatedAt",
      valueFormatter: (params) =>
        dayjs(params.value).format("YYYY-MM-DD HH:mm"),
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params: any) => {
        return (
          <div className="flex items-center h-full">
            <DropdownDataTableCategory
              categoryId={params?.data?.ID}
              categoryname={params?.data?.Name}
            />
          </div>
        );
      },
    },
  ]);

  const handlerAddCategory = () => {
    dispatch(setDialogAddCategoryOpen());
  };

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
    };
  }, []);

  return (
    <div className="p-4">
      <Button onClick={() => handlerAddCategory()}>Add Category</Button>
      <div style={containerStyle} className="ag-theme-alpine mt-4">
        <AgGridReact
          rowData={categoryData?.data ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
      <DialogAddCategory />
      <DialogEditCategory />
      <DialogDeleteCategory />
    </div>
  );
};

export default CategoryPage;
