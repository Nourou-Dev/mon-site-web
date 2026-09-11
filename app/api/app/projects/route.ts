import { NextResponse } from "next/server";
import { getProjects, saveProject, updateProject, AppUser, decodeSession } from "@/lib/appStorage";

function getSessionUser(request: Request): (Partial<AppUser> & { exp: number }) | null {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/nd_session=([^;]+)/);
  if (!match) return null;
  return decodeSession(match[1]);
}

export async function GET(request: Request) {
  try {
    const session = getSessionUser(request);
    // Si l'utilisateur est client, getProjects filtrera automatiquement
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
