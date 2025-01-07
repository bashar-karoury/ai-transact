"use server";
import { AssemblyAI, FileUploadParams } from "assemblyai";
import {
  GoogleGenerativeAI,
  GenerateContentResult,
} from "@google/generative-ai";

import categories from "@/utils/categories";

interface TransactionData {
  type: string | null;
  description: string | null;
  amount: number | null;
  date: string | null;
  category: string | null;
}

async function extractTransactionGemini(text: string) {
  const apiKey: string = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable not set.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `You are an expert financial transaction analyzer. You will be given a text describing a financial transaction and must extract the type of transaction; income or expense, description, the amount and the date (if provided), following these instructions:
  1. The extracted date must be in the format YYYY-MM-DD.
  2. The extracted amount must be a floating point number, if missing return null
  3. The description is the rest of the text not used for amount and date, if missing return null
  5- Deduce the most relative category for a transaction description from the categories list is [${categories.join(
    ", "
  )}].
output with the relative category or null if not found.
  4. Return the result in a JSON format with keys: type, description, amount, date, using this JSON schema:
  {
  "type": "",
  "description": "",
  "amount": "",
  "date": "",
  "category": ""
  }
  Here is the transaction:${text}`;

  try {
    const result: GenerateContentResult = await model.generateContent(prompt);
    const responseText = result.response?.text();
    const tokens = responseText.split("\n");
    const jsonizedTransaction = tokens.slice(1, -2).join("\n");

    const data = JSON.parse(jsonizedTransaction);
    // console.log("parsed data", data);
    return data;
  } catch (error) {
    throw error; // re-throw the error
  }
}

export async function transcactize_audio(
  audio: FileUploadParams
): Promise<TransactionData> {
  const assemblyApiKey: string = process.env.NEXT_PUBLIC_ASSEMPLY_API_KEY || "";

  if (!assemblyApiKey) {
    throw new Error("No key found");
  }
  const client = new AssemblyAI({
    apiKey: assemblyApiKey,
  });
  // console.log("Processing");
  try {
    const transcript = await client.transcripts.transcribe({ audio: audio });
    if (transcript.text) {
      const transact: TransactionData = await extractTransactionGemini(
        transcript.text
      );
      return transact;
    } else {
      // throw new Error("Transcript text is null or undefined");
    }
  } catch (error) {
    throw error;
  }
}
