"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Battery, Smartphone } from "lucide-react"

export function DeviceStatusCard() {
  const batteryLevel = 82
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Child Device Status</CardTitle>
        <Smartphone className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="https://placehold.co/40x40.png" alt="Child's avatar" data-ai-hint="child avatar" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-bold">Alex's Phone</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <Badge variant="outline" className="mr-2 border-green-500 bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400">Online</Badge>
              <span>Galaxy S22</span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
             <div className="flex items-center">
              <Battery className="mr-1 h-4 w-4" />
              <span>Battery</span>
            </div>
            <span className="font-semibold text-foreground">{batteryLevel}%</span>
          </div>
          <Progress value={batteryLevel} className="mt-1 h-2" />
        </div>
      </CardContent>
    </Card>
  )
}
