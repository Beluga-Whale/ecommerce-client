"use client";

import { Home, Inbox, Calendar, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

const menuItems = [
  { title: "Dashboard", path: "/admin", icon: Home },
  { title: "Orders", path: "/admin/orders", icon: Inbox },
  { title: "Products", path: "/admin/products", icon: Calendar },
  { title: "Customers", path: "/admin/customers", icon: Search },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="bg-white border-r shadow-sm w-[250px] h-full">
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl font-bold">
            <span className="text-amber-400">B</span>E
            <span className="text-amber-400">L</span>U
            <span className="text-amber-400">G</span>A
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-6">
            <SidebarMenu>
              {menuItems.map(({ title, path, icon: Icon }) => {
                const isActive = pathname === path;

                return (
                  <SidebarMenuItem
                    key={title}
                    className={`${
                      isActive
                        ? "bg-amber-400 text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    } rounded-md transition`}
                  >
                    <SidebarMenuButton asChild>
                      <Link
                        href={path}
                        className="flex items-center gap-3 px-3 py-2"
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
