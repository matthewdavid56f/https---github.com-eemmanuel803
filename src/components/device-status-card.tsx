
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
import { Smartphone } from "lucide-react"
import type { ChildSummary, Child } from "@/lib/data"

interface DeviceStatusCardProps {
  childrenData: ChildSummary[];
  selectedChild: Child | null;
  onChildChange: (id: string | null) => void;
}

export function DeviceStatusCard({ childrenData, selectedChild, onChildChange }: DeviceStatusCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Select value={selectedChild?.id ?? ""} onValueChange={(id) => onChildChange(id)}>
          <SelectTrigger className="w-auto border-0 shadow-none focus:ring-0 text-sm font-medium p-0 h-auto">
            <SelectValue placeholder="Select Device" />
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
        <div className="mt-4 text-center text-sm text-muted-foreground p-4 bg-muted/50 rounded-md">
          {selectedChild ? (
            `Viewing data for ${selectedChild.name}'s device.`
          ) : (
            `No device connected. Please select one.`
          )}
        </div>
      </CardContent>
    </Card>
  )
}
