
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Settings, RefreshCw, Play, Pin, Clock, Loader2, Globe, Youtube, Instagram, Gamepad2, Music, Shield } from "lucide-react"
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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useChild } from "@/contexts/child-context"
import type { App } from "@/contexts/child-context"
import { cn } from "@/lib/utils"
import { sendDeviceCommand, type DeviceCommandInput } from "@/ai/flows/device-commands"

const appIconMap: Record<string, React.ElementType> = {
  Globe,
  Youtube,
  Gamepad2,
  Shield,
  Music,
  Instagram,
};

const AppIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = appIconMap[name];
  if (!IconComponent) {
    return <div className="w-8 h-8" />;
  }
  return <IconComponent className={cn("w-8 h-8", className)} />;
};


export default function AppSettingsPage() {
  const { toast } = useToast()
  const { selectedChild, isLoading } = useChild()
  const [selectedApp, setSelectedApp] = React.useState<App | null>(null)
  const [timerMinutes, setTimerMinutes] = React.useState("15")
  const [loadingCommands, setLoadingCommands] = React.useState<Record<string, boolean>>({});

  const handleCommand = async (command: DeviceCommandInput['command'], payload: DeviceCommandInput['payload'], app: App) => {
    if (!selectedChild) return;

    const loadingKey = `${command}-${app.packageName}`;
    setLoadingCommands(prev => ({ ...prev, [loadingKey]: true }));

    try {
        const input: DeviceCommandInput = {
            childName: selectedChild.name,
            command,
            payload: { ...payload, appName: app.name, packageName: app.packageName },
        };
        const result = await sendDeviceCommand(input);
        if (result.success) {
            toast({ title: "Command Sent", description: result.message });
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        toast({ title: "Error", description: `Failed to send command: ${error instanceof Error ? error.message : "Unknown error"}`, variant: "destructive" });
    } finally {
        setLoadingCommands(prev => ({ ...prev, [loadingKey]: false }));
        if (command === 'pinApp') {
            setSelectedApp(null);
        }
    }
  };

  const handlePinApp = () => {
     if (selectedApp) {
      handleCommand('pinApp', {}, selectedApp);
    }
  }

  const handleSetTimer = () => {
    if (selectedApp) {
      handleCommand('pinApp', { duration: `${timerMinutes} minutes` }, selectedApp);
    }
  }
  
  if (isLoading || !selectedChild) {
    return <div className="flex-1 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  const isAnyCommandLoading = Object.values(loadingCommands).some(Boolean);
  const isPinning = loadingCommands[`pinApp-${selectedApp?.packageName}`] ?? false;


  return (
    <div className="flex flex-1 flex-col h-full">
      <header className="p-6 md:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
              <Settings className="w-8 h-8 text-primary" />
              <div>
                  <h1 className="text-2xl font-bold">{selectedChild.name}'s Application Settings</h1>
                  <p className="text-muted-foreground">View installed apps and send commands to open or pin them.</p>
              </div>
          </div>
          <Button disabled={isAnyCommandLoading}>
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
                        {selectedChild.installedApps.map((app) => {
                            const isOpenLoading = loadingCommands[`openApp-${app.packageName}`];
                            return (
                              <TableRow key={app.packageName}>
                                  <TableCell>
                                      <div className="flex items-center gap-4">
                                          <AppIcon name={app.icon} className={app.iconClassName} />
                                          <div>
                                              <p className="font-medium">{app.name}</p>
                                              <p className="text-xs text-muted-foreground">{app.packageName}</p>
                                          </div>
                                      </div>
                                  </TableCell>
                                  <TableCell>{app.version}</TableCell>
                                  <TableCell className="text-right space-x-2">
                                      <Button variant="outline" size="sm" onClick={() => handleCommand('openApp', {}, app)} disabled={isAnyCommandLoading}>
                                          {isOpenLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
                                          Open
                                      </Button>
                                      <Button variant="outline" size="sm" onClick={() => setSelectedApp(app)} disabled={isAnyCommandLoading}>
                                          <Pin className="mr-2 h-4 w-4" /> Pin App
                                      </Button>
                                  </TableCell>
                              </TableRow>
                            )
                        })}
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
                                disabled={isPinning}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={handlePinApp} disabled={isPinning}>
                             {isPinning ? <Loader2 className="animate-spin" /> : "Pin without Timer"}
                        </Button>
                        <Button type="submit" onClick={handleSetTimer} disabled={isPinning}>
                             {isPinning ? <Loader2 className="animate-spin mr-2" /> : <Clock className="mr-2 h-4 w-4" />}
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
