import { NextResponse } from "next/server";
import {
  getProjects,
  saveProject,
  updateProject,
  deleteProject,
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
    const session = getSessionUser(request);
    // Si l'utilisateur est client, getProjects filtrera automatiquement sur ses projets
    const projects = await getProjects(session as AppUser | undefined);
    return NextResponse.json({ success: true, projects });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = getSessionUser(request);
    if (session && session.role !== "admin") {
      return NextResponse.json({ success: false, error: "Action réservée à l'administrateur" }, { status: 403 });
    }

    const body = await request.json();
    if (!body.title || !body.clientName || !body.clientEmail) {
      return NextResponse.json(
        { success: false, error: "Veuillez renseigner le titre du projet, le nom et l'email du client." },
        { status: 400 }
      );
    }

    const created = await saveProject(body);
    return NextResponse.json({ success: true, project: created });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = getSessionUser(request);
    // Si client, il peut uniquement consulter ou faire des actions restreintes (les modifications complètes sont admin)
    if (session && session.role !== "admin") {
      return NextResponse.json({ success: false, error: "Action réservée à l'administrateur" }, { status: 403 });
    }

    const body = await request.json();
    const projectId = body.id || body.projectId;
    const { id, projectId: _pId, ...updates } = body;
    if (!projectId) {
      return NextResponse.json({ success: false, error: "ID de projet manquant" }, { status: 400 });
    }

    const updated = await updateProject(projectId, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Projet introuvable" }, { status: 404 });
    }

    return NextResponse.json({ success: true, project: updated });
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
    const projectId = searchParams.get("id");
    if (!projectId) {
      return NextResponse.json({ success: false, error: "ID de projet requis" }, { status: 400 });
    }

    const ok = await deleteProject(projectId);
    if (!ok) {
      return NextResponse.json({ success: false, error: "Projet introuvable ou déjà supprimé" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Projet supprimé avec succès" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
