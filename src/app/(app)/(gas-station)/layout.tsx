"use client";

import { usePathname, useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
  { name: "통합 현황", path: "/overview" },
  { name: "판매 달성도", path: "/sales-performance" },
  { name: "조직별 비교", path: "/organizational-comparison" },
];

export default function GasStationLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleTabChange = (value: string) => {
    router.push(value);
  };

  return (
    <div className="space-y-6">
      <Tabs value={pathname} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-3">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.path} value={tab.path}>
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div>{children}</div>
    </div>
  );
}
