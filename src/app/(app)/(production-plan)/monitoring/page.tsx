"use client";

import KpiCard from "@/components/kpi-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PackageCheck,
  TrendingUp,
  DollarSign,
  Star,
  Cpu,
} from "lucide-react";
import ProductionTrendChart from "@/components/charts/production-trend-chart";
import AlertsCard from "@/components/alerts-card";

export default function MonitoringPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <KpiCard
          title="생산 달성률"
          value="98.5%"
          change="+1.2% vs Plan"
          icon={<PackageCheck className="h-5 w-5 text-green-500" />}
          changeColor="text-green-500"
        />
        <KpiCard
          title="가격 편차"
          value="+3.2%"
          change="vs Forecast"
          icon={<TrendingUp className="h-5 w-5 text-green-500" />}
          changeColor="text-green-500"
        />
        <KpiCard
          title="CM 변화량"
          value="-$21k"
          change="-0.8% vs Plan"
          icon={<DollarSign className="h-5 w-5 text-red-500" />}
          changeColor="text-red-500"
        />
        <KpiCard
          title="품질 지수"
          value="99.8"
          change="Stable"
          icon={<Star className="h-5 w-5 text-blue-500" />}
        />
        <KpiCard
          title="설비 가동률"
          value="92.7%"
          change="-1.5% vs Target"
          icon={<Cpu className="h-5 w-5 text-yellow-500" />}
          changeColor="text-yellow-500"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>30일 생산량 추이</CardTitle>
            <CardDescription>
              지난 30일간의 계획 대비 실제 생산량 추세
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ProductionTrendChart />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>알림 및 경고</CardTitle>
            <CardDescription>최근 발생한 주요 시스템 알림</CardDescription>
          </CardHeader>
          <CardContent>
            <AlertsCard />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
