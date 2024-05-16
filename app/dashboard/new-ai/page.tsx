// app/dashboard/new-ai/page.tsx
'use client';

import { SubmitButton } from "@/app/components/Submitbuttons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { generateNote } from "../new/generateNote";
import { redirect } from "next/navigation";

export default function NewAINoteRoute() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const prompt = formData.get("prompt") as string;
    const note = await generateNote(prompt);

    if (note) {
      redirect("/dashboard");
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Generate Note with AI</CardTitle>
          <CardDescription>
            Enter a prompt to generate a new note with AI
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
          <div className="gap-y-2 flex flex-col">
            <Label>Prompt</Label>
            <Input
              required
              type="text"
              name="prompt"
              placeholder="Enter keywords or a short phrase"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button asChild variant="destructive">
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <SubmitButton>Generate Note</SubmitButton>
        </CardFooter>
      </form>
    </Card>
  );
}