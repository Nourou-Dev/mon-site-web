import { NextResponse } from "next/server";
import { getCookieStats, logCookieConsent } from "@/lib/appStorage";

export async function GET() {
  try {
    const stats = await getCookieStats();
    return NextResponse.json({ success: true, stats });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { choice, analytics, experience } = body;

    const userAgent = request.headers.get("user-agent") || undefined;

    await logCookieConsent({
      choice: choice || "accepted_all",
      analytics: Boolean(analytics),
      experience: Boolean(experience),
      userAgent,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
