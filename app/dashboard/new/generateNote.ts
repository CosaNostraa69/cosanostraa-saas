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

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notes/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, userId: user.id }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    console.error("Erreur lors de la génération de la note :", errorData);
    throw new Error("Failed to generate note");
  }

  const { note } = await response.json();

  return note;
}