'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NoteGenerator() {
  const [prompt, setPrompt] = useState("");
  const [note, setNote] = useState("");

  const generateNote = async () => {
    const res = await fetch("/api/notes/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setNote(data.note);
  };

  return (
    <>
      <div className="flex flex-col gap-y-2">
        <Label>Description</Label>
        <Textarea
          name="description"
          placeholder="Describe your note as you want"
          required
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <div>
        <Button onClick={generateNote}>Generate Note with AI</Button>
      </div>
      {note && (
        <div>
          <Label>Generated Note</Label>
          <Textarea value={note} readOnly />
        </div>
      )}
    </>
  );
}