
"use client"

import * as React from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarRail,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { DashboardNav } from "@/components/dashboard-nav"
import { Info } from "lucide-react"
import { ChildProvider } from "@/contexts/child-context"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true)
  return (
    <ChildProvider>
      <SidebarProvider open={isSidebarOpen} onOpenChange={setSidebarOpen}>
        <Sidebar>
          <DashboardNav />
          <SidebarRail />
        </Sidebar>
        <SidebarInset className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6 md:hidden">
            <SidebarTrigger />
          </header>
          <div className="flex-1 flex flex-col min-h-0">
              {children}
          </div>
          <footer className="mt-auto p-2 text-xs flex items-center justify-center gap-2 bg-[#4a3a22] text-[#e0c9a6] border-t border-amber-800/50">
              <Info className="h-4 w-4 shrink-0" />
              <p className="text-center">
                Disclaimer: This tool is for demonstrating UI capabilities. Real-world use is intended for legal, ethical parental monitoring with the child&apos;s full knowledge and consent. Unauthorized surveillance is illegal and unethical.
              </p>
          </footer>
        </SidebarInset>
      </SidebarProvider>
    </ChildProvider>
  )
}
