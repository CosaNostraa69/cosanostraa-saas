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
import { redirect } from "next/navigation";
import { generateNote } from "../new/generateNote";

export default function NewAINoteRoute() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const prompt = formData.get("prompt") as string;

    if (prompt) {
      try {
        const note = await generateNote(prompt);

        if (note) {
          redirect("/dashboard");
        } else {
          // Gérer le cas où la génération de note a échoué
          console.error("Échec de la génération de note");
        }
      } catch (error) {
        console.error("Erreur lors de la génération de note :", error);
      }
    } else {
      // Gérer le cas où le champ de saisie est vide
      console.error("Le champ de saisie est vide");
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
            <Label htmlFor="prompt">Prompt</Label>
            <Input
              required
              type="text"
              id="prompt"
              name="prompt"
              placeholder="Enter keywords or a short phrase"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button asChild variant="destructive">
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <SubmitButton/>
        </CardFooter>
      </form>
    </Card>
  );
}