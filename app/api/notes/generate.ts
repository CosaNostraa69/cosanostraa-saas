// app/api/notes/generate.ts
import { NextRequest, NextResponse } from "next/server";
import openai from "../../lib/openai";

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Générer une note basée sur le texte suivant : ${prompt}`,
    max_tokens: 150,
    n: 1,
    stop: null,
    temperature: 0.8,
  });

  const note = response.data.choices[0].text?.trim() || "";

  return NextResponse.json({ note });
}