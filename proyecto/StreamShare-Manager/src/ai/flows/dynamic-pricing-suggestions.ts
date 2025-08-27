'use server';

/**
 * @fileOverview A dynamic pricing suggestion AI agent.
 *
 * - getDynamicPricingSuggestion - A function that suggests optimal pricing for streaming subscriptions.
 * - DynamicPricingSuggestionInput - The input type for the getDynamicPricingSuggestion function.
 * - DynamicPricingSuggestionOutput - The return type for the getDynamicPricingSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DynamicPricingSuggestionInputSchema = z.object({
  streamingService: z.string().describe('The name of the streaming service (e.g., Netflix, Disney+, Spotify).'),
  currentPrice: z.number().describe('The current price of the subscription.'),
  marketDemand: z.string().describe('A description of the current market demand for the streaming service.'),
  competitorAnalysis: z.string().describe('An analysis of competitor pricing for similar streaming services.'),
});
export type DynamicPricingSuggestionInput = z.infer<typeof DynamicPricingSuggestionInputSchema>;

const DynamicPricingSuggestionOutputSchema = z.object({
  suggestedPrice: z.number().describe('The suggested optimal price for the streaming subscription.'),
  reasoning: z.string().describe('The reasoning behind the suggested price.'),
});
export type DynamicPricingSuggestionOutput = z.infer<typeof DynamicPricingSuggestionOutputSchema>;

export async function getDynamicPricingSuggestion(input: DynamicPricingSuggestionInput): Promise<DynamicPricingSuggestionOutput> {
  return dynamicPricingSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dynamicPricingSuggestionPrompt',
  input: {schema: DynamicPricingSuggestionInputSchema},
  output: {schema: DynamicPricingSuggestionOutputSchema},
  prompt: `You are an expert pricing strategist specializing in streaming subscriptions.

You will use the provided information about market demand and competitor analysis to suggest an optimal price for the given streaming service.

Streaming Service: {{{streamingService}}}
Current Price: {{{currentPrice}}}
Market Demand: {{{marketDemand}}}
Competitor Analysis: {{{competitorAnalysis}}}

Based on this information, what is the optimal price for the subscription and why?
`,
});

const dynamicPricingSuggestionFlow = ai.defineFlow(
  {
    name: 'dynamicPricingSuggestionFlow',
    inputSchema: DynamicPricingSuggestionInputSchema,
    outputSchema: DynamicPricingSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
