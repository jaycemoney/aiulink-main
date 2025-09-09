import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">설정</h1>
        <p className="text-muted-foreground">
          사용자 정보 및 시스템 설정을 관리합니다.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>개인 설정</CardTitle>
          <CardDescription>개인 정보를 업데이트합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="Brian" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Miller" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="brian@datalens.io" disabled />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>시스템 설정</CardTitle>
          <CardDescription>
            애플리케이션의 전역 설정을 관리합니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label className="text-base">공개 대시보드 공유</Label>
                    <p className="text-sm text-muted-foreground">
                        사용자가 대시보드에 대한 공용 링크를 생성할 수 있도록 허용합니다.
                    </p>
                </div>
                <Switch id="public-sharing" />
            </div>
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label className="text-base">SSO 요구</Label>
                    <p className="text-sm text-muted-foreground">
                        모든 계정 로그인에 대해 단일 서명 인증을 강제합니다.
                    </p>
                </div>
                <Switch id="sso" defaultChecked />
            </div>
             <div className="space-y-2">
                <Label htmlFor="query-timeout">쿼리 타임아웃 (초)</Label>
                <Input id="query-timeout" type="number" defaultValue="30" className="w-[200px]" />
                <p className="text-sm text-muted-foreground">
                    SQL 쿼리의 최대 실행 시간을 설정하여 데이터베이스 오버로드를 방지합니다.
                </p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
