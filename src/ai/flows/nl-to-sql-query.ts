'use server';

/**
 * @fileOverview A natural language to SQL query AI agent.
 *
 * - nlToSqlQuery - A function that handles the natural language to SQL query process.
 * - NlToSqlQueryInput - The input type for the nlToSqlQuery function.
 * - NlToSqlQueryOutput - The return type for the nlToSqlQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NlToSqlQueryInputSchema = z.object({
  naturalLanguageQuery: z
    .string()
    .describe('The natural language query to translate to SQL.'),
  queryHistory: z.array(z.string()).describe('The query history to search from.'),
});
export type NlToSqlQueryInput = z.infer<typeof NlToSqlQueryInputSchema>;

const NlToSqlQueryOutputSchema = z.object({
  sqlQuery: z.string().describe('The SQL query that best matches the natural language query.'),
});
export type NlToSqlQueryOutput = z.infer<typeof NlToSqlQueryOutputSchema>;

export async function nlToSqlQuery(input: NlToSqlQueryInput): Promise<NlToSqlQueryOutput> {
  return nlToSqlQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'nlToSqlQueryPrompt',
  input: {schema: NlToSqlQueryInputSchema},
  output: {schema: NlToSqlQueryOutputSchema},
  prompt: `You are a SQL expert. Given a natural language query and a list of SQL queries, find the SQL query that best matches the natural language query.\n\nNatural Language Query: {{{naturalLanguageQuery}}}\n\nSQL Query History:\n{{#each queryHistory}}- {{{this}}}\n{{/each}}`,
});

const nlToSqlQueryFlow = ai.defineFlow(
  {
    name: 'nlToSqlQueryFlow',
    inputSchema: NlToSqlQueryInputSchema,
    outputSchema: NlToSqlQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
