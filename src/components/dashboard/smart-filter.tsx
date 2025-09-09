'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Lightbulb, Loader2, ServerCrash } from 'lucide-react';
import { getSmartFilterInsights, SmartFilterInsightsOutput } from '@/ai/flows/smart-filter-insights';

export function SmartFilter() {
  const [region, setRegion] = useState('All');
  const [performanceRange, setPerformanceRange] = useState('All');
  const [timePeriod, setTimePeriod] = useState('last-quarter');
  const [organization, setOrganization] = useState('All');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SmartFilterInsightsOutput | null>(null);

  const handleAnalysis = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const insights = await getSmartFilterInsights({
        region,
        performanceRange,
        timePeriod,
        organization: organization === 'All' ? undefined : organization,
      });
      setResult(insights);
    } catch (e) {
      setError('Failed to get insights. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="smart-filter">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <span className="font-semibold">Smart Filter & AI Insights</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Card>
            <CardHeader>
              <CardTitle>Filter Data</CardTitle>
              <CardDescription>
                Select criteria to filter the data and generate AI-powered insights.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger id="region">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Regions</SelectItem>
                      <SelectItem value="Seoul">Seoul</SelectItem>
                      <SelectItem value="Busan">Busan</SelectItem>
                      <SelectItem value="Incheon">Incheon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="performance">Performance Range</Label>
                   <Select value={performanceRange} onValueChange={setPerformanceRange}>
                    <SelectTrigger id="performance">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time Period</Label>
                  <Select value={timePeriod} onValueChange={setTimePeriod}>
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="last-quarter">Last Quarter</SelectItem>
                      <SelectItem value="last-year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org">Organization</Label>
                  <Select value={organization} onValueChange={setOrganization}>
                    <SelectTrigger id="org">
                      <SelectValue placeholder="Select organization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Organizations</SelectItem>
                      <SelectItem value="A">Organization A</SelectItem>
                      <SelectItem value="B">Organization B</SelectItem>
                      <SelectItem value="C">Organization C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button onClick={handleAnalysis} disabled={isLoading} className="w-full">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Generate Insights'}
                  </Button>
                </div>
              </div>
              {isLoading && (
                <div className="mt-6 flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                  <p className="mt-4 text-sm font-medium text-muted-foreground">Generating insights...</p>
                  <p className="text-xs text-muted-foreground">The AI is analyzing the data. This might take a moment.</p>
                </div>
              )}
              {error && (
                 <div className="mt-6 flex flex-col items-center justify-center rounded-lg border border-dashed border-destructive/50 p-8 text-center">
                  <ServerCrash className="h-10 w-10 text-destructive" />
                  <p className="mt-4 text-sm font-medium text-destructive">{error}</p>
                </div>
              )}
              {result && (
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{result.insights}</p>
                    </CardContent>
                  </Card>
                   <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Suggested Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{result.suggestedActions}</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
