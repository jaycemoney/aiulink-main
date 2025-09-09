'use server';

/**
 * @fileOverview A Genkit flow for providing intelligent insights and suggesting possible actions based on filtered data.
 *
 * - getSmartFilterInsights - A function that takes filter parameters and returns insights and suggested actions.
 * - SmartFilterInsightsInput - The input type for the getSmartFilterInsights function.
 * - SmartFilterInsightsOutput - The return type for the getSmartFilterInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartFilterInsightsInputSchema = z.object({
  region: z.string().describe('The region to analyze.'),
  performanceRange: z.string().describe('The performance range to focus on (e.g., low, medium, high).'),
  timePeriod: z.string().describe('The time period for the analysis (e.g., last month, last quarter).'),
  organization: z.string().describe('The organization to analyze (e.g., A, B, C).').optional(),
});
export type SmartFilterInsightsInput = z.infer<typeof SmartFilterInsightsInputSchema>;

const SmartFilterInsightsOutputSchema = z.object({
  insights: z.string().describe('Intelligent insights based on the filtered data.'),
  suggestedActions: z.string().describe('Possible actions to improve performance in the specified region.'),
});
export type SmartFilterInsightsOutput = z.infer<typeof SmartFilterInsightsOutputSchema>;

export async function getSmartFilterInsights(input: SmartFilterInsightsInput): Promise<SmartFilterInsightsOutput> {
  return smartFilterInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartFilterInsightsPrompt',
  input: {schema: SmartFilterInsightsInputSchema},
  output: {schema: SmartFilterInsightsOutputSchema},
  prompt: `You are a regional performance analyst for a petrochemical refining company.

  Based on the following filter parameters, provide intelligent insights and suggest possible actions to improve performance.

  Region: {{{region}}}
  Performance Range: {{{performanceRange}}}
  Time Period: {{{timePeriod}}}
  Organization: {{#if organization}}{{{organization}}}{{else}}All Organizations{{/if}}

  Insights:
  Suggested Actions:`, // Provide guidance on constructing the output
});

const smartFilterInsightsFlow = ai.defineFlow(
  {
    name: 'smartFilterInsightsFlow',
    inputSchema: SmartFilterInsightsInputSchema,
    outputSchema: SmartFilterInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
