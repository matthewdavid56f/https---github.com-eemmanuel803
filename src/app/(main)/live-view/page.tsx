
"use client"

import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Video, Monitor, Camera, Image as ImageIcon, Mic, ShieldCheck, ShieldOff } from "lucide-react"
import { InteractivePhoneScreen } from "@/components/interactive-phone-screen"

export default function LiveViewPage() {
  const [remoteControlEnabled, setRemoteControlEnabled] = React.useState(false)
  const { toast } = useToast()

  const handleAction = (message: string) => {
    toast({
      title: "Command Sent",
      description: message,
    })
  }
  
  const toggleRemoteControl = () => {
    const wasEnabled = remoteControlEnabled;
    setRemoteControlEnabled(!wasEnabled)
    toast({
      title: "Command Sent",
      description: `Remote control has been ${!wasEnabled ? 'enabled' : 'disabled'}.`,
    })
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <header className="p-6 md:p-8">
        <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg">
                <Video className="w-6 h-6 text-primary" />
            </div>
          <div>
            <h1 className="text-2xl font-bold">Live View &amp; Remote Control</h1>
            <p className="text-muted-foreground">Watch the screen, access cameras, and operate the device remotely.</p>
          </div>
        </div>
      </header>
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 pt-0">
        <div className="flex items-center justify-center bg-card p-4 rounded-lg">
            <div className="relative w-full max-w-[300px] aspect-[9/18] rounded-2xl overflow-hidden shadow-lg border-4 border-muted bg-black">
                {!remoteControlEnabled ? (
                    <Image
                        src="https://placehold.co/400x800.png"
                        alt="Live device screen"
                        fill
                        className="object-cover"
                        data-ai-hint="building architecture"
                    />
                ) : (
                    <InteractivePhoneScreen />
                )}
            </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Live Feeds</h3>
            <div className="space-y-3">
              <Button className="w-full justify-start text-base py-6" onClick={() => handleAction("Live screen feed requested.")}>
                <Monitor className="mr-3 h-5 w-5" /> Live Screen
              </Button>
              <Button className="w-full justify-start text-base py-6" onClick={() => handleAction("Front camera feed requested.")}>
                <Camera className="mr-3 h-5 w-5" /> Front Camera
              </Button>
              <Button className="w-full justify-start text-base py-6" onClick={() => handleAction("Back camera feed requested.")}>
                <Camera className="mr-3 h-5 w-5" /> Back Camera
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Actions</h3>
            <div className="space-y-3">
              <Button className="w-full justify-start text-base py-6" onClick={() => handleAction("Screenshot command sent.")}>
                <ImageIcon className="mr-3 h-5 w-5" /> Take Screenshot
              </Button>
              <Button className="w-full justify-start text-base py-6" onClick={() => handleAction("Microphone recording (30s) command sent.")}>
                <Mic className="mr-3 h-5 w-5" /> Record Microphone (30s)
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Remote Control</h3>
            <div className="space-y-3">
              {remoteControlEnabled ? (
                <Button 
                  variant="destructive"
                  className="w-full justify-center text-base py-6"
                  onClick={toggleRemoteControl}
                >
                  <ShieldOff className="mr-3 h-5 w-5" /> Disable Remote Control
                </Button>
              ) : (
                <Button 
                  className="w-full justify-center text-base py-6 bg-green-600 hover:bg-green-700 text-primary-foreground"
                  onClick={toggleRemoteControl}
                >
                  <ShieldCheck className="mr-3 h-5 w-5" /> Enable Remote Control
                </Button>
              )}
              <p className="text-xs text-muted-foreground text-center px-4">
                Enabling remote control will blank the child's screen and give you full access to operate the device.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
