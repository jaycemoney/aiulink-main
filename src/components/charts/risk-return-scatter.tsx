"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ZAxis,
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
  {
    name: "공격적 성장",
    risk: 25,
    return: 5.1,
    fill: "var(--color-scenario1)",
  },
  {
    name: "균형적 접근",
    risk: 18,
    return: 4.2,
    fill: "var(--color-scenario2)",
  },
  {
    name: "안정성 우선",
    risk: 12,
    return: 3.5,
    fill: "var(--color-scenario3)",
  },
  {
    name: "신시장 개척",
    risk: 35,
    return: 6.2,
    fill: "var(--color-scenario4)",
  },
  {
    name: "비용 절감",
    risk: 10,
    return: 3.1,
    fill: "var(--color-scenario5)",
  },
];

const chartConfig = {
  return: {
    label: "기대 수익률 (%)",
  },
  risk: {
    label: "위험 (표준편차 %)",
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

export default function RiskReturnScatter() {
  return (
    <div className="h-64 w-full">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="risk"
              name="Risk"
              unit="%"
              label={{
                value: "위험 (표준편차)",
                position: "insideBottom",
                offset: -10,
              }}
            />
            <YAxis
              type="number"
              dataKey="return"
              name="Return"
              unit="%"
              label={{
                value: "기대 수익률",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <ZAxis type="category" dataKey="name" name="Scenario" />
            <ChartTooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={<ChartTooltipContent />}
            />
            <Scatter name="Scenarios" data={chartData} />
            <ChartLegend content={<ChartLegendContent />} />
          </ScatterChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
