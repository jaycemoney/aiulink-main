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
import { PlusCircle, Fuel, Factory } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const dashboards = [
  {
    title: "주유소 대시보드",
    description: "주유소 판매 및 운영 관련 대시보드를 확인합니다.",
    href: "/overview",
    icon: Fuel,
    thumbnailUrl: "https://placehold.co/600x400/009999/FFFFFF",
    dataAiHint: "gas station dashboard",
    shared: true,
  },
  {
    title: "PE/PP 생산계획 대시보드",
    description: "PE/PP 생산 계획 및 실적 관련 대시보드를 확인합니다.",
    href: "/analysis",
    icon: Factory,
    thumbnailUrl: "https://placehold.co/600x400/009999/FFFFFF",
    dataAiHint: "factory production dashboard",
    shared: true,
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
                            <Link href={dashboard.href} className="text-sm font-medium text-primary hover:underline">
                View
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
