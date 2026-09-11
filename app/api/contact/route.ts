import { NextResponse } from "next/server";
import { saveInquiry, getInquiries, InquiryInput } from "@/lib/storage";
import {
  checkRateLimit,
  getClientIp,
  sanitizeString,
  isValidEmail,
  verifyBotProtection,
} from "@/lib/security";

const ALLOWED_PROJECT_TYPES = [
  "site-vitrine",
  "landing-page",
  "catalogue",
  "refonte",
  "autre",
];

const ALLOWED_BUDGETS = [
  "moins-150k",
  "150k-350k",
  "350k-700k",
  "plus-700k",
];

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);

    // 1. Protection Anti-Brute-Force & Anti-DDoS : 5 soumissions par tranche de 10 minutes par IP
    const rateLimit = checkRateLimit(`contact:${clientIp}`, 5, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      const retryAfter = Math.ceil((rateLimit.resetTime - Date.now()) / 1000);
      return NextResponse.json(
        {
          success: false,
          error: "Trop de requêtes envoyées en peu de temps. Veuillez patienter avant de renouveler votre demande.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": retryAfter.toString(),
          },
        }
      );
    }

    // 2. Analyse de la charge utile (Taille max 100 Ko pour prévenir les attaques d'épuisement mémoire)
    const rawBody = await request.text();
    if (rawBody.length > 100 * 1024) {
      return NextResponse.json(
        { success: false, error: "Contenu trop volumineux." },
        { status: 413 }
      );
    }

    let body: any;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { success: false, error: "Format JSON invalide." },
        { status: 400 }
      );
    }

    // 3. Détection des Robots (Honeypot & Analyse chronométrique)
    const botCheck = verifyBotProtection(body._hp_fax, body._renderedAt, 1.2);
    if (botCheck.isBot) {
      console.warn(`[Bot Neutralisé] IP: ${clientIp} | Raison: ${botCheck.reason}`);
      // Réponse factice réussie pour leurrer le robot et éviter qu'il ne tente de contourner
      return NextResponse.json({
        success: true,
        message: "Votre demande a bien été transmise. Je reviens vers vous sous 24h ouvrées.",
      });
    }

    const { name, email, phone, projectType, budget, message } = body;

    // 4. Validation et assainissement strict des champs
    const cleanName = sanitizeString(name, 100);
    if (!cleanName || cleanName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Veuillez renseigner un nom complet valide (entre 2 et 100 caractères)." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Veuillez renseigner une adresse e-mail valide." },
        { status: 400 }
      );
    }

    const cleanMessage = sanitizeString(message, 3000);
    if (!cleanMessage || cleanMessage.length < 5) {
      return NextResponse.json(
        { success: false, error: "Veuillez décrire votre projet (entre 5 et 3000 caractères)." },
        { status: 400 }
      );
    }

    const cleanPhone = sanitizeString(phone, 35);
    const cleanProjectType = ALLOWED_PROJECT_TYPES.includes(projectType)
      ? projectType
      : "site-vitrine";
    const cleanBudget = ALLOWED_BUDGETS.includes(budget)
      ? budget
      : "150k-350k";

    const input: InquiryInput = {
      name: cleanName,
      email: email.trim().toLowerCase(),
      phone: cleanPhone,
      projectType: cleanProjectType,
      budget: cleanBudget,
      message: cleanMessage,
    };

    // 5. Enregistrement sécurisé
    const record = await saveInquiry(input);

    console.log(`[Demande sécurisée] ID: ${record.id} | IP: ${clientIp} | Nom: ${record.name}`);

    // Notification webhook optionnelle
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `📢 **Nouvelle demande de devis sur le site !**\n**Nom :** ${record.name}\n**Email :** ${record.email}\n**Téléphone :** ${record.phone || "Non renseigné"}\n**Type :** ${record.projectType}\n**Budget :** ${record.budget}\n**Message :** ${record.message}`,
          }),
        });
      } catch (webhookErr) {
        console.warn("[Webhook Notification] Échec webhook :", webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Votre demande a bien été transmise. Je reviens vers vous sous 24h ouvrées.",
      id: record.id,
    });
  } catch (error) {
    console.error("[API Contact Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Une erreur inattendue est survenue. Veuillez réessayer ultérieurement.",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");
    const secret = process.env.ADMIN_SECRET_KEY;

    // SÉCURITÉ CRITIQUE : Interdit formellement l'accès si la clé secrète n'est pas définie ou ne correspond pas
    if (!secret || typeof secret !== "string" || secret.trim().length < 8 || key !== secret) {
      return NextResponse.json(
        { error: "Accès refusé. Clé d'authentification manquante ou non autorisée." },
        { status: 401 }
      );
    }

    const inquiries = await getInquiries();
    return NextResponse.json({
      total: inquiries.length,
      inquiries,
    });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur interne" }, { status: 500 });
  }
}
