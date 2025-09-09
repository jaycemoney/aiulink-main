"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig
} from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Bot, Loader2 } from "lucide-react";
import { SmartFilter } from "@/components/dashboard/smart-filter";
import { generateSalesActions } from "@/ai/flows/generate-sales-actions";

const salesData = {
  total: { current: 820, target: 1000, remaining: 180 },
  byType: [
    { type: '휘발유', current: 450, target: 500, achievement: 90 },
    { type: '경유', current: 300, target: 400, achievement: 75 },
    { type: '등유', current: 70, target: 100, achievement: 70 },
  ],
  byChannel: [
    { channel: '직영점', current: 500, target: 600, achievement: 83.3 },
    { channel: '가맹점', current: 320, target: 400, achievement: 80 },
  ],
};

const dailyTrendData = [
  { day: "1", sales: 50, dubaiPrice: 85.1 },
  { day: "5", sales: 55, dubaiPrice: 84.5 },
  { day: "10", sales: 62, dubaiPrice: 86.2 },
  { day: "15", sales: 58, dubaiPrice: 85.8 },
  { day: "20", sales: 70, dubaiPrice: 87.0 },
  { day: "25", sales: 75, dubaiPrice: 88.5 },
  { day: "30", sales: 82, dubaiPrice: 89.1 },
];

const chartConfig = {
  sales: {
    label: "Sales (k-drum)",
    color: "hsl(var(--chart-1))",
  },
  dubaiPrice: {
    label: "Dubai Price ($)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function SalesPerformancePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiActions, setAiActions] = useState<string[]>([]);
  
  const achievementRate = (salesData.total.current / salesData.total.target) * 100;

  const handleGenerateActions = async () => {
    setIsDialogOpen(true);
    setIsLoading(true);
    try {
      const result = await generateSalesActions({ salesData: JSON.stringify({ salesData, dailyTrendData }) });
      setAiActions(result.suggestedActions);
    } catch (error) {
      console.error("Failed to generate sales actions:", error);
      setAiActions(["Error generating actions. Please try again later."]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">판매 달성도</h2>
        <p className="text-muted-foreground">
          판매 목표 대비 실적, 유종/채널별 세부 성과, 일별 추이를 분석합니다.
        </p>
      </div>

      <SmartFilter />

      <Card>
        <CardHeader>
          <CardTitle>전체 달성 현황</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col items-center justify-center space-y-1 rounded-lg border p-6">
            <p className="text-sm font-medium text-muted-foreground">현재 총 실적</p>
            <p className="text-4xl font-bold">{salesData.total.current.toLocaleString()} <span className="text-lg font-normal text-muted-foreground">k-drum</span></p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-1 rounded-lg border p-6">
            <p className="text-sm font-medium text-muted-foreground">목표 실적</p>
            <p className="text-4xl font-bold">{salesData.total.target.toLocaleString()} <span className="text-lg font-normal text-muted-foreground">k-drum</span></p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-1 rounded-lg border p-6">
            <p className="text-sm font-medium text-muted-foreground">잔여 실적</p>
            <p className="text-4xl font-bold text-primary">{salesData.total.remaining.toLocaleString()} <span className="text-lg font-normal text-muted-foreground">k-drum</span></p>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2">
            <p className="text-sm font-medium">달성률: <span className="font-bold text-primary">{achievementRate.toFixed(1)}%</span></p>
            <Progress value={achievementRate} />
        </CardFooter>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>유종별 분석</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>유종</TableHead>
                  <TableHead>실적</TableHead>
                  <TableHead>목표</TableHead>
                  <TableHead className="text-right">달성률</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesData.byType.map((item) => (
                  <TableRow key={item.type}>
                    <TableCell className="font-medium">{item.type}</TableCell>
                    <TableCell>{item.current}</TableCell>
                    <TableCell>{item.target}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={item.achievement >= 90 ? "default" : "secondary" } className={`${item.achievement >= 90 ? 'bg-success hover:bg-success/80' : 'bg-warning hover:bg-warning/80'}`}>{item.achievement.toFixed(1)}%</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>채널별 분석</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>채널</TableHead>
                  <TableHead>실적</TableHead>
                  <TableHead>목표</TableHead>
                  <TableHead className="text-right">달성률</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesData.byChannel.map((item) => (
                  <TableRow key={item.channel}>
                    <TableCell className="font-medium">{item.channel}</TableCell>
                    <TableCell>{item.current}</TableCell>
                    <TableCell>{item.target}</TableCell>
                    <TableCell className="text-right">
                       <Badge variant={item.achievement >= 90 ? "default" : "secondary" } className={`${item.achievement >= 90 ? 'bg-success hover:bg-success/80' : 'bg-warning hover:bg-warning/80'}`}>{item.achievement.toFixed(1)}%</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle>일별 추이 분석</CardTitle>
                    <CardDescription>일별 실적 추이와 Dubai 유가 변동을 비교 분석합니다.</CardDescription>
                </div>
                <Button onClick={handleGenerateActions}>
                    <Bot className="mr-2 h-4 w-4" />
                    Generate Report
                </Button>
            </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <LineChart data={dailyTrendData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis yAxisId="left" stroke="var(--color-sales)" />
              <YAxis yAxisId="right" orientation="right" stroke="var(--color-dubaiPrice)" />
              <Tooltip
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line yAxisId="left" dataKey="sales" type="monotone" stroke="var(--color-sales)" strokeWidth={2} dot={false} />
              <Line yAxisId="right" dataKey="dubaiPrice" type="monotone" stroke="var(--color-dubaiPrice)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>AI-Generated Sales Actions</DialogTitle>
            <DialogDescription>
              Based on the current performance, here are some suggested actions.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">AI is thinking...</p>
              </div>
            ) : (
              <ul className="space-y-3 list-disc list-inside">
                {aiActions.map((action, index) => (
                  <li key={index} className="text-sm text-foreground">{action}</li>
                ))}
              </ul>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
