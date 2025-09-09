"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { range: "3.0-3.5M", count: 50 },
  { range: "3.5-4.0M", count: 150 },
  { range: "4.0-4.5M", count: 300 },
  { range: "4.5-5.0M", count: 250 },
  { range: "5.0-5.5M", count: 150 },
  { range: "5.5-6.0M", count: 100 },
];

const chartConfig = {
  count: {
    label: "시뮬레이션 횟수",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function RevenueDistributionChart() {
  return (
    <div className="h-64 w-full">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis
              dataKey="range"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
            />
            <YAxis tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
