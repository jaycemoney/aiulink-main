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
import Image from "next/image";
import Link from "next/link";

// 각 대시보드의 미니 프리뷰 컴포넌트들
const GasStationPreview = () => (
  <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 p-3 flex flex-col gap-2">
    <div className="bg-white rounded p-2 shadow-sm">
      <div className="text-xs text-gray-600 mb-1">판매량 목표 실정</div>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <div className="text-gray-500">목표</div>
          <div className="font-bold text-blue-600">1,000</div>
        </div>
        <div>
          <div className="text-gray-500">현재실적</div>
          <div className="font-bold text-green-600">820</div>
        </div>
        <div>
          <div className="text-gray-500">잔여실적</div>
          <div className="font-bold text-orange-600">180</div>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
        <div className="bg-blue-500 h-1 rounded-full" style={{width: '82%'}}></div>
      </div>
    </div>
    <div className="bg-white rounded p-2 shadow-sm">
      <div className="h-6 bg-gradient-to-r from-blue-200 to-blue-300 rounded flex items-center justify-center">
        <div className="text-xs font-medium">실시간 판매 현황</div>
      </div>
    </div>
  </div>
);

const ProductionPreview = () => (
  <div className="w-full h-full bg-gradient-to-br from-green-50 to-green-100 p-3 flex flex-col gap-2">
    <div className="grid grid-cols-2 gap-2">
      <div className="bg-white rounded p-2 shadow-sm">
        <div className="text-xs text-gray-600">계획 대비 판매량</div>
        <div className="font-bold text-sm text-green-600">+2.3%</div>
      </div>
      <div className="bg-white rounded p-2 shadow-sm">
        <div className="text-xs text-gray-600">계획 대비 가격</div>
        <div className="font-bold text-sm text-red-600">-0.8%</div>
      </div>
    </div>
    <div className="bg-white rounded p-2 shadow-sm">
      <div className="text-xs text-gray-600">계획 정확도</div>
      <div className="font-bold text-sm text-blue-600">95.7%</div>
      <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
        <div className="bg-blue-500 h-1 rounded-full" style={{width: '95.7%'}}></div>
      </div>
    </div>
  </div>
);

// 프리뷰 컴포넌트 매핑
const previewComponents = {
  gasStation: GasStationPreview,
  production: ProductionPreview,
};

const dashboards = [
  {
    title: "주유소 대시보드",
    description: "주유소 판매 및 운영 관련 대시보드를 확인합니다.",
    href: "/overview",
    icon: "/icons/gasoline-pump.png",
    previewComponent: "gasStation",
    dataAiHint: "gas station dashboard",
    shared: true,
  },
  {
    title: "PE/PP 생산계획 대시보드",
    description: "PE/PP 생산 계획 및 실적 관련 대시보드를 확인합니다.",
    href: "/analysis",
    icon: "/icons/gas-tank.png",
    previewComponent: "production",
    dataAiHint: "factory production dashboard",
    shared: true,
  },
];

export default function DashboardsPage() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">대시보드</h1>
          <p className="text-muted-foreground">
            불러온 데이터로 자유롭게 시각화 해보세요.
          </p>
        </div>
        <Button>
          <Image 
            src="/icons/plus.png" 
            alt="plus" 
            width={16} 
            height={16} 
            className="mr-2" 
          />
          대시보드 만들기
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dashboards.map((dashboard, index) => {
          const PreviewComponent = previewComponents[dashboard.previewComponent];
          
          return (
            <Card key={dashboard.href} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="relative h-40 w-full mb-4 rounded-md overflow-hidden border">
                  {/* 실제 대시보드 미리보기 렌더링 */}
                  {PreviewComponent && <PreviewComponent />}
                  
                  {/* 호버시 "View Dashboard" 오버레이 */}
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="bg-white rounded-full px-4 py-2 shadow-lg">
                      <span className="text-sm font-medium">View Dashboard</span>
                    </div>
                  </div>
                </div>
                
                <CardTitle className="text-lg font-semibold">
                  {dashboard.title}
                </CardTitle>
                <CardDescription>{dashboard.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow" />
              <CardFooter className="flex justify-between items-center">
                <Link 
                  href={dashboard.href} 
                  className="text-sm font-medium text-primary hover:underline flex items-center gap-2"
                >
                  대시보드 보기
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}