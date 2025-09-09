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
import { DollarSign, Droplets, Fuel, Gauge, LineChart, MapPin, TrendingDown, TrendingUp } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { SmartFilter } from "@/components/dashboard/smart-filter";

const kpiData = [
  { title: "전체 주유소 수", value: "1,254", icon: Fuel, change: "+12", changeType: "increase" },
  { title: "총 마진", value: "₩15.2B", icon: DollarSign, change: "-2.1%", changeType: "decrease" },
  { title: "총 판매량 (드럼)", value: "3.2M", icon: Droplets, change: "+5.4%", changeType: "increase" },
  { title: "평균 가격", value: "₩1,680/L", icon: Gauge, change: "+₩15", changeType: "increase" },
];

const marginData = [
    { item: "휘발유 마진", total: "₩8.2B", perLiter: "₩85.5" },
    { item: "경유 마진", total: "₩6.1B", perLiter: "₩72.1" },
    { item: "등유 마진", total: "₩0.9B", perLiter: "₩95.2" },
    { item: "운영 비용", total: "-₩2.5B", perLiter: "-₩26.0" },
    { item: "순 마진", total: "₩12.7B", perLiter: "₩133.3" },
];

const unitContributionData = [
    { unit: "Unit A", margin: 4000 },
    { unit: "Unit B", margin: 3000 },
    { unit: "Unit C", margin: 2000 },
    { unit: "Unit D", margin: 2780 },
    { unit: "Unit E", margin: 1890 },
    { unit: "Unit F", margin: 2390 },
    { unit: "Unit G", margin: 3490 },
];

const districtMarginData = [
    { name: "Gangnam", margin: 520 },
    { name: "Seocho", margin: 480 },
    { name: "Mapo", margin: 450 },
    { name: "Jongno", margin: 390 },
    { name: "Yeongdeungpo", margin: 350 },
    { name: "Guro", margin: 320 },
];

const priceDistributionData = [
  { priceRange: "1500-1600", count: 150 },
  { priceRange: "1601-1700", count: 750 },
  { priceRange: "1701-1800", count: 250 },
  { priceRange: "1801-1900", count: 104 },
];

const chartConfig = {
  margin: {
    label: "Margin",
    color: "hsl(var(--chart-1))",
  },
  count: {
    label: "Count",
    color: "hsl(var(--chart-2))",
  }
};


export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">통합 현황</h2>
        <p className="text-muted-foreground">
          전체 사업 현황에 대한 거시적 지표를 확인합니다.
        </p>
      </div>

      <SmartFilter />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {kpi.changeType === 'increase' ? <TrendingUp className="h-3 w-3 mr-1 text-success" /> : <TrendingDown className="h-3 w-3 mr-1 text-destructive" />}
                <span className={kpi.changeType === 'increase' ? 'text-success' : 'text-destructive'}>{kpi.change}</span>
                {" "}vs last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>마진 분석</CardTitle>
            <CardDescription>주요 마진 항목의 총액과 리터당 마진 분석</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>항목</TableHead>
                        <TableHead className="text-right">총액</TableHead>
                        <TableHead className="text-right">리터당 마진</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {marginData.map((row) => (
                        <TableRow key={row.item}>
                            <TableCell className="font-medium">{row.item}</TableCell>
                            <TableCell className={`text-right ${row.total.startsWith('-') ? 'text-destructive' : ''}`}>{row.total}</TableCell>
                            <TableCell className={`text-right ${row.perLiter.startsWith('-') ? 'text-destructive' : ''}`}>{row.perLiter}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>가격 분포도</CardTitle>
            <CardDescription>주유소 별 리터당 가격 분포</CardDescription>
          </CardHeader>
          <CardContent>
             <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart accessibilityLayer data={priceDistributionData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="priceRange" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-margin)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-4 md:grid-cols-2">
         <Card>
           <CardHeader>
             <CardTitle>유닛 기여 마진 분포</CardTitle>
             <CardDescription>유닛별 마진 기여도를 시각화합니다.</CardDescription>
           </CardHeader>
           <CardContent>
             <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={unitContributionData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="unit" tickLine={false} axisLine={false} />
                <YAxis unit="M" />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                <Bar dataKey="margin" fill="var(--color-margin)" radius={5} />
              </BarChart>
             </ChartContainer>
           </CardContent>
         </Card>
         <Card>
           <CardHeader>
             <CardTitle>시군구별 마진 분포</CardTitle>
             <CardDescription>시군구별 마진 현황을 보여줍니다.</CardDescription>
           </CardHeader>
           <CardContent>
             <ChartContainer config={chartConfig} className="h-[300px] w-full">
               <BarChart data={districtMarginData} layout="vertical">
                 <CartesianGrid horizontal={false} />
                 <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={80} />
                 <XAxis type="number" unit="M" />
                 <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                 <Bar dataKey="margin" fill="var(--color-margin)" radius={4} />
               </BarChart>
             </ChartContainer>
           </CardContent>
         </Card>
       </div>
    </div>
  );
}
