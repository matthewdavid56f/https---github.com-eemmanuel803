
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

type CallLog = {
  id: string;
  name: string;
  number: string;
  type: 'incoming' | 'outgoing' | 'missed';
  duration: string;
  time: string;
}

const mockCallLogs: CallLog[] = [
  { id: '1', name: 'Alex Johnson', number: '555-0103', type: 'outgoing', duration: '5m 12s', time: '10:45 AM' },
  { id: '2', name: 'Mom', number: '555-0101', type: 'incoming', duration: '12m 3s', time: '10:30 AM' },
  { id: '3', name: 'Unknown', number: '555-0123', type: 'missed', duration: '0m 0s', time: '9:15 AM' },
  { id: '4', name: 'Dad', number: '555-0102', type: 'outgoing', duration: '1m 45s', time: 'Yesterday' },
  { id: '5', name: 'Pizza Palace', number: '555-0199', type: 'outgoing', duration: '2m 30s', time: 'Yesterday' },
  { id: '6', name: 'Dr. Smith (Pediatrician)', number: '555-0104', type: 'incoming', duration: '8m 5s', time: '2 days ago' },
  { id: '7', name: 'Emily Carter', number: '555-0107', type: 'missed', duration: '0m 0s', time: '2 days ago' },
]

const callTypeDetails = {
  incoming: { icon: ArrowDownLeft, color: 'text-green-500', label: 'Incoming' },
  outgoing: { icon: ArrowUpRight, color: 'text-primary', label: 'Outgoing' },
  missed: { icon: PhoneMissed, color: 'text-destructive', label: 'Missed' },
}

export default function CallLogsPage() {
    const [isLoading, setIsLoading] = React.useState(false)

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
              <h1 className="text-2xl font-bold">Call Logs</h1>
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
                {mockCallLogs.map((log) => {
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
