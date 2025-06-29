"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileImage, ShieldAlert, Smartphone, ClipboardCopy } from "lucide-react"

const activities = [
  {
    icon: <ShieldAlert className="size-5 text-destructive" />,
    title: "Harmful Content Detected",
    description: "AI detected a potentially harmful message in a chat application.",
    time: "2m ago",
    details: {
      source: "Notification",
      reason: "The message contains bullying language.",
      isHarmful: true
    },
    badge: <Badge variant="destructive">Urgent</Badge>
  },
  {
    icon: <FileImage className="size-5" />,
    title: "New Screenshot Captured",
    description: "A screenshot of a social media post was taken.",
    time: "15m ago",
  },
  {
    icon: <Smartphone className="size-5 text-blue-500" />,
    title: "New App Installed",
    description: "'Clash of Clans' was installed from the Play Store.",
    time: "1h ago",
    badge: <Badge variant="secondary">Info</Badge>
  },
  {
    icon: <ClipboardCopy className="size-5" />,
    title: "Clipboard Content Copied",
    description: "A URL was copied to the clipboard: https://example.com/...",
    time: "2h ago",
  },
    {
    icon: <ShieldAlert className="size-5 text-amber-500" />,
    title: "Suspicious Website Visited",
    description: "AI flagged a website with unmoderated chat features.",
    time: "3h ago",
     details: {
      source: "Screenshot",
      reason: "The website contains a public chat room which may expose the child to strangers.",
      isHarmful: true
    },
    badge: <Badge variant="outline" className="border-amber-500 text-amber-500">Warning</Badge>
  },
];

export function ActivityFeed() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
        <CardDescription>
          A real-time log of your child's device activity.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-6">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <Avatar className="h-9 w-9 border">
                  <AvatarFallback className="bg-background">{activity.icon}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">
                      {activity.title}
                    </p>
                    <time className="text-sm text-muted-foreground">
                      {activity.time}
                    </time>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                  {activity.details && (
                     <p className="text-xs text-destructive/80 mt-1 p-2 bg-destructive/10 rounded-md border border-destructive/20">
                      <strong>AI Analysis:</strong> {activity.details.reason}
                    </p>
                  )}
                </div>
                {activity.badge && <div>{activity.badge}</div>}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
