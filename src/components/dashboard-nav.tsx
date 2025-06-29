"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Logo } from "@/components/icons"
import { Bell, LayoutDashboard, LineChart, Settings } from "lucide-react"

export function DashboardNav() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="flex h-full flex-col">
      <SidebarHeader className="h-14">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="size-8 text-primary-foreground" />
          <span className="text-lg font-semibold text-primary-foreground">Guad Eyes</span>
        </Link>
      </SidebarHeader>

      <SidebarGroup className="flex-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/dashboard")}
              tooltip="Dashboard"
            >
              <Link href="#">
                <LayoutDashboard />
                Dashboard
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/alerts")} tooltip="Alerts">
              <Link href="#">
                <Bell />
                Alerts
                <span className="ml-auto inline-flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                  3
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/reports")} tooltip="Reports">
              <Link href="#">
                <LineChart />
                Reports
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/settings")} tooltip="Settings">
              <Link href="#">
                <Settings />
                Settings
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </div>
  )
}
