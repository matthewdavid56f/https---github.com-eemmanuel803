
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Phone as PhoneIcon, RefreshCw, ArrowDownLeft, ArrowUpRight, PhoneMissed } from "lucide-react"
import { useChild } from "@/contexts/child-context"

const callTypeDetails = {
  incoming: { icon: ArrowDownLeft, color: 'text-green-500', label: 'Incoming' },
  outgoing: { icon: ArrowUpRight, color: 'text-primary', label: 'Outgoing' },
  missed: { icon: PhoneMissed, color: 'text-destructive', label: 'Missed' },
}

export default function CallLogsPage() {
    const [isLoading, setIsLoading] = React.useState(false)
    const { selectedChild } = useChild()

    const handleRefresh = () => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 1500)
    }
  return (
    <div className="flex flex-1 flex-col h-full">
      <header className="p-6 md:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg">
                <PhoneIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{selectedChild.name}'s Call Logs</h1>
              <p className="text-muted-foreground">View the device's call history.</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Logs
          </Button>
        </div>
      </header>
      <main className="flex-1 px-6 pb-6">
        <Card>
          <CardHeader>
            <CardTitle>Call History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedChild.callLogs.map((log) => {
                  const details = callTypeDetails[log.type];
                  const Icon = details.icon;
                  return (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="font-medium">{log.name}</div>
                        <div className="text-sm text-muted-foreground">{log.number}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                           <Icon className={`h-4 w-4 ${details.color}`} />
                           <span>{details.label}</span>
                        </div>
                      </TableCell>
                      <TableCell>{log.duration}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{log.time}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
