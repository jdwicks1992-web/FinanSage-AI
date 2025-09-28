
import { GoogleGenAI } from "@google/genai";
import type { FinancialData } from '../hooks/useMockData';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.error("Gemini API key is not set. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `You are FinanSage, an expert financial advisor AI. Your goal is to provide clear, actionable, and personalized financial advice. You are friendly, encouraging, and highly knowledgeable. When given user's financial data, analyze it carefully to offer tailored insights. Do not provide generic advice. Always prioritize the user's financial well-being. Format your responses using markdown for readability, including bullet points, bold text, and lists where appropriate. Never give financial advice that could be construed as a guarantee of returns.`;

export const getFinancialAdvice = async (prompt: string, context?: FinancialData): Promise<string> => {
    if (!API_KEY) {
        return "Error: Gemini API key not configured. Please contact support.";
    }

    try {
        let fullPrompt = `User Query: "${prompt}"\n\n`;

        if (context) {
            fullPrompt += "Here is the user's current financial data for context. Please use this to personalize your advice:\n";
            fullPrompt += `- Monthly Income: $${context.summary.monthlyIncome.toFixed(2)}\n`;
            fullPrompt += `- Monthly Expenses: $${context.summary.monthlyExpenses.toFixed(2)}\n`;
            fullPrompt += `- Total Investments Value: $${context.summary.totalInvestments.toFixed(2)}\n`;
            fullPrompt += `- Total Savings: $${context.summary.totalSavings.toFixed(2)}\n`;
            fullPrompt += `\nRecent Transactions:\n${JSON.stringify(context.transactions.slice(0, 5), null, 2)}\n`;
            fullPrompt += `\nInvestment Holdings:\n${JSON.stringify(context.investments, null, 2)}\n`;
            fullPrompt += `\nSavings Goals:\n${JSON.stringify(context.savingsGoals, null, 2)}\n`;
        }
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: fullPrompt,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
            },
        });
        
        return response.text;
    } catch (error) {
        console.error("Error fetching from Gemini API:", error);
        return "Sorry, I encountered an error while generating advice. Please try again later.";
    }
};
