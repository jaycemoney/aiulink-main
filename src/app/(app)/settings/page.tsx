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
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and system settings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Settings</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
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
          <CardTitle>System Settings</CardTitle>
          <CardDescription>
            Manage global settings for the application. (Admin only)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label className="text-base">Enable Public Dashboard Sharing</Label>
                    <p className="text-sm text-muted-foreground">
                        Allow users to create publicly accessible links to dashboards.
                    </p>
                </div>
                <Switch id="public-sharing" />
            </div>
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label className="text-base">Require SSO for all users</Label>
                    <p className="text-sm text-muted-foreground">
                        Enforce Single Sign-On for all accounts logging in.
                    </p>
                </div>
                <Switch id="sso" defaultChecked />
            </div>
             <div className="space-y-2">
                <Label htmlFor="query-timeout">Query Timeout (seconds)</Label>
                <Input id="query-timeout" type="number" defaultValue="30" className="w-[200px]" />
                <p className="text-sm text-muted-foreground">
                    Set the maximum execution time for SQL queries to prevent database overload.
                </p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
