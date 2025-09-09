"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartConfig,
} from "@/components/ui/chart";
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const chartData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  const plan = Math.floor(Math.random() * (120 - 100 + 1) + 100);
  const actual = Math.floor(plan * (Math.random() * (1.05 - 0.95) + 0.95));
  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    plan,
    actual,
  };
});

const chartConfig = {
  plan: {
    label: "계획 생산량",
    color: "hsl(var(--chart-2))",
  },
  actual: {
    label: "실제 생산량",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function ProductionTrendChart() {
  const [width, setWidth] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-full w-full overflow-hidden" ref={containerRef}>
      <ChartContainer config={chartConfig} className="h-full w-full">
        <ResponsiveContainer key={width} width="100%" height="100%">
          <LineChart 
            data={chartData} 
            margin={{ 
              top: 20, 
              right: 20, 
              bottom: 40, 
              left: 10 
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "hsl(var(--foreground))", fontSize: 11 }}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: "hsl(var(--foreground))", fontSize: 11 }}
              tickMargin={8}
              width={40}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              type="monotone"
              dataKey="plan"
              stroke="var(--color-plan)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="var(--color-actual)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}