import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play, Download, BarChart2 } from "lucide-react";
import { NlToSqlTool } from "@/components/data-explorer/nl-to-sql-tool";
import { queryHistory, tableSchemas } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

export default function DataExplorerPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Data Explorer</h1>
        <p className="text-muted-foreground">
          Build queries, explore datasets, and analyze your data.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        <div className="flex flex-col gap-6">
          <NlToSqlTool queryHistory={queryHistory} />
          
          <Card>
            <CardHeader>
              <CardTitle>SQL Editor</CardTitle>
              <CardDescription>
                Write and execute your SQL queries directly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="SELECT * FROM customers;"
                className="min-h-[200px] font-mono"
              />
              <div className="mt-4 flex gap-2">
                <Button>
                  <Play className="mr-2 h-4 w-4" /> Run Query
                </Button>
                <Button variant="secondary">
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
                 <Button variant="outline">
                  <BarChart2 className="mr-2 h-4 w-4" /> Visualize
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="row-start-2 lg:row-start-auto">
          <Card>
            <CardHeader>
              <CardTitle>Query Builder</CardTitle>
              <CardDescription>
                Select tables and columns to build a query.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <Accordion type="multiple" className="w-full">
                  {Object.entries(tableSchemas).map(([tableName, columns]) => (
                    <AccordionItem key={tableName} value={tableName}>
                      <AccordionTrigger className="text-sm font-medium">
                        {tableName}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pl-2">
                          {columns.map((column) => (
                            <div key={column} className="flex items-center gap-2">
                              <Checkbox id={`${tableName}-${column}`} />
                              <Label
                                htmlFor={`${tableName}-${column}`}
                                className="text-sm font-normal"
                              >
                                {column}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

       <Separator />

      <div>
        <h2 className="text-2xl font-bold tracking-tight">Query Result</h2>
        <p className="text-muted-foreground mb-4">
            Preview of the data returned by your query.
        </p>
        <Card>
            <CardContent className="p-0">
                <ScrollArea className="h-[400px] w-full">
                    <Table>
                        <TableHeader className="sticky top-0 bg-card">
                            <TableRow>
                                <TableHead>customer_id</TableHead>
                                <TableHead>first_name</TableHead>
                                <TableHead>last_name</TableHead>
                                <TableHead>email</TableHead>
                                <TableHead>signup_date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                           <TableRow>
                                <TableCell>101</TableCell>
                                <TableCell>John</TableCell>
                                <TableCell>Doe</TableCell>
                                <TableCell>john.doe@example.com</TableCell>
                                <TableCell>2023-01-15</TableCell>
                           </TableRow>
                           <TableRow>
                                <TableCell>102</TableCell>
                                <TableCell>Jane</TableCell>
                                <TableCell>Smith</TableCell>
                                <TableCell>jane.smith@example.com</TableCell>
                                <TableCell>2023-02-20</TableCell>
                           </TableRow>
                             <TableRow>
                                <TableCell>103</TableCell>
                                <TableCell>Peter</TableCell>
                                <TableCell>Jones</TableCell>
                                <TableCell>peter.jones@example.com</TableCell>
                                <TableCell>2023-03-10</TableCell>
                           </TableRow>
                           <TableRow>
                                <TableCell>104</TableCell>
                                <TableCell>Mary</TableCell>
                                <TableCell>Johnson</TableCell>
                                <TableCell>mary.j@example.com</TableCell>
                                <TableCell>2023-04-05</TableCell>
                           </TableRow>
                        </TableBody>
                    </Table>
                </ScrollArea>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
