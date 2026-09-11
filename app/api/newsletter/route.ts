import { NextResponse } from "next/server";
import { saveNewsletterSubscriber, getNewsletterSubscribers } from "@/lib/storage";
import {
  checkRateLimit,
  getClientIp,
  isValidEmail,
  verifyBotProtection,
} from "@/lib/security";

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);

    // 1. Rate limiting : 5 inscriptions par tranche de 10 minutes par IP
    const rateLimit = checkRateLimit(`newsletter:${clientIp}`, 5, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      const retryAfter = Math.ceil((rateLimit.resetTime - Date.now()) / 1000);
      return NextResponse.json(
        {
          success: false,
          error: "Trop de requêtes envoyées. Veuillez patienter quelques minutes.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": retryAfter.toString(),
          },
        }
      );
    }

    // 2. Contrôle de taille de charge utile (< 10 Ko)
    const rawBody = await request.text();
    if (rawBody.length > 10 * 1024) {
      return NextResponse.json(
        { success: false, error: "Requête trop volumineuse." },
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

    // 3. Détection Honeypot & Timing
    const botCheck = verifyBotProtection(body._hp_fax, body._renderedAt, 1.0);
    if (botCheck.isBot) {
      console.warn(`[Newsletter Bot Détecté] IP: ${clientIp} | Raison: ${botCheck.reason}`);
      return NextResponse.json({
        success: true,
        message: "Merci pour votre inscription à la newsletter !",
      });
    }

    const { email } = body;

    // 4. Validation stricte de l'e-mail
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Veuillez renseigner une adresse e-mail valide." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const result = await saveNewsletterSubscriber(cleanEmail);

    console.log(`[Newsletter Sécurisée] Email: ${cleanEmail} | Nouveau: ${result.isNew} | IP: ${clientIp}`);

    const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL;
    if (webhookUrl && result.isNew) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `📬 **Nouvel abonné à la newsletter !**\n**Email :** ${cleanEmail}`,
          }),
        });
      } catch (err) {
        console.warn("[Newsletter Webhook] Erreur webhook :", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: result.isNew
        ? "Merci pour votre inscription ! Vous recevrez mes prochains conseils directement dans votre boîte mail."
        : "Vous êtes déjà inscrit à notre newsletter avec cette adresse e-mail. Merci pour votre fidélité !",
    });
  } catch (error) {
    console.error("[API Newsletter Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Une erreur est survenue lors de l'enregistrement de votre abonnement.",
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

    const subscribers = await getNewsletterSubscribers();
    return NextResponse.json({
      total: subscribers.length,
      subscribers,
    });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur interne" }, { status: 500 });
  }
}
