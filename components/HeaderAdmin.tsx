"use client";
import { usePathname } from "next/navigation";

const HeaderAdmin = () => {
  const pathname = usePathname();
  const headerText = [
    {
      title: "Dashboard",
      path: "/admin",
    },
    {
      title: "Orders",
      path: "/admin/orders",
    },
    {
      title: "Products",
      path: "/admin/products",
    },
    {
      title: "Customers",
      path: "/admin/customers",
    },
  ];
  return (
    <div className=" w-screen">
      <h1>
        {pathname === "/admin"
          ? "DashBoard"
          : pathname === "/admin/orders"
          ? "Orders"
          : pathname === "/admin/products"
          ? "Products"
          : pathname === "/admin/customers"
          ? "Customers"
          : ""}
      </h1>
    </div>
  );
};
export default HeaderAdmin;
