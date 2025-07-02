
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { PlusCircle, Loader2, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useChild } from "@/contexts/child-context"
import { pairNewDevice } from "@/lib/data"

export default function PairDevicePage() {
  const router = useRouter()
  const { toast } = useToast()
  const { addNewChild } = useChild()
  const [pairingKey, setPairingKey] = React.useState<string | null>(null)
  const [childName, setChildName] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  React.useEffect(() => {
    // Generate a 6-digit key on mount, only on the client
    setPairingKey(Math.floor(100000 + Math.random() * 900000).toString())
  }, [])

  const handleCopyKey = () => {
    if (pairingKey) {
      navigator.clipboard.writeText(pairingKey)
      toast({
        title: "Copied!",
        description: "Pairing key copied to clipboard.",
      })
    }
  }

  async function handlePairDevice() {
    if (!childName) {
        toast({
            title: "Name is required",
            description: "Please enter a name for your child to complete the pairing.",
            variant: "destructive"
        })
        return;
    }

    setIsSubmitting(true)
    try {
      // In a real app, the backend would confirm the key was used.
      // Here, we simulate this and proceed to create the child profile.
      const newChild = await pairNewDevice(childName)
      if (newChild) {
        addNewChild(newChild)
        toast({
          title: "Device Paired Successfully",
          description: `${childName}'s device is now being monitored.`,
        })
        router.push("/dashboard")
      } else {
        throw new Error("Failed to get new child data back from the service.")
      }
    } catch (error) {
      toast({
        title: "Pairing Failed",
        description: `Could not pair device: ${error instanceof Error ? error.message : "Please try again."}`,
        variant: "destructive",
      })
    } finally {
        setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col h-full p-6 md:p-8">
      <header className="mb-8">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg">
            <PlusCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Pair a New Device</h1>
            <p className="text-muted-foreground">Generate a key to link your child's device.</p>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Your Pairing Key</CardTitle>
            <CardDescription>
              On your child's device, install and open the Guad Eyes companion app. When prompted, enter the key below to link the devices.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex items-center justify-center space-x-2 rounded-lg border-2 border-dashed bg-muted/50 p-8">
                {pairingKey ? (
                    <>
                        <p className="text-4xl font-bold tracking-widest font-mono text-center text-primary">
                            {pairingKey}
                        </p>
                        <Button variant="ghost" size="icon" onClick={handleCopyKey} aria-label="Copy pairing key">
                            <Copy className="h-6 w-6" />
                        </Button>
                    </>
                ) : (
                    <Loader2 className="h-8 w-8 animate-spin" />
                )}
            </div>
            
            <div className="space-y-4">
                <p className="text-sm text-center text-muted-foreground">
                    Once the key is entered on the child's device, enter their name below to finish.
                </p>
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
                 <Button onClick={handlePairDevice} className="w-full" disabled={isSubmitting || !childName}>
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                  Complete Pairing
                </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
