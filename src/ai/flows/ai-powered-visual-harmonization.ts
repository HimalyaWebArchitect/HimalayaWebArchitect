'use server';
/**
 * @fileOverview Provides AI-powered recommendations for improving website aesthetic harmonization.
 *
 * - getAestheticRecommendations - Analyzes a website screenshot and provides recommendations.
 * - AestheticRecommendationsInput - The input type for the getAestheticRecommendations function.
 * - AestheticRecommendationsOutput - The return type for the getAestheticRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AestheticRecommendationsInputSchema = z.object({
  screenshotDataUri: z
    .string()
    .describe(
      "A screenshot of the website, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AestheticRecommendationsInput = z.infer<typeof AestheticRecommendationsInputSchema>;

const AestheticRecommendationsOutputSchema = z.object({
  recommendations: z.string().describe('AI-powered recommendations for improving aesthetic harmonization.'),
});
export type AestheticRecommendationsOutput = z.infer<typeof AestheticRecommendationsOutputSchema>;

export async function getAestheticRecommendations(input: AestheticRecommendationsInput): Promise<AestheticRecommendationsOutput> {
  return aestheticRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aestheticRecommendationsPrompt',
  input: {schema: AestheticRecommendationsInputSchema},
  output: {schema: AestheticRecommendationsOutputSchema},
  prompt: `You are an expert web designer with a keen eye for aesthetic harmonization.

  Analyze the provided website screenshot and provide actionable recommendations for improving its visual appeal. Focus on aspects like color palette, contrast, font size, whitespace, and overall balance.

  Be specific and suggest concrete adjustments that can enhance the site's aesthetic harmonization.

  Screenshot: {{media url=screenshotDataUri}}
  `,
});

const aestheticRecommendationsFlow = ai.defineFlow(
  {
    name: 'aestheticRecommendationsFlow',
    inputSchema: AestheticRecommendationsInputSchema,
    outputSchema: AestheticRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
