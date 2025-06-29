
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

const chartData = [
  { app: "YouTube", minutes: 125, fill: "var(--color-youtube)" },
  { app: "TikTok", minutes: 90, fill: "var(--color-tiktok)" },
  { app: "Minecraft", minutes: 60, fill: "var(--color-minecraft)" },
  { app: "Chrome", minutes: 45, fill: "var(--color-chrome)" },
  { app: "Instagram", minutes: 32, fill: "var(--color-instagram)" },
  { app: "Other", minutes: 20, fill: "var(--color-other)" },
]

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
} satisfies ChartConfig

export function ScreenTimeChart() {
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
                chartConfig[value as keyof typeof chartConfig]?.label
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
