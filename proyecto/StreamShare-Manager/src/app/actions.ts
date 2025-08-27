"use server";

import { getDynamicPricingSuggestion } from "@/ai/flows/dynamic-pricing-suggestions";
import type { DynamicPricingSuggestionInput } from "@/ai/flows/dynamic-pricing-suggestions";

export async function getDynamicPricingSuggestionAction(input: DynamicPricingSuggestionInput) {
    try {
        const result = await getDynamicPricingSuggestion(input);
        return result;
    } catch (error) {
        console.error("Error getting dynamic pricing suggestion:", error);
        throw new Error("Failed to get pricing suggestion from AI.");
    }
}
