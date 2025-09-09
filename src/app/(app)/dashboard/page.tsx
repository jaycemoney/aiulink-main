import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FileClock,
  LayoutGrid,
  PlusCircle,
  BarChart,
  LineChart,
  Table,
} from "lucide-react";
import Link from "next/link";
import { recentActivities } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Home Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, here's a summary of your workspace.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/data-explorer">
              <PlusCircle className="mr-2 h-4 w-4" /> New Query
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/dashboards">
              <LayoutGrid className="mr-2 h-4 w-4" /> New Dashboard
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Favorite Dashboards</CardTitle>
            <CardDescription>
              Quickly access your most used dashboards.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <Link
                  href="/overview"
                  className="font-medium hover:underline flex items-center gap-2"
                >
                  <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                  <span>통합 현황</span>
                </Link>
                <Badge variant="outline">Overview</Badge>
              </li>
              <li className="flex items-center justify-between">
                <Link
                  href="/sales-performance"
                  className="font-medium hover:underline flex items-center gap-2"
                >
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                  <span>판매 달성도</span>
                </Link>
                <Badge variant="secondary">Sales</Badge>
              </li>
              <li className="flex items-center justify-between">
                <Link
                  href="/analysis"
                  className="font-medium hover:underline flex items-center gap-2"
                >
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                  <span>상세 분석</span>
                </Link>
                <Badge variant="outline">Analysis</Badge>
              </li>
              <li className="flex items-center justify-between">
                <Link
                  href="/monitoring"
                  className="font-medium hover:underline flex items-center gap-2"
                >
                  <Table className="h-4 w-4 text-muted-foreground" />
                  <span>모니터링</span>
                </Link>
                <Badge variant="secondary">Monitoring</Badge>
              </li>
               <li className="flex items-center justify-between">
                <Link
                  href="/organizational-comparison"
                  className="font-medium hover:underline flex items-center gap-2"
                >
                  <Table className="h-4 w-4 text-muted-foreground" />
                  <span>조직별 비교</span>
                </Link>
                <Badge variant="outline">Comparison</Badge>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Current status of data sources and services.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span className="font-medium">MySQL (Read Replica)</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm text-muted-foreground">
                    Operational
                  </span>
                </div>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-medium">API Endpoints</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm text-muted-foreground">
                    Operational
                  </span>
                </div>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-medium">Scheduler Service</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-orange-500" />
                  <span className="text-sm text-muted-foreground">
                    Degraded
                  </span>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              What's been happening in your team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src={activity.user.avatar} />
                    <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p>
                      <span className="font-medium">{activity.user.name}</span>{" "}
                      {activity.action}{" "}
                      <span className="font-medium text-primary">
                        {activity.target}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <FileClock className="h-5 w-5" />
                <span>Recent Queries</span>
            </CardTitle>
            <CardDescription>
                Jump back into your recent work.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-2 font-mono text-sm">
                <p className="truncate text-muted-foreground hover:text-foreground transition-colors cursor-pointer">SELECT * FROM users WHERE signup_date &gt; &apos;2023-10-01&apos;</p>
                <p className="truncate text-muted-foreground hover:text-foreground transition-colors cursor-pointer">SELECT product_name, COUNT(*) as order_count FROM orders...</p>
                <p className="truncate text-muted-foreground hover:text-foreground transition-colors cursor-pointer">SELECT AVG(order_total) as aov FROM orders WHERE...</p>
            </div>
        </CardContent>
       </Card>
    </div>
  );
}
