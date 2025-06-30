
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
import { NoDeviceConnected } from "@/components/no-device-connected"

export default function DashboardPage() {
  const { childrenData, selectedChild, setSelectedChildId, isSwitching } = useChild()
  const [processedActivities, setProcessedActivities] = React.useState<Activity[]>([]);
  const [isAnalyzing, setIsAnalyzing] = React.useState(true);

  React.useEffect(() => {
    const processActivities = async () => {
      if (!selectedChild) {
        setProcessedActivities([]);
        setIsAnalyzing(false);
        return;
      };
      
      setIsAnalyzing(true);
      const analysisPromises = selectedChild.activities.map(async (activity) => {
        if (activity.details) {
          try {
            const input: AnalyzeContentInput = {
              source: activity.details.source.toLowerCase() as 'screenshot' | 'clipboard' | 'notification',
              content: `${activity.title}: ${activity.description}`,
            };
            const analysis = await analyzeContent(input);
            
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
            return activity;
          }
        }
        return activity;
      });

      const results = await Promise.all(analysisPromises);
      
      setProcessedActivities(results);
      setIsAnalyzing(false);
    };

    processActivities();
  }, [selectedChild]);
  

  return (
    <main className="flex-1 flex flex-col p-4 md:p-8 pt-6">
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
          <DeviceStatusCard
            childrenData={childrenData}
            selectedChild={selectedChild}
            onChildChange={setSelectedChildId}
          />
          {selectedChild && !isSwitching && (
            <>
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
            </>
          )}
           {isSwitching && Array.from({ length: 3 }).map((_, i) => (
             <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="h-4 bg-muted rounded w-2/4" />
                </CardHeader>
                <CardContent>
                    <div className="h-7 bg-muted rounded w-1/4 mb-2" />
                    <div className="h-3 bg-muted rounded w-3/4" />
                </CardContent>
            </Card>
           ))}

       </div>

       <div className="flex-1">
          {isSwitching ? (
             <div className="grid gap-4 lg:grid-cols-2">
               <Card>
                  <CardHeader>
                    <CardTitle>Activity Feed</CardTitle>
                     <CardDescription>Loading activity...</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px] flex items-center justify-center">
                     <Loader2 className="h-8 w-8 animate-spin" />
                  </CardContent>
               </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Screen Time by App</CardTitle>
                    <CardDescription>Loading usage statistics...</CardDescription>
                  </CardHeader>
                   <CardContent className="h-[400px] flex items-center justify-center">
                     <Loader2 className="h-8 w-8 animate-spin" />
                  </CardContent>
                </Card>
             </div>
          ) : !selectedChild ? (
             <NoDeviceConnected />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {isAnalyzing ? (
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
          )}
       </div>
    </main>
  )
}
