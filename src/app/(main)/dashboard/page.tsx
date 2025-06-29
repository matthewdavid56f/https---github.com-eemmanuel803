
"use client"

import * as React from "react"
import { DeviceStatusCard } from "@/components/device-status-card"
import { KeyMetricCard } from "@/components/key-metric-card"
import { ActivityFeed, Activity } from "@/components/activity-feed"
import { AlertTriangle, Hourglass, ShieldCheck, Loader2 } from "lucide-react"
import { ScreenTimeChart } from "@/components/screen-time-chart"
import { useChild } from "@/contexts/child-context"
import { analyzeContent, AnalyzeContentInput } from "@/ai/flows/analyze-content"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function DashboardPage() {
  const { childrenData, selectedChild, setSelectedChildId, isLoading } = useChild()
  const [processedActivities, setProcessedActivities] = React.useState<Activity[]>([]);
  const [isAnalyzing, setIsAnalyzing] = React.useState(true);

  React.useEffect(() => {
    const processActivities = async () => {
      if (!selectedChild) return;
      
      setIsAnalyzing(true);
      const newActivities: Activity[] = [];

      // Use Promise.all to run analyses in parallel for efficiency
      const analysisPromises = selectedChild.activities.map(async (activity) => {
        // Only re-analyze activities that have a 'details' block, which indicates they are suitable for AI analysis.
        if (activity.details) {
          try {
            const input: AnalyzeContentInput = {
              source: activity.details.source.toLowerCase() as 'screenshot' | 'clipboard' | 'notification',
              content: `${activity.title}: ${activity.description}`,
            };
            const analysis = await analyzeContent(input);
            
            // Return a new activity object with the AI's analysis results
            return {
              ...activity,
              details: {
                ...activity.details,
                isHarmful: analysis.isHarmful,
                reason: analysis.reason,
              },
            };
          } catch (error) {
            console.error("AI analysis failed for activity:", activity.title, error);
            // If analysis fails, return the original activity to still display it
            return activity;
          }
        }
        // If there are no details, return the activity as is
        return activity;
      });

      const results = await Promise.all(analysisPromises);
      
      setProcessedActivities(results);
      setIsAnalyzing(false);
    };

    processActivities();
  }, [selectedChild]);

  if (!selectedChild) {
    return <div className="flex-1 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  return (
    <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DeviceStatusCard
            childrenData={childrenData}
            selectedChild={selectedChild}
            onChildChange={setSelectedChildId}
          />
          <KeyMetricCard
            title="Alerts Today"
            value={selectedChild.metrics.alerts}
            icon={AlertTriangle}
            description={selectedChild.metrics.alertsDescription}
            variant="destructive"
          />
          <KeyMetricCard
            title="Screen Time"
            value={selectedChild.metrics.screenTime}
            icon={Hourglass}
            description={selectedChild.metrics.screenTimeDescription}
          />
          <KeyMetricCard
            title="Apps Checked"
            value={selectedChild.metrics.appsChecked}
            icon={ShieldCheck}
            description={selectedChild.metrics.appsCheckedDescription}
          />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
            {isLoading || isAnalyzing ? (
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Activity Feed</CardTitle>
                  <CardDescription>
                    AI is analyzing recent activity...
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-[400px]">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </CardContent>
              </Card>
            ) : (
              <ActivityFeed activities={processedActivities} />
            )}
            <ScreenTimeChart chartData={selectedChild.screenTimeData} />
        </div>
      </div>
    </main>
  )
}
