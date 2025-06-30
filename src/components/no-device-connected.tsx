
"use client"

import { WifiOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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
            Please select a child's device from the dropdown menu in the dashboard to view their information.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">
                In a real application, you would pair a new device from this screen.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
