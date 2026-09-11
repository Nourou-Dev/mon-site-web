import { NextResponse } from "next/server";
import { getInquiries, getNewsletterSubscribers, InquiryRecord } from "@/lib/storage";
import fs from "fs/promises";
import path from "path";

const INQUIRIES_FILE = path.join(process.cwd(), "data", "inquiries.json");

export async function GET() {
  try {
    const inquiries = await getInquiries();
    const subscribers = await getNewsletterSubscribers();

    return NextResponse.json({
      success: true,
      inquiries,
      subscribers,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Paramètres manquants" }, { status: 400 });
    }

    const inquiries = await getInquiries();
    const idx = inquiries.findIndex((inq) => inq.id === id);
    if (idx < 0) {
      return NextResponse.json({ success: false, error: "Demande introuvable" }, { status: 404 });
    }

    inquiries[idx].status = status;
    await fs.writeFile(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), "utf-8");

    return NextResponse.json({ success: true, inquiry: inquiries[idx] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
