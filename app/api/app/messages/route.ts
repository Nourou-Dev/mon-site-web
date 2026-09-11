import { NextResponse } from "next/server";
import { getMessages, sendMessage, AppUser, decodeSession } from "@/lib/appStorage";

function getSessionUser(request: Request): (Partial<AppUser> & { exp: number }) | null {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/nd_session=([^;]+)/);
  if (!match) return null;
  return decodeSession(match[1]);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId") || undefined;

    const messages = await getMessages(projectId);
    return NextResponse.json({ success: true, messages });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = getSessionUser(request);
    const body = await request.json();
    const { projectId, content } = body;

    if (!projectId || !content || typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Contenu du message manquant." },
        { status: 400 }
      );
    }

    const senderId = session?.id || body.senderId || "usr_anonymous";
    const senderName = session?.name || body.senderName || "Visiteur";
    const senderRole = session?.role || body.senderRole || "client";

    const newMsg = await sendMessage({
      projectId,
      senderId,
      senderName,
      senderRole,
      content,
    });

    return NextResponse.json({ success: true, message: newMsg });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
