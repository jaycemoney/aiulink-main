"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { apiKeys, apiEndpoints } from "@/lib/data";
import { MoreHorizontal, PlusCircle, Copy, Trash2, Edit } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import type { ChartConfig } from "@/components/ui/chart";

const chartData = [
    { date: "2023-11-01", calls: 4000, errors: 20 },
    { date: "2023-11-02", calls: 3000, errors: 15 },
    { date: "2023-11-03", calls: 2000, errors: 5 },
    { date: "2023-11-04", calls: 2780, errors: 39 },
    { date: "2023-11-05", calls: 1890, errors: 48 },
    { date: "2023-11-06", calls: 2390, errors: 38 },
    { date: "2023-11-07", calls: 3490, errors: 43 },
];

const chartConfig = {
    calls: {
        label: "API Calls",
        color: "hsl(var(--chart-1))",
    },
    errors: {
        label: "Errors",
        color: "hsl(var(--destructive))",
    },
} satisfies ChartConfig;

export default function ApiManagementPage() {
  const getBadgeVariant = (status: 'active' | 'expired' | 'revoked') => {
    switch (status) {
      case 'active':
        return 'default';
      case 'expired':
        return 'secondary';
      case 'revoked':
        return 'destructive';
    }
  };

  const getMethodBadgeClass = (method: string) => {
    switch(method) {
        case 'GET': return 'bg-sky-500 text-white';
        case 'POST': return 'bg-green-500 text-white';
        case 'PUT': return 'bg-amber-500 text-white';
        case 'DELETE': return 'bg-red-500 text-white';
        default: return 'bg-gray-500 text-white';
    }
  }

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">API Management</h1>
        <p className="text-muted-foreground">
          Manage keys, explore endpoints, and monitor your API usage.
        </p>
      </div>
      <Tabs defaultValue="keys" className="w-full">
        <TabsList>
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="usage">Usage Monitoring</TabsTrigger>
        </TabsList>
        <TabsContent value="keys">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>
                  Create and manage API keys for your applications.
                </CardDescription>
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Generate New Key
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Key Preview</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((key) => (
                    <TableRow key={key.id}>
                      <TableCell className="font-medium">{key.name}</TableCell>
                      <TableCell className="font-mono">{key.key_preview}</TableCell>
                      <TableCell>{key.created_at}</TableCell>
                      <TableCell>{key.expires_at}</TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(key.status)} className="capitalize">{key.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem><Copy className="mr-2 h-4 w-4" /> Copy Key</DropdownMenuItem>
                                <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" /> Revoke</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="endpoints">
          <Card>
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
              <CardDescription>
                Browse and test available RESTful API endpoints.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {apiEndpoints.map(endpoint => (
                        <AccordionItem key={endpoint.id} value={endpoint.id}>
                            <AccordionTrigger>
                                <div className="flex items-center gap-4">
                                    <Badge className={getMethodBadgeClass(endpoint.method)}>{endpoint.method}</Badge>
                                    <span className="font-mono text-sm">{endpoint.path}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-4 pl-2">
                                <p className="text-muted-foreground">{endpoint.description}</p>
                                <div>
                                    <h4 className="font-semibold mb-2">Parameters</h4>
                                    <ul className="space-y-1 text-sm">
                                        {endpoint.parameters.map(param => (
                                            <li key={param.name}>
                                                <code className="font-semibold bg-muted p-1 rounded-sm">{param.name}</code>
                                                <span className="text-muted-foreground ml-2">({param.type})</span>: {param.description}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Example cURL</h4>
                                    <pre className="text-sm p-3 bg-muted rounded-md overflow-x-auto">
                                        <code>{`curl -X ${endpoint.method} https://api.datalens.io${endpoint.path}`}</code>
                                    </pre>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle>API Usage Monitoring</CardTitle>
              <CardDescription>
                Usage statistics for the last 7 days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart data={chartData} accessibilityLayer>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="date" tickLine={false} tickMargin={10} axisLine={false} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="calls" fill="var(--color-calls)" radius={4} />
                  <Bar dataKey="errors" fill="var(--color-errors)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
