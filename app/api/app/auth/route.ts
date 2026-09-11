import { NextResponse } from "next/server";
import {
  findUserByEmail,
  registerClientUser,
  hashPassword,
  getUsers,
  encodeSession,
  decodeSession,
} from "@/lib/appStorage";

const SESSION_COOKIE = "nd_session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    // 1. OBTENIR L'UTILISATEUR ACTUELLEMENT CONNECTÉ
    if (action === "me") {
      const cookieHeader = request.headers.get("cookie") || "";
      const match = cookieHeader.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`));
      if (!match) {
        return NextResponse.json({ authenticated: false, user: null });
      }

      const session = decodeSession(match[1]);
      if (!session) {
        return NextResponse.json({ authenticated: false, user: null });
      }

      return NextResponse.json({
        authenticated: true,
        user: {
          id: session.id,
          name: session.name,
          email: session.email,
          role: session.role,
          company: session.company,
        },
      });
    }

    // 2. CONNEXION
    if (action === "login") {
      const { email, password } = body;
      if (!email || !password) {
        return NextResponse.json(
          { success: false, error: "Veuillez renseigner votre e-mail et votre mot de passe." },
          { status: 400 }
        );
      }

      // S'assurer que les utilisateurs sont initialisés
      await getUsers();

      const user = await findUserByEmail(email);
      if (!user) {
        return NextResponse.json(
          { success: false, error: "Identifiants incorrects. Aucun compte trouvé." },
          { status: 401 }
        );
      }

      const adminSecret = process.env.ADMIN_SECRET_KEY;
      const isMasterKey = user.role === "admin" && adminSecret && password.trim() === adminSecret.trim();
      const isPasswordMatch = user.passwordHash === hashPassword(password);

      if (!isPasswordMatch && !isMasterKey) {
        return NextResponse.json(
          { success: false, error: "Mot de passe incorrect." },
          { status: 401 }
        );
      }

      const sessionToken = encodeSession(user);
      const res = NextResponse.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          company: user.company,
        },
      });

      res.cookies.set(SESSION_COOKIE, sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 3600,
      });

      return res;
    }

    // 3. INSCRIPTION CLIENT
    if (action === "register") {
      const { name, email, password, company, phone } = body;
      if (!name || name.trim().length < 2) {
        return NextResponse.json(
          { success: false, error: "Veuillez renseigner votre nom complet." },
          { status: 400 }
        );
      }
      if (!email || !email.includes("@")) {
        return NextResponse.json(
          { success: false, error: "Veuillez renseigner un e-mail valide." },
          { status: 400 }
        );
      }
      if (!password || password.length < 6) {
        return NextResponse.json(
          { success: false, error: "Le mot de passe doit comporter au moins 6 caractères." },
          { status: 400 }
        );
      }

      const newUser = await registerClientUser({
        name,
        email,
        password,
        company,
        phone,
      });

      const sessionToken = encodeSession(newUser);
      const res = NextResponse.json({
        success: true,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          company: newUser.company,
        },
      });

      res.cookies.set(SESSION_COOKIE, sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 3600,
      });

      return res;
    }

    // 4. DÉCONNEXION
    if (action === "logout") {
      const res = NextResponse.json({ success: true, message: "Déconnecté" });
      res.cookies.set(SESSION_COOKIE, "", {
        httpOnly: true,
        path: "/",
        maxAge: 0,
      });
      return res;
    }

    return NextResponse.json({ error: "Action non reconnue" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Erreur d'authentification" },
      { status: 500 }
    );
  }
}
