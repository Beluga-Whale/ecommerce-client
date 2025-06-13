"use client";
import { AppSidebar } from "@/components/AppSideBar";
import HeaderAdmin from "@/components/HeaderAdmin";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      {pathname === "/admin/login" ? (
        <main>{children}</main>
      ) : (
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      )}
    </>
  );
}
