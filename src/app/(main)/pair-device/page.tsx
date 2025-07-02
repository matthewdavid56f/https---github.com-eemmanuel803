
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { PlusCircle, Loader2, Radar, CheckCircle } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useChild } from "@/contexts/child-context"
import { pairNewDevice } from "@/lib/data"

type PairingStep = "listening" | "pairing" | "paired"

export default function PairDevicePage() {
  const router = useRouter()
  const { toast } = useToast()
  const { addNewChild } = useChild()
  const [step, setStep] = React.useState<PairingStep>("listening")

  // This effect runs once on mount to start the pairing process automatically
  React.useEffect(() => {
    const pairProcess = async () => {
      // 1. Listen for a moment
      setStep("listening")
      await new Promise(resolve => setTimeout(resolve, 4000)) // Simulate listening

      // 2. Attempt to pair
      setStep("pairing")
      try {
        const newChild = await pairNewDevice() // No name needed
        if (newChild) {
          addNewChild(newChild)
          toast({
            title: "New Device Connected",
            description: `${newChild.deviceName} has been added to your dashboard.`,
          })
          setStep("paired")
          // 3. Redirect to dashboard after success
          setTimeout(() => router.push("/dashboard"), 2000)
        } else {
          throw new Error("Failed to get new child data back from the service.")
        }
      } catch (error) {
        toast({
          title: "Pairing Failed",
          description: `Could not find a new device: ${error instanceof Error ? error.message : "Please try again."}`,
          variant: "destructive",
        })
        setStep("listening") // Reset to listening on failure
      }
    }

    pairProcess()
    // The empty dependency array ensures this runs only once when the page loads.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  const stepContent = {
    listening: {
      icon: <Radar className="w-16 h-16 text-primary animate-pulse" />,
      title: "Listening for New Devices",
      description: "Waiting for a device with the companion app to connect to the network...",
    },
    pairing: {
      icon: <CheckCircle className="w-16 h-16 text-green-500" />,
      title: "Device Found! Pairing...",
      description: "A new device has been detected. Finalizing the secure connection.",
    },
    paired: {
      icon: <Loader2 className="w-16 h-16 text-primary animate-spin" />,
      title: "Pairing Successful!",
      description: "The device has been linked. Redirecting to your dashboard...",
    },
  }

  const currentStepContent = stepContent[step]

  return (
    <div className="flex flex-1 flex-col h-full p-6 md:p-8">
      <header className="mb-8">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg">
            <PlusCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Automatic Device Pairing</h1>
            <p className="text-muted-foreground">This dashboard is actively listening for new devices.</p>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>{currentStepContent.title}</CardTitle>
            <CardDescription>{currentStepContent.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 p-8 h-48">
              {currentStepContent.icon}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
