
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
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Battery, Smartphone } from "lucide-react"

type ChildData = {
  id: string;
  name: string;
  avatar: string;
  deviceName: string;
  isOnline: boolean;
  batteryLevel: number;
}

interface DeviceStatusCardProps {
  childrenData: ChildData[];
  selectedChild: ChildData;
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
              <SelectItem key={child.id} value={child.id}>{child.name}'s Device</SelectItem>
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
            <p className="text-lg font-bold">{selectedChild.name}'s Phone</p>
            <div className="flex items-center text-xs text-muted-foreground">
              {selectedChild.isOnline ? (
                 <Badge variant="outline" className="mr-2 border-green-600 bg-green-50 text-green-700">Online</Badge>
              ) : (
                 <Badge variant="outline" className="mr-2 border-muted-foreground bg-muted">Offline</Badge>
              )}
              <span>{selectedChild.deviceName}</span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
             <div className="flex items-center">
              <Battery className="mr-1 h-4 w-4" />
              <span>Battery</span>
            </div>
            <span className="font-semibold text-foreground">{selectedChild.batteryLevel}%</span>
          </div>
          <Progress value={selectedChild.batteryLevel} className="mt-1 h-2" />
        </div>
      </CardContent>
    </Card>
  )
}
