
"use client"

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Smartphone } from "lucide-react"
import type { ChildSummary, Child } from "@/lib/data"

interface DeviceStatusCardProps {
  childrenData: ChildSummary[];
  selectedChild: Child;
  onChildChange: (id: string) => void;
}

export function DeviceStatusCard({ childrenData, selectedChild, onChildChange }: DeviceStatusCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Select value={selectedChild.id} onValueChange={onChildChange}>
          <SelectTrigger className="w-auto border-0 shadow-none focus:ring-0 text-sm font-medium p-0 h-auto">
            <SelectValue placeholder="Select a child" />
          </SelectTrigger>
          <SelectContent>
            {childrenData.map(child => (
              <SelectItem key={child.id} value={child.id}>{child.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Smartphone className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={selectedChild.avatar} alt={selectedChild.name} data-ai-hint="child avatar" />
            <AvatarFallback>{selectedChild.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-bold">{selectedChild.name}</p>
            <p className="text-xs text-muted-foreground">Demonstration Device</p>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground p-4 bg-muted/50 rounded-md">
          Connect a device to see live status and battery information.
        </div>
      </CardContent>
    </Card>
  )
}
