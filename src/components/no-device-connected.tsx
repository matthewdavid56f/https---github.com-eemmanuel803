
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { WifiOff, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function NoDeviceConnected() {
  const router = useRouter();

  const handleGoToPairing = () => {
    router.push('/pair-device');
  };

  return (
    <div className="flex flex-1 items-center justify-center p-8 h-full">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <WifiOff className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle className="mt-4">No Devices Connected</CardTitle>
          <CardDescription>
            You don't have any devices paired yet. Go to the pairing page to connect your first child's device.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Button onClick={handleGoToPairing}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Pair First Device
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
