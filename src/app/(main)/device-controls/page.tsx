
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useChild } from "@/contexts/child-context"
import { ShieldAlert, Globe, Send, Loader2 } from "lucide-react"

export default function DeviceControlsPage() {
  const { toast } = useToast()
  const { selectedChild, isLoading } = useChild()

  const handleAction = (message: string) => {
    toast({
      title: "Command Sent",
      description: message,
    })
  }

  if (isLoading || !selectedChild) {
    return <div className="flex-1 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  return (
    <div className="flex-1 flex flex-col h-full p-6 md:p-8">
      <header className="mb-8">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg">
            <ShieldAlert className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Device Controls for {selectedChild.name}</h1>
            <p className="text-muted-foreground">Send commands to remotely lock the phone, send alerts, and force open websites.</p>
          </div>
        </div>
      </header>

      <main className="flex-1 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Lock Device</h2>
            <p className="text-muted-foreground">
              Temporarily disable the phone for a set duration. The user will not be able to use it.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="destructive" onClick={() => handleAction(`Device locked for 30 minutes for ${selectedChild.name}.`)}>30 Mins</Button>
              <Button variant="destructive" onClick={() => handleAction(`Device locked for 1 hour for ${selectedChild.name}.`)}>1 Hour</Button>
              <Button variant="destructive" onClick={() => handleAction(`Device locked for 2 hours for ${selectedChild.name}.`)}>2 Hours</Button>
              <Button className="bg-green-600 hover:bg-green-700 text-primary-foreground" onClick={() => handleAction(`Device unlocked for ${selectedChild.name}.`)}>Unlock Now</Button>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Send Popup Message</h2>
            <p className="text-muted-foreground">
              Send a message that will appear on top of whatever the user is doing.
            </p>
            <div className="space-y-2">
              <Input placeholder="e.g., Dinner is ready!" />
              <Button variant="secondary" className="w-full justify-center" onClick={() => handleAction(`Popup message sent to ${selectedChild.name}.`)}>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4 max-w-lg">
           <h2 className="text-xl font-semibold">Force Open Website</h2>
            <p className="text-muted-foreground">
              Remotely open a specific website in the device's browser.
            </p>
             <div className="space-y-2">
              <Input defaultValue="https://google.com" />
              <Button className="w-full justify-center" onClick={() => handleAction(`Force open website command sent to ${selectedChild.name}.`)}>
                <Globe className="mr-2 h-4 w-4" />
                Open Website
              </Button>
            </div>
        </div>
      </main>
    </div>
  )
}
