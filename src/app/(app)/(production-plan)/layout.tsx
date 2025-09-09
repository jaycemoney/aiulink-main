"use client";

import { usePathname, useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
  { name: "상세 분석", path: "/analysis" },
  { name: "모니터링", path: "/monitoring" },
];

export default function ProductionPlanLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleTabChange = (value: string) => {
    router.push(value);
  };

  return (
    <div className="space-y-6">
      <Tabs value={pathname} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2">
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
