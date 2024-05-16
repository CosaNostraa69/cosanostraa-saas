// app/dashboard/new/postData.ts
"use server";

import prisma from "@/app/lib/db";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";

export async function postData(formData: FormData, user: User | null) {
  if (!user) {
    throw new Error("Not authorized");
  }
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  await prisma.note.create({
    data: {
      userId: user.id,
      description: description,
      title: title,
    },
  });
  return redirect("/dashboard");
}





