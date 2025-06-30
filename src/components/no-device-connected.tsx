
"use client"

import Link from "next/link"
import { WifiOff, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function NoDeviceConnected() {
  return (
    <div className="flex flex-1 items-center justify-center p-8 h-full">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <WifiOff className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle className="mt-4">No Device Connected</CardTitle>
          <CardDescription>
            To begin, please pair your first child's device with your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Button asChild>
                <Link href="/pair-device">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Pair New Device
                </Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
