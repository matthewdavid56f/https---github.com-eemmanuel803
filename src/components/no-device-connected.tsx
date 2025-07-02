
"use client"

import * as React from "react"
import { WifiOff, PlusCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useChild } from "@/contexts/child-context";
import { pairNewDevice } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

export function NoDeviceConnected() {
  const { addNewChild } = useChild();
  const { toast } = useToast();
  const [isPairing, setIsPairing] = React.useState(false);

  const handlePairFirstDevice = async () => {
    setIsPairing(true);
    try {
      const newChild = await pairNewDevice();
      if (newChild) {
        addNewChild(newChild);
        toast({
          title: "First Device Connected!",
          description: `${newChild.name} has been added and selected.`,
        });
      } else {
        throw new Error("Pairing service failed.");
      }
    } catch (error) {
      toast({
        title: "Pairing Failed",
        description: "Could not pair a new device. Please try again.",
        variant: "destructive",
      });
      setIsPairing(false);
    }
    // No need to set isPairing to false on success, as the component will unmount
  };

  return (
    <div className="flex flex-1 items-center justify-center p-8 h-full">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <WifiOff className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle className="mt-4">No Device Connected</CardTitle>
          <CardDescription>
            To begin, simulate your first child's device connecting to your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Button onClick={handlePairFirstDevice} disabled={isPairing}>
                {isPairing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                Simulate New Connection
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
