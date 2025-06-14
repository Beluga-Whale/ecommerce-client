"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

// Menu items.

export function AppSidebar() {
  const pathname = usePathname();
  const activeColor = (path: string) => {
    return pathname == path ? "text-white " : "text-black";
  };

  const activeBgColor = (path: string) => {
    return pathname == path ? "bg-amber-400 text-white rounded-md " : "bg-none";
  };

  const items = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: <Home className={activeColor("/admin")} />,
    },
    {
      title: "Orders",
      path: "/admin/orders",
      icon: <Inbox className={activeColor("/admin/orders")} />,
    },
    {
      title: "Products",
      path: "/admin/products",
      icon: <Calendar className={activeColor("/admin/products")} />,
    },
    {
      title: "Customers",
      path: "/admin/customers",
      icon: <Search className={activeColor("/admin/customers")} />,
    },
  ];
  return (
    <Sidebar className=" ">
      <SidebarContent className="font-semibold p-2 ">
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold text-xl">
            <span className="text-amber-400">B</span>E
            <span className="text-amber-400">L</span>U
            <span className="text-amber-400">G</span>A
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-5">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={activeBgColor(item?.path)}
                >
                  <SidebarMenuButton asChild>
                    <a href={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
