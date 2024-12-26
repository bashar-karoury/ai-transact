import { AssemblyAI } from "assemblyai";
import { HfInference } from "@huggingface/inference";

async function extractTransactionDetails(text: string) {
  // extract transaction detailes from the text
  const hf = new HfInference("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");

  const prompt = `
Extract the description, amount, date, and category from the following transaction:
"${text}"

Output in JSON format:
{
  "description": "",
  "amount": "",
  "date": "",
  "category": ""
}`;

  const response = await hf.textGeneration({
    model: "gpt2", // Or use any text-generation model, even GPT-3 via OpenAI
    inputs: prompt,
    // parameters: { max_new_tokens: 100, temperature: 2 },
  });

  console.log("Generated Output:", response.generated_text);

  // console.log(response); // This will include recognized entities like dates, amounts, merchants, etc.
}

export function transcactize_audio(audio: any): any {
  const client = new AssemblyAI({
    apiKey: "05b94775bd674db48dfed9002812903e",
  });
  // const audioUrl = "https://assembly.ai/sports_injuries.mp3";
  const run = async () => {
    const transcript = await client.transcripts.transcribe({ audio: audio });
    console.log(transcript.text);
    if (transcript.text) {
      await extractTransactionDetails(
        "Bought groceries for $25.50 on December 23, 2024"
      );
    } else {
      console.error("Transcript text is null or undefined");
    }
  };

  run();
}
