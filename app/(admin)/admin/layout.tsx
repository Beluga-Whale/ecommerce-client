"use client";
import { AppSidebar } from "@/components/AppSideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") return <main>{children}</main>;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex-1">
          <div className="p-4 border-b">
            <SidebarTrigger />
          </div>

          <main className="p-4 w-[calc(100%-350px)]">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
