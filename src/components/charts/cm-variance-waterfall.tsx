"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const chartData = [
  { name: "Plan CM", value: 1200 },
  { name: "Volume", value: 80 },
  { name: "Price", value: -50 },
  { name: "Mix", value: 30 },
  { name: "Cost", value: -40 },
  { name: "Actual CM", value: 0 },
];

let cumulative = 0;
const processedData = chartData.map((entry, index) => {
  const isStartOrEnd = index === 0 || index === chartData.length - 1;
  let range: [number, number];
  let value = entry.value;

  if (isStartOrEnd) {
    if (index === 0) {
      range = [0, value];
      cumulative += value;
    } else {
      // End bar
      range = [0, cumulative];
      value = cumulative;
    }
  } else {
    const prevCumulative = cumulative;
    cumulative += value;
    if (value >= 0) {
      range = [prevCumulative, cumulative];
    } else {
      range = [cumulative, prevCumulative];
    }
  }

  return { ...entry, value, range };
});

const allValues = processedData.flatMap((d) => d.range);
const yAxisDomain = [
  Math.min(...allValues, 0) - 100,
  Math.max(...allValues, 0) + 100,
];

const chartConfig = {
  value: {
    label: "CM ($K)",
  },
} satisfies ChartConfig;

const CustomBar = (props: any) => {
  const { x, y, width, height, payload } = props;
  const isPositive = payload.value >= 0;

  let fill;
  if (payload.name === "Plan CM" || payload.name === "Actual CM") {
    fill = "hsl(var(--chart-1))";
  } else {
    fill = isPositive ? "hsl(var(--chart-5))" : "hsl(var(--chart-4))";
  }

  return <rect x={x} y={y} width={width} height={height} fill={fill} />;
};

export default function CmVarianceWaterfall() {
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
    <div className="h-80 w-full" ref={containerRef}>
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer key={width} width="100%" height="100%">
          <BarChart data={processedData}>
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
              unit="K"
              domain={yAxisDomain}
              allowDataOverflow={false}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name, props) => {
                    if (props.payload.name === 'Plan CM' || props.payload.name === 'Actual CM') {
                      return [`$${props.payload.value}K`, name]
                    }
                    return [`${props.payload.value >= 0 ? '+' : ''}$${props.payload.value}K`, name]
                  }}
                />
              }
            />
            <Bar dataKey="range" shape={<CustomBar />} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}