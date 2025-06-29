
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export type ScreenTimeData = { app: string; minutes: number; fill: string }[]

const chartConfig = {
  minutes: {
    label: "Minutes",
  },
  youtube: {
    label: "YouTube",
    color: "hsl(var(--chart-1))",
  },
  tiktok: {
    label: "TikTok",
    color: "hsl(var(--chart-2))",
  },
  minecraft: {
    label: "Minecraft",
    color: "hsl(var(--chart-3))",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-4))",
  },
  instagram: {
    label: "Instagram",
    color: "hsl(var(--chart-5))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--muted))",
  },
  roblox: {
    label: "Roblox",
    color: "hsl(var(--chart-1))",
  },
  messages: {
    label: "Messages",
    color: "hsl(var(--chart-3))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-4))",
  },
  facetime: {
    label: "FaceTime",
    color: "hsl(var(--chart-3))",
  }
} satisfies ChartConfig

interface ScreenTimeChartProps {
  chartData: ScreenTimeData;
}

export function ScreenTimeChart({ chartData }: ScreenTimeChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Screen Time by App</CardTitle>
        <CardDescription>Today's usage statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 10,
              right: 10
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="app"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value.toLowerCase() as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="minutes" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="minutes"
              radius={5}
              background={{
                fill: 'hsl(var(--muted) / 0.5)',
                radius: 5,
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
