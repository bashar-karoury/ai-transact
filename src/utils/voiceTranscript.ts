import { AssemblyAI } from "assemblyai";
export function transcactize_audio(audio: any): any {
  const client = new AssemblyAI({
    apiKey: "05b94775bd674db48dfed9002812903e",
  });
  const audioUrl = "https://assembly.ai/sports_injuries.mp3";
  const run = async () => {
    const transcript = await client.transcripts.transcribe({ audio: audioUrl });
    console.log(transcript.text);
    const prompt =
      "Assuming this is a transaction text, extract transaction description, amount, date and category out of it";
    const { response } = await client.lemur.task({
      transcript_ids: [transcript.id],
      prompt,
      final_model: "anthropic/claude-3-5-sonnet",
    });
    console.log(response);
  };

  run();
}
