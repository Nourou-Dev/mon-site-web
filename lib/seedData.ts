import { PrismaClient } from "@prisma/client";
import { hashPassword } from "./authUtils";

/**
 * Données réelles initiales du projet :
 * - Compte Administrateur Nourou Dine AMANDOU
 * - Compte Client Clinique Santé Plus (Dr. Marc Dossou)
 * - Projet actif "Refonte Site Web & Catalogue Interactif"
 * - Jalons, Livrables et Messages en direct
 */
export const INITIAL_REAL_USERS = [
  {
    id: "usr_admin_nourou",
    name: "Nourou Dine AMANDOU",
    email: "contact@nouroudineamandou.com",
    passwordHash: hashPassword("admin123!"),
    role: "admin",
    company: "Studio Webdesign & Dev",
    phone: "+229 01 59 36 44 45",
  },
  {
    id: "usr_client_clinique",
    name: "Dr. Marc Dossou",
    email: "direction@cliniquesanteplus.com",
    passwordHash: hashPassword("password123"),
    role: "client",
    company: "Clinique Santé Plus",
    phone: "+229 01 40 50 60",
  },
];

export const INITIAL_REAL_PROJECTS = [
  {
    id: "prj_demo_1",
    title: "Refonte Site Web & Catalogue Interactif",
    clientId: "usr_client_clinique",
    clientName: "Clinique Santé Plus",
    clientEmail: "direction@cliniquesanteplus.com",
    category: "Site Vitrine & Prise de RDV",
    status: "developpement",
    progress: 80,
    budget: "450 000 FCFA",
    paidAmount: "300 000 FCFA",
    startDate: "2026-09-01",
    targetDate: "2026-09-28",
    milestones: [
      { id: "m1", title: "Cadrage initial & Stratégie de Marque", targetDate: "2026-09-05", completed: true },
      { id: "m2", title: "Maquettes UI Figma & Validation UX", targetDate: "2026-09-12", completed: true },
      { id: "m3", title: "Développement Front-End Next.js & Intégration", targetDate: "2026-09-20", completed: true },
      { id: "m4", title: "Recette, Sécurité, Tests Mobile & Audits", targetDate: "2026-09-25", completed: false },
      { id: "m5", title: "Mise en Ligne Production & Formation", targetDate: "2026-09-28", completed: false },
    ],
    deliverables: [
      { id: "d1", title: "Maquettes UI Figma", url: "https://figma.com", type: "figma" },
      { id: "d2", title: "Aperçu Pré-production Staging", url: "https://staging.exemple.com", type: "preview" },
    ],
  },
];

export const INITIAL_REAL_MESSAGES = [
  {
    id: "msg_1",
    projectId: "prj_demo_1",
    senderId: "usr_client_clinique",
    senderName: "Clinique Santé Plus",
    senderRole: "client",
    content: "Bonjour Nourou, nous avons bien examiné les maquettes Figma, les retours de l'équipe médicale sont très positifs !",
    read: true,
  },
  {
    id: "msg_2",
    projectId: "prj_demo_1",
    senderId: "usr_admin_nourou",
    senderName: "Nourou Dine AMANDOU",
    senderRole: "admin",
    content: "Parfait ! J'ai intégré les derniers ajustements de typographie et j'attaque le développement responsive avec le module de prise de rendez-vous en ligne.",
    read: true,
  },
  {
    id: "msg_3",
    projectId: "prj_demo_1",
    senderId: "usr_admin_nourou",
    senderName: "Nourou Dine AMANDOU",
    senderRole: "admin",
    content: "Le module de prise de rendez-vous est maintenant opérationnel sur l'environnement de staging. Vous pouvez effectuer vos premiers tests.",
    read: false,
  },
];

/**
 * Initialise automatiquement la base de données PostgreSQL si les tables sont vides.
 * Exécuté de façon idempotente et sans duplication.
 */
export async function autoSeedDatabase(prismaClient: PrismaClient): Promise<void> {
  try {
    const userCount = await prismaClient.user.count();
    if (userCount > 0) {
      return; // Déjà initialisé
    }

    console.log("🌱 Initialisation automatique de la base de données PostgreSQL...");

    // 1. Utilisateurs
    for (const u of INITIAL_REAL_USERS) {
      await prismaClient.user.upsert({
        where: { email: u.email },
        update: {},
        create: {
          id: u.id,
          name: u.name,
          email: u.email,
          passwordHash: u.passwordHash,
          role: u.role,
          company: u.company,
          phone: u.phone,
        },
      });
    }

    // 2. Projets et Jalons
    for (const p of INITIAL_REAL_PROJECTS) {
      const createdProject = await prismaClient.project.upsert({
        where: { id: p.id },
        update: {},
        create: {
          id: p.id,
          title: p.title,
          clientId: p.clientId,
          clientName: p.clientName,
          clientEmail: p.clientEmail,
          category: p.category,
          status: p.status,
          progress: p.progress,
          budget: p.budget,
          paidAmount: p.paidAmount,
          startDate: p.startDate,
          targetDate: p.targetDate,
        },
      });

      for (const m of p.milestones) {
        await prismaClient.projectMilestone.upsert({
          where: { id: m.id },
          update: {},
          create: {
            id: m.id,
            projectId: createdProject.id,
            title: m.title,
            targetDate: m.targetDate,
            completed: m.completed,
          },
        });
      }

      for (const d of p.deliverables) {
        await prismaClient.projectDeliverable.upsert({
          where: { id: d.id },
          update: {},
          create: {
            id: d.id,
            projectId: createdProject.id,
            title: d.title,
            url: d.url,
            type: d.type,
          },
        });
      }
    }

    // 3. Messages
    for (const msg of INITIAL_REAL_MESSAGES) {
      await prismaClient.message.upsert({
        where: { id: msg.id },
        update: {},
        create: {
          id: msg.id,
          projectId: msg.projectId,
          senderId: msg.senderId,
          senderName: msg.senderName,
          senderRole: msg.senderRole,
          content: msg.content,
          read: msg.read,
        },
      });
    }

    console.log("✅ Base de données PostgreSQL initialisée avec succès avec données réelles !");
  } catch (error) {
    console.warn("⚠️ Notice d'auto-seed (base en lecture seule ou connexion différée):", error);
  }
}
