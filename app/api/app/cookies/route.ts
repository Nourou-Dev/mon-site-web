import { NextResponse } from "next/server";
import { getCookieStats, logCookieConsent, clearCookieConsentLogs } from "@/lib/appStorage";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month") || undefined;

    const stats = await getCookieStats(month);
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
    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ip = forwarded ? forwarded.split(",")[0].trim() : realIp || "127.0.0.1";
    const country =
      request.headers.get("x-vercel-ip-country") ||
      request.headers.get("cf-ipcountry") ||
      "Non déterminé";

    await logCookieConsent({
      choice: choice || "accepted_all",
      analytics: Boolean(analytics),
      experience: Boolean(experience),
      userAgent,
      ip,
      country,
    });

    return NextResponse.json({ success: true, ip });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const ok = await clearCookieConsentLogs();
    return NextResponse.json({ success: ok, message: "Historique des cookies purgé." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
