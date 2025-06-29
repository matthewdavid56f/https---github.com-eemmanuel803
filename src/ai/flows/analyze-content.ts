// src/ai/flows/analyze-content.ts
'use server';
/**
 * @fileOverview Content analysis AI agent.
 *
 * - analyzeContent - A function that handles the content analysis process.
 * - AnalyzeContentInput - The input type for the analyzeContent function.
 * - AnalyzeContentOutput - The return type for the analyzeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeContentInputSchema = z.object({
  source: z.enum(['screenshot', 'clipboard', 'notification']).describe('The source of the content being analyzed.'),
  content: z.string().describe('The content to analyze.'),
});
export type AnalyzeContentInput = z.infer<typeof AnalyzeContentInputSchema>;

const AnalyzeContentOutputSchema = z.object({
  isHarmful: z.boolean().describe('Whether or not the content is potentially harmful.'),
  reason: z.string().describe('The reason why the content is considered harmful, if applicable.'),
});
export type AnalyzeContentOutput = z.infer<typeof AnalyzeContentOutputSchema>;

export async function analyzeContent(input: AnalyzeContentInput): Promise<AnalyzeContentOutput> {
  return analyzeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeContentPrompt',
  input: {schema: AnalyzeContentInputSchema},
  output: {schema: AnalyzeContentOutputSchema},
  prompt: `You are an AI assistant that analyzes content from a child's device and determines if it is potentially harmful to the child.

  You will receive content from the following sources: screenshot, clipboard, and notification.

  Your job is to analyze the content and determine if it is potentially harmful to the child.

  If the content is potentially harmful, set the isHarmful output field to true and provide a reason in the reason output field.
  If the content is not potentially harmful, set the isHarmful output field to false and the reason output field to an empty string.

  Source: {{{source}}}
  Content: {{{content}}}
  `,
});

const analyzeContentFlow = ai.defineFlow(
  {
    name: 'analyzeContentFlow',
    inputSchema: AnalyzeContentInputSchema,
    outputSchema: AnalyzeContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
