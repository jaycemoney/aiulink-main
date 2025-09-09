'use server';

/**
 * @fileOverview A flow for generating suggested actions based on sales performance analysis.
 *
 * - generateSalesActions - A function that generates suggested actions based on sales performance analysis.
 * - GenerateSalesActionsInput - The input type for the generateSalesActions function.
 * - GenerateSalesActionsOutput - The return type for the generateSalesActions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSalesActionsInputSchema = z.object({
  salesData: z
    .string()
    .describe("Sales data, including current sales data, historical data, targets, and external factors like oil prices."),
});
export type GenerateSalesActionsInput = z.infer<typeof GenerateSalesActionsInputSchema>;

const GenerateSalesActionsOutputSchema = z.object({
  suggestedActions: z.array(z.string()).describe("A list of suggested actions based on the sales performance analysis."),
});
export type GenerateSalesActionsOutput = z.infer<typeof GenerateSalesActionsOutputSchema>;

export async function generateSalesActions(input: GenerateSalesActionsInput): Promise<GenerateSalesActionsOutput> {
  return generateSalesActionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSalesActionsPrompt',
  input: {schema: GenerateSalesActionsInputSchema},
  output: {schema: GenerateSalesActionsOutputSchema},
  prompt: `You are a Sales Performance Analyst. Based on the sales data provided, generate a list of suggested actions to improve sales performance.

Sales Data: {{{salesData}}}

Suggested Actions:`,
});

const generateSalesActionsFlow = ai.defineFlow(
  {
    name: 'generateSalesActionsFlow',
    inputSchema: GenerateSalesActionsInputSchema,
    outputSchema: GenerateSalesActionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
