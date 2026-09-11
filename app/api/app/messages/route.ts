import { NextResponse } from "next/server";
import {
  getMessages,
  sendMessage,
  deleteMessage,
  AppUser,
  decodeSession,
  ADMIN_SESSION_COOKIE,
  CLIENT_SESSION_COOKIE,
  LEGACY_SESSION_COOKIE,
} from "@/lib/appStorage";

function getSessionUser(request: Request): (Partial<AppUser> & { exp: number }) | null {
  const cookieHeader = request.headers.get("cookie") || "";
  const referer = request.headers.get("referer") || "";
  const isDashboard = referer.includes("/dashboard") || referer.includes("/admin");

  const primaryCookie = isDashboard ? ADMIN_SESSION_COOKIE : CLIENT_SESSION_COOKIE;
  const secondaryCookie = isDashboard ? CLIENT_SESSION_COOKIE : ADMIN_SESSION_COOKIE;

  const extract = (name: string) => {
    const match = cookieHeader.match(new RegExp(`${name}=([^;]+)`));
    return match ? match[1] : null;
  };

  const token = extract(primaryCookie) || extract(secondaryCookie) || extract(LEGACY_SESSION_COOKIE);
  if (!token) return null;
  return decodeSession(token);
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

export async function DELETE(request: Request) {
  try {
    const session = getSessionUser(request);
    if (session && session.role !== "admin") {
      return NextResponse.json({ success: false, error: "Action réservée à l'administrateur" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const messageId = searchParams.get("id");
    if (!messageId) {
      return NextResponse.json({ success: false, error: "ID de message manquant." }, { status: 400 });
    }

    const ok = await deleteMessage(messageId);
    return NextResponse.json({ success: ok, message: "Message supprimé avec succès." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
