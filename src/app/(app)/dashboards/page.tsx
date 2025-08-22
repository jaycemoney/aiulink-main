import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, BarChart, LineChart, Table, Users, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const dashboards = [
  {
    title: "Marketing KPI",
    description: "Tracks key performance indicators for marketing campaigns.",
    icon: BarChart,
    thumbnailUrl: "https://placehold.co/600x400/009999/FFFFFF",
    dataAiHint: "marketing chart",
    shared: true,
  },
  {
    title: "Q3 Financials",
    description: "Detailed financial performance for the third quarter.",
    icon: LineChart,
    thumbnailUrl: "https://placehold.co/600x400/009999/FFFFFF",
    dataAiHint: "finance graph",
    shared: false,
  },
  {
    title: "Weekly User Engagement",
    description: "User activity and engagement metrics, updated weekly.",
    icon: Table,
    thumbnailUrl: "https://placehold.co/600x400/009999/FFFFFF",
    dataAiHint: "user data",
    shared: true,
  },
  {
    title: "Production Line Monitoring",
    description: "Real-time monitoring of production line sensors.",
    icon: LineChart,
    thumbnailUrl: "https://placehold.co/600x400/009999/FFFFFF",
    dataAiHint: "factory machine",
    shared: false,
  },
];

export default function DashboardsPage() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboards</h1>
          <p className="text-muted-foreground">
            Create, manage, and share your data visualizations.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dashboards.map((dashboard, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <div className="relative h-40 w-full mb-4 rounded-md overflow-hidden">
                <Image
                  src={dashboard.thumbnailUrl}
                  alt={dashboard.title}
                  fill
                  style={{objectFit: 'cover'}}
                  data-ai-hint={dashboard.dataAiHint}
                />
              </div>
              <CardTitle className="flex items-center gap-2">
                <dashboard.icon className="h-5 w-5" />
                <span>{dashboard.title}</span>
              </CardTitle>
              <CardDescription>{dashboard.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow" />
            <CardFooter className="flex justify-between items-center">
              <Badge variant={dashboard.shared ? "outline" : "secondary"}>
                {dashboard.shared ? <Users className="mr-1.5 h-3 w-3" /> : <Lock className="mr-1.5 h-3 w-3" />}
                {dashboard.shared ? "Shared" : "Private"}
              </Badge>
              <Link href="#" className="text-sm font-medium text-primary hover:underline">
                View
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
