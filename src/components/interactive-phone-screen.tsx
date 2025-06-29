
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Globe, Youtube, Instagram, Gamepad2, MessageSquare, Phone } from "lucide-react"

const apps = [
  { name: "Chrome", icon: <Globe className="w-8 h-8 text-white" /> },
  { name: "YouTube", icon: <Youtube className="w-8 h-8 text-white" /> },
  { name: "Instagram", icon: <Instagram className="w-8 h-8 text-white" /> },
  { name: "Games", icon: <Gamepad2 className="w-8 h-8 text-white" /> },
  { name: "Messages", icon: <MessageSquare className="w-8 h-8 text-white" /> },
  { name: "Phone", icon: <Phone className="w-8 h-8 text-white" /> },
]

export function InteractivePhoneScreen() {
  const { toast } = useToast()

  const handleOpenApp = (appName: string) => {
    toast({
      title: "Remote Command Sent",
      description: `Opening ${appName} on the device.`,
    })
  }

  return (
    <div className="absolute inset-0 bg-gray-900 text-white p-4 flex flex-col font-sans">
      <div className="flex justify-between text-xs mb-4 text-gray-300">
        <span>9:41 AM</span>
        <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.85a10 10 0 0 1 14 0"/><path d="M8.5 16.4a5 5 0 0 1 7 0"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="12" x="3" y="9" rx="2"/><line x1="7" x2="7.01" y1="15" y2="15"/></svg>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-y-6 flex-1 pt-4">
        {apps.map((app) => (
          <div key={app.name} className="flex flex-col items-center gap-1.5">
            <Button
              variant="ghost"
              className="w-14 h-14 p-0 rounded-2xl bg-black/20 hover:bg-black/40 flex items-center justify-center"
              onClick={() => handleOpenApp(app.name)}
              aria-label={`Open ${app.name}`}
            >
              {app.icon}
            </Button>
            <span className="text-xs text-gray-200">{app.name}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-around items-center h-12 mt-auto border-t border-gray-700 pt-2">
         <p className="text-xs text-center text-gray-400">You are in remote control mode. The device screen is blank.</p>
      </div>
    </div>
  )
}
