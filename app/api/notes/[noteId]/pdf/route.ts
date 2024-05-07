// app/api/notes/[noteId]/pdf/route.ts
import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/lib/db";
import { PDFDocument, rgb } from "pdf-lib";

export async function GET(
  request: Request,
  { params }: { params: { noteId: string } }
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const note = await prisma.note.findUnique({
    where: {
      id: params.noteId,
    },
  });

  if (!note || note.userId !== user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const fontSize = 12;
  page.drawText(note.title, {
    x: 50,
    y: height - 50,
    size: 18,
    color: rgb(0, 0, 0),
  });
  page.drawText(note.description, {
    x: 50,
    y: height - 70,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

  return new Response(pdfBlob, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}