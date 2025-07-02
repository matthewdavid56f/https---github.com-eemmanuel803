
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Loader2, UserPlus, Server, CheckCircle, RefreshCw } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useChild } from "@/contexts/child-context"
import { pairNewDevice, getDiscoveredDevices, type DiscoveredDevice } from "@/lib/data"

export default function PairDevicePage() {
  const router = useRouter()
  const { toast } = useToast()
  const { addNewChild } = useChild()
  const [discoveredDevices, setDiscoveredDevices] = React.useState<DiscoveredDevice[]>([])
  const [pairingDevice, setPairingDevice] = React.useState<DiscoveredDevice | null>(null)
  const [childName, setChildName] = React.useState("")
  const [isPairing, setIsPairing] = React.useState(false)
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  const searchForDevices = React.useCallback(async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    
    try {
      const devices = await getDiscoveredDevices();
      setDiscoveredDevices(devices);
    } catch (error) {
       toast({
        title: "Error",
        description: "Could not fetch discovered devices from the database.",
        variant: "destructive",
      });
      setDiscoveredDevices([]); // Clear on error
    }
    
    setIsRefreshing(false);
  }, [isRefreshing, toast]);

  React.useEffect(() => {
    searchForDevices(); // Initial search on load
    
    const intervalId = setInterval(() => {
      searchForDevices();
    }, 15000); // Automatically refresh every 15 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [searchForDevices]);


  const handleStartPairing = (device: DiscoveredDevice) => {
    setPairingDevice(device);
    setChildName("");
  }

  const handleCompletePairing = async () => {
    if (!childName.trim() || !pairingDevice) {
      toast({
        title: "Name Required",
        description: "Please enter a name for your child to complete pairing.",
        variant: "destructive",
      })
      return
    }

    setIsPairing(true)
    try {
      const newChild = await pairNewDevice(childName.trim(), pairingDevice)
      if (newChild) {
        addNewChild(newChild)
        toast({
          title: "New Device Connected",
          description: `${newChild.name}'s device (${pairingDevice.name}) has been added.`,
        })
        setDiscoveredDevices(devices => devices.filter(d => d.id !== pairingDevice.id))
        setPairingDevice(null)
        setTimeout(() => router.push("/dashboard"), 1000)
      } else {
        throw new Error("Failed to get new child data back from the service.")
      }
    } catch (error) {
      toast({
        title: "Pairing Failed",
        description: `Could not pair the new device: ${error instanceof Error ? error.message : "Please try again."}`,
        variant: "destructive",
      })
    } finally {
      setIsPairing(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col h-full p-6 md:p-8">
      <header className="mb-8">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg">
            <UserPlus className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Pair a New Device</h1>
            <p className="text-muted-foreground">Nearby devices with the companion app installed will appear here.</p>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
                <div>
                    <CardTitle>Discovered Devices</CardTitle>
                    <CardDescription>
                    {isRefreshing && discoveredDevices.length === 0 ? "Searching for devices on your network..." : "Actively listening for new devices."}
                    </CardDescription>
                </div>
                <Button variant="outline" onClick={searchForDevices} disabled={isRefreshing}>
                    <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isRefreshing && discoveredDevices.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 p-8 min-h-[12rem]">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="mt-4 text-muted-foreground">Searching...</p>
              </div>
            ) : discoveredDevices.length > 0 ? (
              <ul className="space-y-3">
                {discoveredDevices.map((device) => (
                  <li key={device.id} className="flex items-center justify-between p-4 rounded-lg border bg-background hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                      <Server className="w-6 h-6 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{device.name}</p>
                        <p className="text-sm text-muted-foreground">Ready to pair</p>
                      </div>
                    </div>
                    <Button onClick={() => handleStartPairing(device)}>Pair</Button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 p-8 min-h-[12rem]">
                <Server className="w-12 h-12 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">No new devices found.</p>
                <p className="text-xs text-muted-foreground mt-1">Ensure the companion app is open on the child's device.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Dialog open={!!pairingDevice} onOpenChange={(isOpen) => !isOpen && setPairingDevice(null)}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Pair with {pairingDevice?.name}</DialogTitle>
                <DialogDescription>
                    To finish, please assign a name to this device. This will help you identify it on your dashboard.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="child-name" className="text-right">
                        Child's Name
                    </Label>
                    <Input
                        id="child-name"
                        value={childName}
                        onChange={(e) => setChildName(e.target.value)}
                        className="col-span-3"
                        placeholder="e.g., Jane Doe"
                        disabled={isPairing}
                    />
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setPairingDevice(null)} disabled={isPairing}>Cancel</Button>
                <Button onClick={handleCompletePairing} disabled={isPairing || !childName.trim()}>
                    {isPairing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                    Complete Pairing
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
