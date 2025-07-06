"use client";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tags,
} from "lucide-react";
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
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSignOut } from "@/services/authServices";

const menuItems = [
  { title: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { title: "Orders", path: "/admin/orders", icon: ShoppingCart },
  { title: "Products", path: "/admin/products", icon: Package },
  { title: "Customers", path: "/admin/customers", icon: Users },
  { title: "Category", path: "/admin/category", icon: Tags },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { mutateAsync: logoutMutate } = useSignOut();

  const handlerLogout = async () => {
    try {
      await logoutMutate();
      toast.success("Logged out successfully.", {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      toast.error("Logout failed. Please try again.", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

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
              <Separator />
              <Button
                className="hover:cursor-pointer mt-5"
                onClick={() => handlerLogout()}
              >
                Logout
              </Button>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
