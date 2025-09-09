"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  PolarRadiusAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { metric: "VaR", scenario1: 150, scenario2: 120, scenario3: 90 },
  { metric: "CVaR", scenario1: 200, scenario2: 160, scenario3: 110 },
  { metric: "변동성", scenario1: 25, scenario2: 18, scenario3: 12 },
  { metric: "최악 시나리오", scenario1: 300, scenario2: 220, scenario3: 150 },
  { metric: "견고성", scenario1: 60, scenario2: 80, scenario3: 95 },
];

const chartConfig = {
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
} satisfies ChartConfig;

export default function RiskMetricsRadar() {
  return (
    <div className="h-64 w-full">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" />
            <PolarRadiusAxis angle={30} domain={[0, 300]} />
            <Radar
              name="공격적 성장"
              dataKey="scenario1"
              stroke="var(--color-scenario1)"
              fill="var(--color-scenario1)"
              fillOpacity={0.6}
            />
            <Radar
              name="균형적 접근"
              dataKey="scenario2"
              stroke="var(--color-scenario2)"
              fill="var(--color-scenario2)"
              fillOpacity={0.6}
            />
            <Radar
              name="안정성 우선"
              dataKey="scenario3"
              stroke="var(--color-scenario3)"
              fill="var(--color-scenario3)"
              fillOpacity={0.6}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
          </RadarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
