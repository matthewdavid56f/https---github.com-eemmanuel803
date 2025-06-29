
"use client"

import * as React from "react"
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
} from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileImage, ShieldAlert, Smartphone, ClipboardCopy, type LucideProps } from "lucide-react"
import { Badge } from "./ui/badge"
import { cn } from "@/lib/utils"

export type Activity = {
  icon: string,
  iconClassName?: string,
  title: string,
  description: string,
  time: string,
  details?: {
    source: string,
    reason: string,
    isHarmful: boolean
  },
  badge?: React.ReactNode
}

interface ActivityFeedProps {
  activities: Activity[];
}

const iconMap: { [key: string]: React.FC<LucideProps> } = {
  ShieldAlert,
  FileImage,
  Smartphone,
  ClipboardCopy,
};

const ActivityIcon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent className={cn("size-5", className)} />;
};


export function ActivityFeed({ activities }: ActivityFeedProps) {
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
                  <AvatarFallback className="bg-background">
                    <ActivityIcon name={activity.icon} className={activity.iconClassName} />
                  </AvatarFallback>
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
                  {activity.details && activity.details.isHarmful && (
                     <p className="text-xs text-destructive/80 mt-1 p-2 bg-destructive/10 rounded-md border border-destructive/20">
                      <strong>AI Analysis:</strong> {activity.details.reason}
                    </p>
                  )}
                </div>
                {activity.badge && <div>{activity.badge}</div>}
              </div>
            ))}
             {activities.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p>No recent activity.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
