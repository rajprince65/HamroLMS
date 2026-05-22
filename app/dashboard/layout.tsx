"use client";
import "@/CSS/dashboard.css";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import AppSidebar from "@/components/dashboard/sidebar/SideBar";
import Header from "@/components/dashboard/sidebar/header";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";

function LayoutInner({ children }: { children: ReactNode }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const pathname = usePathname();
  const isWide = isExpanded || isHovered || isMobileOpen;
  const isFlushTopRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/dashboard") ;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <AppSidebar />
      <div
        className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ease-in-out ${
          isWide ? "lg:ml-[290px]" : "lg:ml-[90px]"
        }`}
      >
        <Header />
        <main className={`flex-1 overflow-y-auto px-6 pb-6 ${isFlushTopRoute ? "pt-0" : "pt-6"}`}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <LayoutInner>{children}</LayoutInner>
    </SidebarProvider>
  );
}