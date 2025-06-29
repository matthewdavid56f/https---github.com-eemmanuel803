
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Settings, RefreshCw, Play, Pin, Clock, Shield, Youtube, Instagram, Gamepad2, Music, Globe } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
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
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

type App = {
  name: string;
  icon: React.ReactNode;
  version: string;
  packageName: string;
}

const mockApps: App[] = [
  { name: 'Google Chrome', packageName: 'com.android.chrome', icon: <Globe className="w-8 h-8 text-muted-foreground" />, version: '125.0.6422.112' },
  { name: 'YouTube', packageName: 'com.google.android.youtube', icon: <Youtube className="w-8 h-8 text-red-500" />, version: '19.23.35' },
  { name: 'Instagram', packageName: 'com.instagram.android', icon: <Instagram className="w-8 h-8 text-pink-500" />, version: '339.0.0.12.112' },
  { name: 'Minecraft', packageName: 'com.mojang.minecraftpe', icon: <Gamepad2 className="w-8 h-8 text-green-600" />, version: '1.20.81.01' },
  { name: 'TikTok', packageName: 'com.zhiliaoapp.musically', icon: <Music className="w-8 h-8 text-cyan-400" />, version: '34.8.4' },
  { name: 'Clash of Clans', packageName: 'com.supercell.clashofclans', icon: <Shield className="w-8 h-8 text-yellow-500" />, version: '16.253.20' },
]

export default function AppSettingsPage() {
  const { toast } = useToast()
  const [selectedApp, setSelectedApp] = React.useState<App | null>(null)
  const [timerMinutes, setTimerMinutes] = React.useState("15")

  const handleOpenApp = (appName: string) => {
    toast({
      title: "Command Sent",
      description: `Opening ${appName} on the device.`,
    })
  }
  
  const handlePinApp = () => {
     if (selectedApp) {
      toast({
        title: "Command Sent",
        description: `${selectedApp.name} has been pinned. The user cannot exit the app.`,
      })
      setSelectedApp(null);
    }
  }

  const handleSetTimer = () => {
    if (selectedApp) {
      toast({
        title: "Command Sent",
        description: `${selectedApp.name} has been pinned for ${timerMinutes} minutes.`,
      })
      setSelectedApp(null);
    }
  }

  return (
    <div className="flex flex-1 flex-col h-full">
      <header className="p-6 md:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
              <Settings className="w-8 h-8 text-primary" />
              <div>
                  <h1 className="text-2xl font-bold">Application Settings</h1>
                  <p className="text-muted-foreground">View installed apps and send commands to open or pin them.</p>
              </div>
          </div>
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh List
          </Button>
        </div>
      </header>
      <main className="flex-1 px-6 pb-6">
        <Card>
            <CardHeader>
                <CardTitle>Installed Applications</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[350px]">Application</TableHead>
                            <TableHead>Version</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockApps.map((app) => (
                            <TableRow key={app.packageName}>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        {app.icon}
                                        <div>
                                            <p className="font-medium">{app.name}</p>
                                            <p className="text-xs text-muted-foreground">{app.packageName}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{app.version}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="outline" size="sm" onClick={() => handleOpenApp(app.name)}>
                                        <Play className="mr-2 h-4 w-4" />
                                        Open
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => setSelectedApp(app)}>
                                        <Pin className="mr-2 h-4 w-4" /> Pin App
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </main>

      <Dialog open={!!selectedApp} onOpenChange={(isOpen) => !isOpen && setSelectedApp(null)}>
        <DialogContent className="sm:max-w-[425px]">
            {selectedApp && (
                <>
                    <DialogHeader>
                        <DialogTitle>Pin &quot;{selectedApp.name}&quot;</DialogTitle>
                        <DialogDescription>
                            Lock the device to this app. The user won't be able to navigate away. You can set a timer to automatically unpin the app.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="timer" className="text-right">
                                Timer (mins)
                            </Label>
                            <Input
                                id="timer"
                                type="number"
                                value={timerMinutes}
                                onChange={(e) => setTimerMinutes(e.target.value)}
                                className="col-span-3"
                                placeholder="Leave blank to pin indefinitely"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={handlePinApp}>
                            Pin without Timer
                        </Button>
                        <Button type="submit" onClick={handleSetTimer}>
                            <Clock className="mr-2 h-4 w-4" />
                            Set Timer & Pin
                        </Button>
                    </DialogFooter>
                </>
            )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
