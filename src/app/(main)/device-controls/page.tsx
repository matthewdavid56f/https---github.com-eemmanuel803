
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useChild } from "@/contexts/child-context"
import { ShieldAlert, Globe, Send, Loader2 } from "lucide-react"
import { sendDeviceCommand, type DeviceCommandInput } from "@/ai/flows/device-commands"

type LoadingStates = {
  lock30?: boolean;
  lock60?: boolean;
  lock120?: boolean;
  unlock?: boolean;
  message?: boolean;
  website?: boolean;
}

export default function DeviceControlsPage() {
  const { toast } = useToast()
  const { selectedChild, isLoading: isChildLoading } = useChild()
  const [loading, setLoading] = React.useState<LoadingStates>({})
  const [message, setMessage] = React.useState("")
  const [url, setUrl] = React.useState("https://google.com")

  const handleCommand = async (command: DeviceCommandInput['command'], payload: DeviceCommandInput['payload'], loadingKey: keyof LoadingStates) => {
    if (!selectedChild) return;

    setLoading(prev => ({ ...prev, [loadingKey]: true }))

    try {
      const input: DeviceCommandInput = {
        childName: selectedChild.name,
        command,
        payload,
      }
      const result = await sendDeviceCommand(input)
      if (result.success) {
        toast({
          title: "Command Sent",
          description: result.message,
        })
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send command. Please try again.",
        variant: "destructive"
      })
      console.error(error)
    } finally {
      setLoading(prev => ({ ...prev, [loadingKey]: false }))
    }
  }
  
  if (isChildLoading || !selectedChild) {
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
              <Button variant="destructive" onClick={() => handleCommand('lock', { duration: '30 minutes' }, 'lock30')} disabled={loading.lock30}>
                {loading.lock30 ? <Loader2 className="animate-spin" /> : "30 Mins"}
              </Button>
              <Button variant="destructive" onClick={() => handleCommand('lock', { duration: '1 hour' }, 'lock60')} disabled={loading.lock60}>
                {loading.lock60 ? <Loader2 className="animate-spin" /> : "1 Hour"}
              </Button>
              <Button variant="destructive" onClick={() => handleCommand('lock', { duration: '2 hours' }, 'lock120')} disabled={loading.lock120}>
                {loading.lock120 ? <Loader2 className="animate-spin" /> : "2 Hours"}
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-primary-foreground" onClick={() => handleCommand('unlock', {}, 'unlock')} disabled={loading.unlock}>
                {loading.unlock ? <Loader2 className="animate-spin" /> : "Unlock Now"}
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Send Popup Message</h2>
            <p className="text-muted-foreground">
              Send a message that will appear on top of whatever the user is doing.
            </p>
            <div className="space-y-2">
              <Input placeholder="e.g., Dinner is ready!" value={message} onChange={(e) => setMessage(e.target.value)} disabled={loading.message} />
              <Button variant="secondary" className="w-full justify-center" onClick={() => handleCommand('sendMessage', { message }, 'message')} disabled={loading.message || !message}>
                {loading.message ? <Loader2 className="animate-spin" /> : <Send />}
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
              <Input value={url} onChange={(e) => setUrl(e.target.value)} disabled={loading.website} />
              <Button className="w-full justify-center" onClick={() => handleCommand('openWebsite', { url }, 'website')} disabled={loading.website || !url}>
                 {loading.website ? <Loader2 className="animate-spin" /> : <Globe />}
                 Open Website
              </Button>
            </div>
        </div>
      </main>
    </div>
  )
}
