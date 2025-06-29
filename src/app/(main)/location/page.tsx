
"use client"

import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { MapPin, RefreshCw, Home, School, PlusCircle } from "lucide-react"

type Geofence = {
  name: string;
  address: string;
  icon: React.ReactNode;
  isInside: boolean;
}

const mockGeofences: Geofence[] = [
  { name: 'Home', address: '123 Maple Street, Springfield', icon: <Home className="w-6 h-6 text-green-500" />, isInside: true },
  { name: 'School', address: '456 Oak Avenue, Springfield', icon: <School className="w-6 h-6 text-blue-500" />, isInside: false },
]

export default function LocationPage() {
  const { toast } = useToast()
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    toast({
      title: "Command Sent",
      description: "Requesting updated location from device...",
    })
    setTimeout(() => {
        setIsRefreshing(false)
        toast({
            title: "Location Updated",
            description: "Device location has been successfully updated.",
        })
    }, 2000)
  }
  
  const handleAddZone = () => {
      toast({
          title: "Feature Not Implemented",
          description: "Adding new geofence zones is a planned feature.",
      })
  }

  return (
    <div className="flex flex-1 flex-col h-full">
      <header className="p-6 md:p-8">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Location Tracking</h1>
            <p className="text-muted-foreground">See the device's current location and manage safe zones.</p>
          </div>
        </div>
      </header>
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 pt-0">
        <div className="lg:col-span-2">
            <Card className="h-full min-h-[400px] lg:min-h-0">
                <CardContent className="p-0 h-full relative">
                    <Image
                        src="https://placehold.co/800x600.png"
                        alt="Map showing device location"
                        fill
                        className="object-cover rounded-lg"
                        data-ai-hint="map city"
                    />
                    <div className="absolute top-4 left-4 bg-background/80 p-2 rounded-lg shadow-lg backdrop-blur-sm">
                        <p className="font-bold text-sm">Alex's Phone</p>
                        <p className="text-xs text-muted-foreground">Last updated: 2 mins ago</p>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Current Location</CardTitle>
              <CardDescription>Last known device coordinates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                   <p className="text-sm font-medium">Address</p>
                   <p className="text-muted-foreground">123 Maple Street, Springfield, USA</p>
               </div>
               <div>
                   <p className="text-sm font-medium">Coordinates</p>
                   <p className="text-muted-foreground font-mono text-xs">40.7128° N, 74.0060° W</p>
               </div>
               <Button className="w-full" onClick={handleRefresh} disabled={isRefreshing}>
                 <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                 Force Refresh
               </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Geofencing</CardTitle>
              <CardDescription>Get alerts when the device enters or leaves safe zones.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <ul className="space-y-4">
                   {mockGeofences.map(zone => (
                       <li key={zone.name} className="flex items-center gap-4">
                           {zone.icon}
                           <div className="flex-1">
                               <p className="font-medium">{zone.name}</p>
                               <p className="text-xs text-muted-foreground">{zone.address}</p>
                           </div>
                           {zone.isInside && <Badge variant="secondary" className="border-green-500 text-green-500">Inside</Badge>}
                       </li>
                   ))}
               </ul>
               <Separator />
               <Button variant="outline" className="w-full" onClick={handleAddZone}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Zone
               </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
