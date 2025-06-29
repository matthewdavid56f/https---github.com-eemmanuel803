
"use client"

import * as React from "react"
import { DeviceStatusCard } from "@/components/device-status-card"
import { KeyMetricCard } from "@/components/key-metric-card"
import { ActivityFeed } from "@/components/activity-feed"
import { AlertTriangle, Hourglass, ShieldCheck } from "lucide-react"
import { ScreenTimeChart } from "@/components/screen-time-chart"

export default function DashboardPage() {
  return (
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
            <ScreenTimeChart />
        </div>
      </div>
    </main>
  )
}
