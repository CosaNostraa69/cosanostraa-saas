// app/api/notes/generate.ts
import { NextRequest, NextResponse } from "next/server";
import openai from "../../lib/openai";
import prisma from "../../lib/db";

export async function POST(request: NextRequest) {
  const { prompt, userId } = await request.json();

  const response = await openai.createCompletion({
    model: "text-davinci-002",  // Utilisez un modèle pris en charge
    prompt: `Generate a title and description for a note based on the following prompt: ${prompt}`,
    max_tokens: 150,
    n: 1,
    stop: null,
    temperature: 0.8,
  });

  const generatedText = response.data.choices[0].text?.trim() || "";
  const [title, description] = generatedText.split("\n");

  return NextResponse.json({ title, description });
}