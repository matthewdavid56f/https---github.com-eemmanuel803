
"use client"

import * as React from "react"
import { DeviceStatusCard } from "@/components/device-status-card"
import { KeyMetricCard } from "@/components/key-metric-card"
import { ActivityFeed } from "@/components/activity-feed"
import { AlertTriangle, Hourglass, ShieldCheck, ShieldAlert, FileImage, Smartphone, ClipboardCopy } from "lucide-react"
import { ScreenTimeChart } from "@/components/screen-time-chart"
import type { Activity } from "@/components/activity-feed"
import type { ScreenTimeData } from "@/components/screen-time-chart"
import { Badge } from "@/components/ui/badge"

type Child = {
  id: string;
  name: string;
  avatar: string;
  deviceName: string;
  isOnline: boolean;
  batteryLevel: number;
  metrics: {
    alerts: string;
    alertsDescription: string;
    screenTime: string;
    screenTimeDescription: string;
    appsChecked: string;
    appsCheckedDescription: string;
  };
  activities: Activity[];
  screenTimeData: ScreenTimeData;
}

const childrenData: Child[] = [
  {
    id: 'alex',
    name: 'Alex',
    avatar: 'https://placehold.co/40x40.png',
    deviceName: 'Galaxy S22',
    isOnline: true,
    batteryLevel: 82,
    metrics: {
      alerts: '3',
      alertsDescription: '2 new since last login',
      screenTime: '4h 32m',
      screenTimeDescription: '+15m from yesterday',
      appsChecked: '12',
      appsCheckedDescription: 'All apps are safe'
    },
    activities: [
      {
        icon: <ShieldAlert className="size-5 text-destructive" />,
        title: "Harmful Content Detected",
        description: "AI detected a potentially harmful message in a chat application.",
        time: "2m ago",
        details: {
          source: "Notification",
          reason: "The message contains bullying language.",
          isHarmful: true
        },
        badge: <Badge variant="destructive">Urgent</Badge>
      },
      {
        icon: <FileImage className="size-5" />,
        title: "New Screenshot Captured",
        description: "A screenshot of a social media post was taken.",
        time: "15m ago",
      },
      {
        icon: <Smartphone className="size-5 text-blue-500" />,
        title: "New App Installed",
        description: "'Clash of Clans' was installed from the Play Store.",
        time: "1h ago",
        badge: <Badge variant="secondary">Info</Badge>
      },
    ],
    screenTimeData: [
      { app: "YouTube", minutes: 125, fill: "var(--color-youtube)" },
      { app: "TikTok", minutes: 90, fill: "var(--color-tiktok)" },
      { app: "Minecraft", minutes: 60, fill: "var(--color-minecraft)" },
      { app: "Chrome", minutes: 45, fill: "var(--color-chrome)" },
      { app: "Instagram", minutes: 32, fill: "var(--color-instagram)" },
      { app: "Other", minutes: 20, fill: "var(--color-other)" },
    ]
  },
  {
    id: 'ben',
    name: 'Ben',
    avatar: 'https://placehold.co/40x40.png',
    deviceName: 'Pixel 6a',
    isOnline: false,
    batteryLevel: 45,
    metrics: {
      alerts: '1',
      alertsDescription: 'No new alerts',
      screenTime: '2h 10m',
      screenTimeDescription: '-30m from yesterday',
      appsChecked: '15',
      appsCheckedDescription: 'All apps are safe'
    },
    activities: [
       {
        icon: <ShieldAlert className="size-5 text-amber-500" />,
        title: "Suspicious Website Visited",
        description: "AI flagged a website with unmoderated chat features.",
        time: "3h ago",
        details: {
          source: "Screenshot",
          reason: "The website contains a public chat room which may expose the child to strangers.",
          isHarmful: true
        },
        badge: <Badge variant="outline" className="border-amber-500 text-amber-500">Warning</Badge>
      },
      {
        icon: <ClipboardCopy className="size-5" />,
        title: "Clipboard Content Copied",
        description: "A URL was copied to the clipboard: https://gaming-forum.com/...",
        time: "4h ago",
      },
    ],
    screenTimeData: [
      { app: "Roblox", minutes: 70, fill: "var(--color-youtube)" },
      { app: "Chrome", minutes: 30, fill: "var(--color-chrome)" },
      { app: "Messages", minutes: 20, fill: "var(--color-minecraft)" },
      { app: "Other", minutes: 10, fill: "var(--color-other)" },
    ]
  },
  {
    id: 'chloe',
    name: 'Chloe',
    avatar: 'https://placehold.co/40x40.png',
    deviceName: 'iPhone 13',
    isOnline: true,
    batteryLevel: 95,
    metrics: {
      alerts: '0',
      alertsDescription: 'No alerts today',
      screenTime: '5h 5m',
      screenTimeDescription: '+45m from yesterday',
      appsChecked: '10',
      appsCheckedDescription: 'All apps are safe'
    },
    activities: [
      {
        icon: <Smartphone className="size-5 text-blue-500" />,
        title: "New App Installed",
        description: "'BeReal' was installed from the App Store.",
        time: "2h ago",
        badge: <Badge variant="secondary">Info</Badge>
      },
      {
        icon: <FileImage className="size-5" />,
        title: "New Screenshot Captured",
        description: "A screenshot of a FaceTime call was taken.",
        time: "5h ago",
      },
    ],
    screenTimeData: [
      { app: "TikTok", minutes: 180, fill: "var(--color-tiktok)" },
      { app: "Instagram", minutes: 75, fill: "var(--color-instagram)" },
      { app: "Safari", minutes: 30, fill: "var(--color-chrome)" },
      { app: "FaceTime", minutes: 20, fill: "var(--color-minecraft)" },
    ]
  }
]


export default function DashboardPage() {
  const [selectedChildId, setSelectedChildId] = React.useState(childrenData[0].id)

  const selectedChild = childrenData.find(c => c.id === selectedChildId) || childrenData[0]

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
