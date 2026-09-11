import { NextResponse } from "next/server";
import { getInquiries, getNewsletterSubscribers, updateInquiryStatus } from "@/lib/storage";

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

    const updated = await updateInquiryStatus(id, status);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Demande introuvable" }, { status: 404 });
    }

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
