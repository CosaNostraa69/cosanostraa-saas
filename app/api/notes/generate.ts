// app/api/notes/generate.ts
import { NextRequest, NextResponse } from "next/server";
import openai from "../../lib/openai";
import prisma from "../../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(request: NextRequest) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  if (!user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const prompt = "Générer un titre et une description pour une nouvelle note";

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 150,
    n: 1,
    stop: null,
    temperature: 0.8,
  });

  const generatedText = response.data.choices[0].text?.trim() || "";
  const [title, description] = generatedText.split("\n");

  const note = await prisma.note.create({
    data: {
      userId: user.id,
      title: title,
      description: description,
    },
  });

  return NextResponse.json({ note });
}