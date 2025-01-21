"use server";
import {
  GoogleGenerativeAI,
  GenerateContentResult,
} from "@google/generative-ai";
import categories from "@/utils/categories";
export default async function deduceCategoryFromDescription(text: string) {
  const apiKey: string = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable not set.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
  console.log(categories.join(", "));
  const prompt = `Deduce the most relative category for a transaction description from the categories list is [${categories.join(
    ", "
  )}].
output with the relative category or null if not found.
Here is the transaction description: ${text}`;

  try {
    const result: GenerateContentResult = await model.generateContent(prompt);
    let responseText = result.response?.text();
    responseText = responseText.trim();
    if (categories.includes(responseText)) {
      return responseText;
    } else {
      return null;
    }
  } catch (error) {
    throw error; // re-throw the error
  }
}
