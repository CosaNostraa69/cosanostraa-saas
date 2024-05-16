"use server";

import openai from "../../lib/openai";
import prisma from "../../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function generateNote(prompt: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Not authorized");
  }

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Generate a title and description for a note based on the following prompt: ${prompt}`,
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

  return note;
}