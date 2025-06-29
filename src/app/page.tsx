"use client"

import * as React from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarInset,
  SidebarRail,
} from "@/components/ui/sidebar"
import { DashboardNav } from "@/components/dashboard-nav"
import { Header } from "@/components/header"
import { DeviceStatusCard } from "@/components/device-status-card"
import { KeyMetricCard } from "@/components/key-metric-card"
import { ActivityFeed } from "@/components/activity-feed"
import { RemoteControl } from "@/components/remote-control"
import { AlertTriangle, Hourglass, ShieldCheck } from "lucide-react"

export default function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true)
  return (
    <SidebarProvider open={isSidebarOpen} onOpenChange={setSidebarOpen}>
      <Sidebar>
        <DashboardNav />
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <Header />
        <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <DeviceStatusCard />
              <KeyMetricCard
                title="Alerts Today"
                value="3"
                icon={AlertTriangle}
                description="2 new since last login"
                variant="destructive"
              />
              <KeyMetricCard
                title="Screen Time"
                value="4h 32m"
                icon={Hourglass}
                description="+15m from yesterday"
              />
              <KeyMetricCard
                title="Apps Checked"
                value="12"
                icon={ShieldCheck}
                description="All apps are safe"
              />
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
                <ActivityFeed />
                <RemoteControl />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
