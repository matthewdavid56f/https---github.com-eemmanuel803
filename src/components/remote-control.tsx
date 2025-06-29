"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Globe, AppWindow, MessageSquare, Power, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function RemoteControl() {
  const { toast } = useToast()

  const handleAction = (message: string) => {
    toast({
      title: "Action Sent",
      description: message,
    })
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Remote Control</CardTitle>
        <CardDescription>
          Manage your child's device from here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="website">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="website"><Globe className="mr-1 h-4 w-4" />Website</TabsTrigger>
            <TabsTrigger value="apps"><AppWindow className="mr-1 h-4 w-4" />Apps</TabsTrigger>
            <TabsTrigger value="sms"><MessageSquare className="mr-1 h-4 w-4" />SMS</TabsTrigger>
            <TabsTrigger value="blackout"><Power className="mr-1 h-4 w-4" />Blackout</TabsTrigger>
          </TabsList>
          
          <TabsContent value="website" className="mt-6">
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Open Website</h4>
              <p className="text-sm text-muted-foreground">Force open a website in full screen on the child's device.</p>
              <div className="space-y-2">
                <Label htmlFor="url">Website URL</Label>
                <Input id="url" placeholder="https://www.example.com" />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleAction("Website will be opened immediately.")}>Open Now</Button>
                <Button variant="outline" onClick={() => handleAction("Website opening has been scheduled.")}><Clock className="mr-2 h-4 w-4" />Schedule</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="apps" className="mt-6">
             <div className="space-y-4">
              <h4 className="text-sm font-medium">App Lock</h4>
              <p className="text-sm text-muted-foreground">Launch a specific app and lock the device to it for a period.</p>
              <div className="space-y-2">
                <Label htmlFor="app-select">Application</Label>
                <Select>
                  <SelectTrigger id="app-select">
                    <SelectValue placeholder="Select an app" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="minecraft">Minecraft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input id="duration" type="number" placeholder="e.g., 30" />
              </div>
              <Button onClick={() => handleAction("App will be launched and locked.")}>Lock & Launch</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="sms" className="mt-6">
             <div className="space-y-4">
                <h4 className="text-sm font-medium">Send SMS</h4>
                <p className="text-sm text-muted-foreground">Send a custom message to the device that will be displayed as a notification.</p>
                <div className="grid w-full gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea placeholder="Type your message here." id="message" />
                  <Button onClick={() => handleAction("SMS has been sent.")}>Send Message</Button>
                </div>
             </div>
          </TabsContent>
          
          <TabsContent value="blackout" className="mt-6">
             <div className="space-y-4">
               <h4 className="text-sm font-medium">Screen Blackout</h4>
               <p className="text-sm text-muted-foreground">Temporarily black out the screen. The device will be unusable until you turn this off.</p>
                <div className="flex items-center space-x-2 rounded-lg border p-4">
                  <Power className="h-5 w-5 text-destructive" />
                  <Label htmlFor="blackout-switch" className="flex-1">Activate Screen Blackout</Label>
                  <Switch id="blackout-switch" onCheckedChange={(checked) => handleAction(`Screen blackout has been ${checked ? 'activated' : 'deactivated'}.`)} />
                </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
