"use client"

import { Button } from "@/components/ui/button"
import { Settings, RefreshCw } from "lucide-react"

export default function AppSettingsPage() {
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
      <main className="flex flex-1 flex-col items-center justify-center p-6 -mt-16">
        <div className="text-center">
          <h3 className="text-xl font-semibold">No applications found.</h3>
          <p className="text-muted-foreground">The application list may be empty or unreachable.</p>
        </div>
      </main>
    </div>
  )
}
