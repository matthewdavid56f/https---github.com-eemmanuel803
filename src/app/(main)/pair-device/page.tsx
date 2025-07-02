
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { PlusCircle, Loader2, Radar, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useChild } from "@/contexts/child-context"
import { pairNewDevice } from "@/lib/data"

type PairingStep = "searching" | "deviceFound" | "pairing" | "paired"

export default function PairDevicePage() {
  const router = useRouter()
  const { toast } = useToast()
  const { addNewChild } = useChild()
  const [childName, setChildName] = React.useState("")
  const [step, setStep] = React.useState<PairingStep>("searching")

  // Simulate finding a device
  React.useEffect(() => {
    if (step === "searching") {
      const timer = setTimeout(() => {
        setStep("deviceFound")
      }, 4000) // Simulate a 4-second search

      return () => clearTimeout(timer)
    }
  }, [step])

  async function handlePairDevice() {
    if (!childName) {
      toast({
        title: "Name is required",
        description: "Please enter a name for your child to complete the pairing.",
        variant: "destructive",
      })
      return
    }

    setStep("pairing")
    try {
      const newChild = await pairNewDevice(childName)
      if (newChild) {
        addNewChild(newChild)
        toast({
          title: "Device Paired Successfully",
          description: `${newChild.name}'s device is now being monitored.`,
        })
        setStep("paired")
        // Redirect after a short delay
        setTimeout(() => router.push("/dashboard"), 2000)
      } else {
        throw new Error("Failed to get new child data back from the service.")
      }
    } catch (error) {
      toast({
        title: "Pairing Failed",
        description: `Could not pair device: ${error instanceof Error ? error.message : "Please try again."}`,
        variant: "destructive",
      })
      setStep("deviceFound") // Go back to the dialog on failure
    }
  }
  
  const isSubmitting = step === 'pairing';

  return (
    <div className="flex flex-1 flex-col h-full p-6 md:p-8">
      <header className="mb-8">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg">
            <PlusCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Pair a New Device</h1>
            <p className="text-muted-foreground">The dashboard is searching for new devices with the companion app installed.</p>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>
                {step === 'searching' && "Searching for Devices"}
                {step === 'deviceFound' && "Device Found!"}
                {step === 'pairing' && "Completing Pair..."}
                {step === 'paired' && "Pairing Successful!"}
            </CardTitle>
            <CardDescription>
              {step === 'searching' && "Make sure the companion app is installed and open on your child's device."}
              {step === 'deviceFound' && "A new device has been detected on your network. Assign a name to continue."}
              {step === 'pairing' && "Finalizing the connection. Please wait."}
              {step === 'paired' && "The device has been successfully linked. Redirecting..."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 p-8 h-48">
              {step === "searching" && (
                <>
                  <Radar className="w-16 h-16 text-primary animate-pulse" />
                  <p className="mt-4 text-muted-foreground">Listening for new device...</p>
                </>
              )}
               {(step === "deviceFound" || step === "pairing") && (
                <>
                  <CheckCircle className="w-16 h-16 text-green-500" />
                   <p className="mt-4 text-muted-foreground">Ready to pair.</p>
                </>
              )}
               {step === "paired" && (
                <>
                  <Loader2 className="w-16 h-16 text-primary animate-spin" />
                  <p className="mt-4 text-muted-foreground">Redirecting to dashboard...</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

       <Dialog open={step === "deviceFound" || step === "pairing"} onOpenChange={(isOpen) => { if (!isOpen && !isSubmitting) setStep("searching")}}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Device Found</DialogTitle>
                    <DialogDescription>
                        A new device is ready to be paired. Please assign a name to link it to your dashboard.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="childName">Child's Name</Label>
                        <Input
                            id="childName"
                            placeholder="e.g., Alex, Chloe..."
                            value={childName}
                            onChange={(e) => setChildName(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setStep("searching")} disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button onClick={handlePairDevice} disabled={isSubmitting || !childName}>
                      {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                      Complete Pairing
                    </Button>
                </DialogFooter>
            </DialogContent>
       </Dialog>
    </div>
  )
}
