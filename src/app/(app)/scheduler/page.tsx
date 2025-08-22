import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, PlusCircle, Play, Pause, Trash2 } from "lucide-react";
import { scheduledTasks } from "@/lib/data";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SchedulerPage() {
    const getStatusBadge = (status: 'active' | 'paused' | 'error') => {
        switch (status) {
            case 'active':
                return <Badge><div className="h-2 w-2 rounded-full bg-green-400 mr-2" />Active</Badge>;
            case 'paused':
                return <Badge variant="secondary"><div className="h-2 w-2 rounded-full bg-gray-400 mr-2" />Paused</Badge>;
            case 'error':
                return <Badge variant="destructive"><div className="h-2 w-2 rounded-full bg-red-400 mr-2" />Error</Badge>;
        }
    };

    return (
        <div className="grid gap-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Scheduler</h1>
                    <p className="text-muted-foreground">
                        Automate your data workflows and set up alerts.
                    </p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> New Scheduled Task
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Scheduled Tasks</CardTitle>
                    <CardDescription>
                        A list of all your automated jobs.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Schedule (Cron)</TableHead>
                                <TableHead>Query</TableHead>
                                <TableHead>Last Run</TableHead>
                                <TableHead>Next Run</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {scheduledTasks.map((task) => (
                                <TableRow key={task.id}>
                                    <TableCell className="font-medium">{task.name}</TableCell>
                                    <TableCell className="font-mono">{task.cron_expression}</TableCell>
                                    <TableCell className="font-mono text-primary">{task.query_name}</TableCell>
                                    <TableCell>{task.last_run}</TableCell>
                                    <TableCell>{task.next_run}</TableCell>
                                    <TableCell>{getStatusBadge(task.status)}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    {task.status === 'active' ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                                                    {task.status === 'active' ? 'Pause' : 'Resume'}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
