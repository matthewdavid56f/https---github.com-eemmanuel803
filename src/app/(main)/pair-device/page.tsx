
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { PlusCircle, Loader2, Radar, CheckCircle, UserPlus } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useChild } from "@/contexts/child-context"
import { pairNewDevice } from "@/lib/data"

type PairingStep = "listening" | "deviceFound" | "pairing" | "paired"

export default function PairDevicePage() {
  const router = useRouter()
  const { toast } = useToast()
  const { addNewChild } = useChild()
  const [step, setStep] = React.useState<PairingStep>("listening")
  const [foundDeviceName, setFoundDeviceName] = React.useState<string | null>(null)
  const [childName, setChildName] = React.useState("")

  React.useEffect(() => {
    // Simulate listening for a device when the page loads
    const timer = setTimeout(() => {
      const deviceId = Math.floor(Math.random() * 9000) + 1000;
      setFoundDeviceName(`Android Model ${deviceId}`);
      setStep("deviceFound")
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  const handleCompletePairing = async () => {
    if (!childName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a name for your child to complete pairing.",
        variant: "destructive",
      })
      return
    }

    setStep("pairing")
    try {
      const newChild = await pairNewDevice(childName.trim(), foundDeviceName!)
      if (newChild) {
        addNewChild(newChild)
        toast({
          title: "New Device Connected",
          description: `${newChild.name}'s device has been added to your dashboard.`,
        })
        setStep("paired")
        setTimeout(() => router.push("/dashboard"), 2000)
      } else {
        throw new Error("Failed to get new child data back from the service.")
      }
    } catch (error) {
      toast({
        title: "Pairing Failed",
        description: `Could not pair the new device: ${error instanceof Error ? error.message : "Please try again."}`,
        variant: "destructive",
      })
      setStep("deviceFound") // Go back to the previous step on failure
    }
  }

  const renderContent = () => {
    switch (step) {
      case "listening":
        return {
          icon: <Radar className="w-16 h-16 text-primary animate-pulse" />,
          title: "Listening for New Devices",
          description: "Waiting for a device with the companion app to connect to the network...",
          content: null,
          footer: null,
        }
      case "deviceFound":
        return {
          icon: <CheckCircle className="w-16 h-16 text-green-500" />,
          title: "Device Found!",
          description: `A new device (${foundDeviceName}) has been detected. Assign a name to complete the pairing.`,
          content: (
            <div className="space-y-2 pt-4">
              <Label htmlFor="child-name">Child's Name</Label>
              <Input 
                id="child-name" 
                placeholder="e.g., John Doe" 
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
              />
            </div>
          ),
          footer: (
            <Button className="w-full" onClick={handleCompletePairing}>
              <UserPlus className="mr-2 h-4 w-4" />
              Complete Pairing
            </Button>
          ),
        }
      case "pairing":
        return {
          icon: <Loader2 className="w-16 h-16 text-primary animate-spin" />,
          title: "Finalizing Connection...",
          description: "Securely pairing the device to your account. Please wait.",
          content: null,
          footer: (
            <Button className="w-full" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Pairing...
            </Button>
          ),
        }
      case "paired":
        return {
          icon: <CheckCircle className="w-16 h-16 text-primary" />,
          title: "Pairing Successful!",
          description: "The device has been linked. Redirecting to your dashboard...",
          content: null,
          footer: null
        }
    }
  }

  const currentStep = renderContent()

  return (
    <div className="flex flex-1 flex-col h-full p-6 md:p-8">
      <header className="mb-8">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg">
            <PlusCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Pair a New Device</h1>
            <p className="text-muted-foreground">This dashboard is actively listening for new devices.</p>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>{currentStep.title}</CardTitle>
            <CardDescription>{currentStep.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 p-8 min-h-[12rem]">
              {currentStep.icon}
              {currentStep.content}
            </div>
          </CardContent>
          {currentStep.footer && (
            <CardFooter>
                {currentStep.footer}
            </CardFooter>
          )}
        </Card>
      </main>
    </div>
  )
}
