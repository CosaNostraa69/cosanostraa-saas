'use client'
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

type DownloadPDFButtonProps = {
  noteId: string;
};

export function DownloadPDFButton({ noteId }: DownloadPDFButtonProps) {
  const handleDownloadPDF = async () => {
    // Logique pour télécharger le PDF
    const response = await fetch(`/api/notes/${noteId}/pdf`, {
      method: "GET",
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `note-${noteId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };

  return (
    <Button variant="outline" size="icon" onClick={handleDownloadPDF}>
      <Download className="w-4 h-4" />
    </Button>
  );
}