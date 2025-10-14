"use server";

import { groq, openai } from "@/lib/openAI";
import { Question } from "./types";

export async function generateVoiceHint(question: Question): Promise<{
  success: boolean;
  audioBase64?: string;
  error?: string;
}> {
  try {
    const hintCompletion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: `Je bent een vriendelijke quiz-assistent die nuttige hints geeft. 
Geef een heel korte, behulpzame hint (maximaal 1 zin) voor de volgende vraag zonder het antwoord direct te geven. 
Spreek Nederlands en wees aanmoedigend.`,
        },
        {
          role: "user",
          content: `Vraag: ${
            question.question
          }\n\nAntwoorden: ${question.answers.map((a) => a.answer).join(", ")}`,
        },
      ],
    });

    const hintText = hintCompletion.choices[0]?.message?.content;

    if (!hintText) {
      throw new Error("No hint generated");
    }

    const speechResponse = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "nova",
      input: hintText,
      response_format: "mp3",
      speed: 1.0,
    });

    const buffer = Buffer.from(await speechResponse.arrayBuffer());
    const audioBase64 = buffer.toString("base64");

    return {
      success: true,
      audioBase64,
    };
  } catch (error) {
    console.error("Error generating voice hint:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
