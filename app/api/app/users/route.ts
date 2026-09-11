import { NextResponse } from "next/server";
import { getUsers, decodeSession } from "@/lib/appStorage";

const SESSION_COOKIE = "nd_session";

export async function GET(request: Request) {
  try {
    // Vérification de la session Admin obligatoire
    const cookieHeader = request.headers.get("cookie") || "";
    let rawToken = (request as any).cookies?.get?.(SESSION_COOKIE)?.value;

    if (!rawToken) {
      const match = cookieHeader.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`));
      if (match) rawToken = match[1];
    }

    if (!rawToken) {
      return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 });
    }

    const session = decodeSession(rawToken);
    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Accès réservé exclusivement à l'administrateur." },
        { status: 403 }
      );
    }

    const users = await getUsers();

    // Renvoyer la liste des utilisateurs sans divulguer les hashs de mots de passe
    const sanitizedUsers = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      company: u.company || "",
      phone: u.phone || "",
      createdAt: u.createdAt || new Date().toISOString(),
    }));

    return NextResponse.json({
      success: true,
      total: sanitizedUsers.length,
      users: sanitizedUsers,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
