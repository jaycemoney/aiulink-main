"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { scenario: "공격적 성장", score: 92, fill: "var(--color-scenario1)" },
  { scenario: "균형적 접근", score: 85, fill: "var(--color-scenario2)" },
  { scenario: "안정성 우선", score: 78, fill: "var(--color-scenario3)" },
  { scenario: "신시장 개척", score: 71, fill: "var(--color-scenario4)" },
  { scenario: "비용 절감", score: 65, fill: "var(--color-scenario5)" },
];

const chartConfig = {
  score: {
    label: "Score",
  },
  scenario1: {
    label: "공격적 성장",
    color: "hsl(var(--chart-1))",
  },
  scenario2: {
    label: "균형적 접근",
    color: "hsl(var(--chart-2))",
  },
  scenario3: {
    label: "안정성 우선",
    color: "hsl(var(--chart-3))",
  },
  scenario4: {
    label: "신시장 개척",
    color: "hsl(var(--chart-4))",
  },
  scenario5: {
    label: "비용 절감",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function ScenarioRankingChart() {
  return (
    <div className="h-64 w-full">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ left: 10, right: 10 }}
          >
            <XAxis type="number" hide />
            <YAxis
              dataKey="scenario"
              type="category"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
              width={80}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="score" radius={5} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
