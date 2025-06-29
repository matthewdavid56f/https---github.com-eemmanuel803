"use client"

import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface KeyMetricCardProps {
  title: string
  value: string
  icon: LucideIcon
  description: string
  variant?: "default" | "destructive"
}

export function KeyMetricCard({ title, value, icon: Icon, description, variant = "default" }: KeyMetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn(
            "h-4 w-4 text-muted-foreground",
            variant === "destructive" && "text-destructive"
        )} />
      </CardHeader>
      <CardContent>
        <div className={cn(
            "text-2xl font-bold",
             variant === "destructive" && "text-destructive"
        )}>{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
