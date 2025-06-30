
"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Smartphone, Loader2 } from "lucide-react"
import type { ChildSummary, Child } from "@/lib/data"

interface DeviceStatusCardProps {
  childrenData: ChildSummary[];
  selectedChild: Child | null;
  onChildChange: (id: string | null) => void;
}

export function DeviceStatusCard({ childrenData, selectedChild, onChildChange }: DeviceStatusCardProps) {
  
  if (!selectedChild && childrenData.length === 0) {
     return (
       <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">No Device Connected</CardTitle>
           <Smartphone className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground mt-4">
              Pair a device to begin monitoring.
          </div>
        </CardContent>
      </Card>
     )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Select value={selectedChild?.id ?? ""} onValueChange={(id) => onChildChange(id)}>
          <SelectTrigger className="w-auto border-0 shadow-none focus:ring-0 text-sm font-medium p-0 h-auto">
            <SelectValue placeholder="Select Device..." />
          </SelectTrigger>
          <SelectContent>
            {childrenData.map(child => (
              <SelectItem key={child.id} value={child.id}>{child.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedChild ? (
            <Smartphone className="h-4 w-4 text-muted-foreground" />
        ) : (
            <Loader2 className="h-4 w-4 text-muted-foreground animate-spin"/>
        )}
      </CardHeader>
      <CardContent>
        {selectedChild ? (
            <div className="text-2xl font-bold">{selectedChild.deviceName}</div>
        ) : (
            <div className="h-8 mt-1.5 w-32 bg-muted rounded-md animate-pulse" />
        )}
        <p className="text-xs text-muted-foreground">
          {selectedChild ? `${selectedChild.batteryLevel}% Battery ${selectedChild.isOnline ? '· Online' : '· Offline'}` : 'Loading device status...'}
        </p>
      </CardContent>
    </Card>
  )
}
