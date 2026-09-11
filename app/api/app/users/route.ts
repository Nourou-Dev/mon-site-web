import { NextResponse } from "next/server";
import {
  getUsers,
  decodeSession,
  registerClientUser,
  ADMIN_SESSION_COOKIE,
  LEGACY_SESSION_COOKIE,
  AppUser,
} from "@/lib/appStorage";

function getAdminSession(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  let rawToken = (request as any).cookies?.get?.(ADMIN_SESSION_COOKIE)?.value;

  if (!rawToken) {
    const match = cookieHeader.match(new RegExp(`${ADMIN_SESSION_COOKIE}=([^;]+)`));
    if (match) rawToken = match[1];
  }

  if (!rawToken) {
    rawToken = (request as any).cookies?.get?.(LEGACY_SESSION_COOKIE)?.value;
    if (!rawToken) {
      const match = cookieHeader.match(new RegExp(`${LEGACY_SESSION_COOKIE}=([^;]+)`));
      if (match) rawToken = match[1];
    }
  }

  if (!rawToken) return null;
  const session = decodeSession(rawToken);
  return session && session.role === "admin" ? session : null;
}

export async function GET(request: Request) {
  try {
    const admin = getAdminSession(request);
    if (!admin) {
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

export async function POST(request: Request) {
  try {
    const admin = getAdminSession(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Accès réservé exclusivement à l'administrateur." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { action, client, clients } = body;

    // Action 1 : Création manuelle d'un nouveau compte client depuis l'admin
    if (action === "create" || (client && client.email)) {
      const c = client || body;
      if (!c.name || !c.email) {
        return NextResponse.json(
          { success: false, error: "Le nom et l'adresse e-mail sont obligatoires." },
          { status: 400 }
        );
      }

      const defaultPassword = c.password || "client2026!";
      const newUser = await registerClientUser({
        name: c.name.trim(),
        email: c.email.trim().toLowerCase(),
        password: defaultPassword,
        company: c.company?.trim(),
        phone: c.phone?.trim(),
      });

      return NextResponse.json({
        success: true,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          company: newUser.company,
          phone: newUser.phone,
          createdAt: newUser.createdAt,
        },
      });
    }

    // Action 2 : Synchronisation des clients locaux vers le serveur
    if (action === "sync" && Array.isArray(clients)) {
      const existingUsers = await getUsers();
      let addedCount = 0;

      for (const cl of clients) {
        if (!cl.email) continue;
        const exists = existingUsers.some(
          (u) => u.email.toLowerCase() === cl.email.trim().toLowerCase()
        );
        if (!exists) {
          try {
            await registerClientUser({
              name: cl.name || "Client",
              email: cl.email.trim().toLowerCase(),
              password: cl.password || "client2026!",
              company: cl.company || "",
              phone: cl.phone || "",
            });
            addedCount++;
          } catch {}
        }
      }

      const updatedUsers = await getUsers();
      return NextResponse.json({
        success: true,
        added: addedCount,
        total: updatedUsers.length,
        users: updatedUsers.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
          company: u.company || "",
          phone: u.phone || "",
          createdAt: u.createdAt,
        })),
      });
    }

    return NextResponse.json({ success: false, error: "Action non reconnue" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

