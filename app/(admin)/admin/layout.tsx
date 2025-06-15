"use client";
import { AppSidebar } from "@/components/AppSideBar";
import HeaderAdmin from "@/components/HeaderAdmin";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      {pathname === "/admin/login" ? (
        <main>{children}</main>
      ) : (
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">{children}</main>
        </SidebarProvider>
      )}
    </>
  );
}
