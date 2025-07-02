"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Logo } from "@/components/icons"
import { LayoutDashboard, MapPin, Users, Phone, MessageSquare, Camera, Folder, Settings, Shield } from "lucide-react"

export function DashboardNav() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    { href: "/dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
    { href: "/location", icon: <MapPin />, label: "Location" },
    { href: "/contacts", icon: <Users />, label: "Contacts" },
    { href: "/call-logs", icon: <Phone />, label: "Call Logs" },
    { href: "/sms-messages", icon: <MessageSquare />, label: "SMS Messages" },
    { href: "/live-view", icon: <Camera />, label: "Live View" },
    { href: "/file-explorer", icon: <Folder />, label: "File Explorer" },
    { href: "/app-settings", icon: <Settings />, label: "App Settings" },
    { href: "/device-controls", icon: <Shield />, label: "Device Controls" },
  ]

  return (
    <div className="flex h-full flex-col">
      <SidebarHeader className="h-14">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="size-8" />
          <span className="text-lg font-semibold text-foreground group-data-[collapsible=icon]:hidden">Guad eyes</span>
        </Link>
      </SidebarHeader>

      <SidebarGroup className="flex-1">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.href)}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </div>
  )
}
