
"use client"

import * as React from "react"
import { DeviceStatusCard } from "@/components/device-status-card"
import { KeyMetricCard } from "@/components/key-metric-card"
import { ActivityFeed } from "@/components/activity-feed"
import { AlertTriangle, Hourglass, ShieldCheck } from "lucide-react"
import { ScreenTimeChart } from "@/components/screen-time-chart"
import { useChild } from "@/contexts/child-context"


export default function DashboardPage() {
  const { childrenData, selectedChild, setSelectedChildId } = useChild()

  return (
    <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DeviceStatusCard
            childrenData={childrenData}
            selectedChild={selectedChild}
            onChildChange={setSelectedChildId}
          />
          <KeyMetricCard
            title="Alerts Today"
            value={selectedChild.metrics.alerts}
            icon={AlertTriangle}
            description={selectedChild.metrics.alertsDescription}
            variant="destructive"
          />
          <KeyMetricCard
            title="Screen Time"
            value={selectedChild.metrics.screenTime}
            icon={Hourglass}
            description={selectedChild.metrics.screenTimeDescription}
          />
          <KeyMetricCard
            title="Apps Checked"
            value={selectedChild.metrics.appsChecked}
            icon={ShieldCheck}
            description={selectedChild.metrics.appsCheckedDescription}
          />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
            <ActivityFeed activities={selectedChild.activities} />
            <ScreenTimeChart chartData={selectedChild.screenTimeData} />
        </div>
      </div>
    </main>
  )
}
