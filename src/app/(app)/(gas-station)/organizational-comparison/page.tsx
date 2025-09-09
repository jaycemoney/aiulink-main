"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDown, ArrowUp } from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";
import { SmartFilter } from "@/components/dashboard/smart-filter";

const orgPerformanceData = [
  {
    org: "Organization A",
    target: 500,
    actual: 450,
    achievement: 90,
    prevMonth: 430,
    avg3m: 440,
    avg12m: 420,
    yoy: 5.1,
    ytd: 4500,
  },
  {
    org: "Organization B",
    target: 400,
    actual: 380,
    achievement: 95,
    prevMonth: 390,
    avg3m: 385,
    avg12m: 370,
    yoy: -2.5,
    ytd: 3800,
  },
  {
    org: "Organization C",
    target: 600,
    actual: 610,
    achievement: 101.7,
    prevMonth: 580,
    avg3m: 590,
    avg12m: 570,
    yoy: 8.2,
    ytd: 6100,
  },
];

const timeSeriesData = [
  { month: "Jan", "Organization A": 92, "Organization B": 94, "Organization C": 98 },
  { month: "Feb", "Organization A": 88, "Organization B": 91, "Organization C": 102 },
  { month: "Mar", "Organization A": 95, "Organization B": 96, "Organization C": 101 },
  { month: "Apr", "Organization A": 91, "Organization B": 93, "Organization C": 99 },
  { month: "May", "Organization A": 93, "Organization B": 97, "Organization C": 105 },
  { month: "Jun", "Organization A": 90, "Organization B": 95, "Organization C": 101.7 },
];

const chartConfig = {
  "Organization A": { label: "Org A", color: "hsl(var(--chart-1))" },
  "Organization B": { label: "Org B", color: "hsl(var(--chart-2))" },
  "Organization C": { label: "Org C", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

const benchmarkingData = [
    { metric: "리터당 마진", "Organization A": "₩85.5", "Organization B": "₩88.1", "Organization C": "₩82.3", best: "Organization B" },
    { metric: "판매량 성장률 (YOY)", "Organization A": "5.1%", "Organization B": "-2.5%", "Organization C": "8.2%", best: "Organization C" },
    { metric: "고객 만족도", "Organization A": "4.2/5", "Organization B": "4.5/5", "Organization C": "4.1/5", best: "Organization B" },
    { metric: "운영 효율성", "Organization A": "92%", "Organization B": "89%", "Organization C": "95%", best: "Organization C" },
];

export default function OrganizationalComparisonPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">조직별 상세 비교</h2>
        <p className="text-muted-foreground">
          조직별 성과를 비교하고 벤치마킹 지표를 확인합니다.
        </p>
      </div>

      <SmartFilter />

      <Card>
        <CardHeader>
          <CardTitle>조직 성과 비교</CardTitle>
          <CardDescription>
            조직별 상세 목표/실적 및 평균 성과를 비교합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>조직</TableHead>
                <TableHead>목표</TableHead>
                <TableHead>실적</TableHead>
                <TableHead>달성률 (%)</TableHead>
                <TableHead>전월 실적</TableHead>
                <TableHead>3개월 평균</TableHead>
                <TableHead>12개월 평균</TableHead>
                <TableHead>전년동월 대비 (%)</TableHead>
                <TableHead>YTD</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orgPerformanceData.map((org) => (
                <TableRow key={org.org}>
                  <TableCell className="font-medium">{org.org}</TableCell>
                  <TableCell>{org.target}</TableCell>
                  <TableCell>{org.actual}</TableCell>
                  <TableCell>{org.achievement}</TableCell>
                  <TableCell>{org.prevMonth}</TableCell>
                  <TableCell>{org.avg3m}</TableCell>
                  <TableCell>{org.avg12m}</TableCell>
                  <TableCell className={`flex items-center ${org.yoy > 0 ? "text-success" : "text-destructive"}`}>
                    {org.yoy > 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                    {Math.abs(org.yoy)}
                  </TableCell>
                  <TableCell>{org.ytd}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>시계열 분석</CardTitle>
            <CardDescription>
              지난 6개월간 조직별 달성률 추이를 시각화합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-hidden">
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <LineChart data={timeSeriesData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis unit="%" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line dataKey="Organization A" type="monotone" stroke="var(--color-organization-a)" />
                <Line dataKey="Organization B" type="monotone" stroke="var(--color-organization-b)" />
                <Line dataKey="Organization C" type="monotone" stroke="var(--color-organization-c)" />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>벤치마킹</CardTitle>
            <CardDescription>
              주요 지표에 대해 조직별 성과를 벤치마킹합니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>지표</TableHead>
                  <TableHead>Organization A</TableHead>
                  <TableHead>Organization B</TableHead>
                  <TableHead>Organization C</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {benchmarkingData.map((item) => (
                  <TableRow key={item.metric}>
                    <TableCell className="font-medium">{item.metric}</TableCell>
                    <TableCell className={item.best === 'Organization A' ? 'text-success font-bold' : ''}>{item['Organization A']}</TableCell>
                    <TableCell className={item.best === 'Organization B' ? 'text-success font-bold' : ''}>{item['Organization B']}</TableCell>
                    <TableCell className={item.best === 'Organization C' ? 'text-success font-bold' : ''}>{item['Organization C']}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
