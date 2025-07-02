
"use client"

import * as React from "react"
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
import { Smartphone, Loader2, PlusCircle } from "lucide-react"
import type { ChildSummary, Child } from "@/lib/data"
import { useChild } from "@/contexts/child-context"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { pairNewDevice } from "@/lib/data"


interface DeviceStatusCardProps {
  childrenData: ChildSummary[];
  selectedChild: Child | null;
  onChildChange: (id: string | null) => void;
}

export function DeviceStatusCard({ childrenData, selectedChild, onChildChange }: DeviceStatusCardProps) {
  const { addNewChild } = useChild();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = React.useState(false);

  const handlePairDevice = async () => {
    setIsAdding(true);
    try {
      const newChild = await pairNewDevice();
      if (newChild) {
        addNewChild(newChild);
        toast({
          title: "New Device Discovered",
          description: `${newChild.name}'s device has been added to your dashboard.`,
        });
      } else {
        throw new Error("Pairing service failed to return a new device.");
      }
    } catch (error) {
      toast({
        title: "Pairing Failed",
        description: "Could not add a new device at this time.",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };
  
  if (!selectedChild && childrenData.length === 0) {
     return (
       <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">No Device Connected</CardTitle>
           <Smartphone className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground mt-4">
              Navigate to "Pair New Device" to connect your first device.
          </div>
        </CardContent>
      </Card>
     )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Select value={selectedChild?.id ?? ""} onValueChange={onChildChange}>
            <SelectTrigger className="w-auto border-0 shadow-none focus:ring-0 text-sm font-medium p-0 h-auto">
              <SelectValue placeholder="Select Device..." />
            </SelectTrigger>
            <SelectContent>
              {childrenData.map(child => (
                <SelectItem key={child.id} value={child.id}>{child.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handlePairDevice} disabled={isAdding}>
            {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlusCircle className="h-4 w-4" />}
          </Button>
          {selectedChild ? (
              <Smartphone className="h-4 w-4 text-muted-foreground" />
          ) : (
              <Loader2 className="h-4 w-4 text-muted-foreground animate-spin"/>
          )}
        </div>
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
