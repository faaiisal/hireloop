import React from 'react';
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "../components/DashboardSidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <DashboardSidebar />
      <SidebarInset className="bg-[#0A0A0A]">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-white/[0.06] px-4">
          <SidebarTrigger className="text-white/70 hover:text-white" />
        </header>
        <div className="flex flex-1 flex-col p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;