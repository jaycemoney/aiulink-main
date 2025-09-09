"use client";

import KpiCard from "@/components/kpi-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp, TrendingDown, Target } from "lucide-react";
import CmVarianceWaterfall from "@/components/charts/cm-variance-waterfall";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const performanceData = [
  {
    product: "Product A",
    plan: 10000,
    actual: 10500,
    variance: 5,
    region: "North America",
  },
  {
    product: "Product B",
    plan: 8000,
    actual: 7800,
    variance: -2.5,
    region: "Europe",
  },
  {
    product: "Product C",
    plan: 12000,
    actual: 12100,
    variance: 0.8,
    region: "Asia",
  },
  {
    product: "Product D",
    plan: 5000,
    actual: 5500,
    variance: 10,
    region: "North America",
  },
];

export default function AnalysisPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <KpiCard
          title="계획 대비 판매량"
          value="+2.3%"
          change="Last Quarter"
          icon={<TrendingUp className="h-5 w-5 text-green-500" />}
          changeColor="text-green-500"
        />
        <KpiCard
          title="계획 대비 가격"
          value="-0.8%"
          change="Last Quarter"
          icon={<TrendingDown className="h-5 w-5 text-red-500" />}
          changeColor="text-red-500"
        />
        <KpiCard
          title="계획 정확도"
          value="95.7%"
          change="Overall Accuracy"
          icon={<Target className="h-5 w-5 text-blue-500" />}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>CM 변동 요인 분석 (Waterfall)</CardTitle>
            <CardDescription>
              계획 대비 실제 Contribution Margin 변동 요인
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CmVarianceWaterfall />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>제품/지역별 성과 분석</CardTitle>
            <CardDescription>
              계획 대비 실제 판매량 상세 비교 (단위: 천 개)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>제품</TableHead>
                  <TableHead>지역</TableHead>
                  <TableHead className="text-right">계획</TableHead>
                  <TableHead className="text-right">실제</TableHead>
                  <TableHead className="text-right">차이</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {performanceData.map((item) => (
                  <TableRow key={item.product}>
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell>{item.region}</TableCell>
                    <TableCell className="text-right">
                      {item.plan / 1000}k
                    </TableCell>
                    <TableCell className="text-right">
                      {item.actual / 1000}k
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={item.variance > 0 ? "default" : "destructive"}
                        className={
                          item.variance > 0
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }
                      >
                        {item.variance > 0 ? "+" : ""}
                        {item.variance.toFixed(1)}%
                      </Badge>
                    </TableCell>
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
