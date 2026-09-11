const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");

function hashPassword(password) {
  return crypto.createHash("sha256").update(password + "_nd_salt_2026").digest("hex");
}

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Connexion au cluster PostgreSQL Neon...");
  
  // 1. Utilisateurs
  console.log("👤 Initialisation des utilisateurs...");
  const admin = await prisma.user.upsert({
    where: { email: "contact@nouroudineamandou.com" },
    update: {},
    create: {
      id: "usr_admin_nourou",
      name: "Nourou Dine AMANDOU",
      email: "contact@nouroudineamandou.com",
      passwordHash: hashPassword("admin123!"),
      role: "admin",
      company: "Studio Webdesign & Dev",
      phone: "+229 01 59 36 44 45",
    },
  });
  console.log("  ✓ Admin créé/vérifié :", admin.name, `(${admin.email})`);

  const client = await prisma.user.upsert({
    where: { email: "direction@cliniquesanteplus.com" },
    update: {},
    create: {
      id: "usr_client_clinique",
      name: "Dr. Marc Dossou",
      email: "direction@cliniquesanteplus.com",
      passwordHash: hashPassword("password123"),
      role: "client",
      company: "Clinique Santé Plus",
      phone: "+229 01 40 50 60",
    },
  });
  console.log("  ✓ Client créé/vérifié :", client.name, `(${client.email})`);

  // 2. Projet
  console.log("📁 Initialisation du projet client...");
  const project = await prisma.project.upsert({
    where: { id: "prj_demo_1" },
    update: {},
    create: {
      id: "prj_demo_1",
      title: "Refonte Site Web & Catalogue Interactif",
      clientId: client.id,
      clientName: "Clinique Santé Plus",
      clientEmail: "direction@cliniquesanteplus.com",
      category: "Site Vitrine & Prise de RDV",
      status: "developpement",
      progress: 80,
      budget: "450 000 FCFA",
      paidAmount: "300 000 FCFA",
      startDate: "2026-09-01",
      targetDate: "2026-09-28",
    },
  });
  console.log("  ✓ Projet créé/vérifié :", project.title);

  // 3. Jalons
  const milestones = [
    { id: "m1", title: "Cadrage initial & Stratégie de Marque", targetDate: "2026-09-05", completed: true },
    { id: "m2", title: "Maquettes UI Figma & Validation UX", targetDate: "2026-09-12", completed: true },
    { id: "m3", title: "Développement Front-End Next.js & Intégration", targetDate: "2026-09-20", completed: true },
    { id: "m4", title: "Recette, Sécurité, Tests Mobile & Audits", targetDate: "2026-09-25", completed: false },
    { id: "m5", title: "Mise en Ligne Production & Formation", targetDate: "2026-09-28", completed: false },
  ];

  for (const m of milestones) {
    await prisma.projectMilestone.upsert({
      where: { id: m.id },
      update: {},
      create: {
        id: m.id,
        projectId: project.id,
        title: m.title,
        targetDate: m.targetDate,
        completed: m.completed,
      },
    });
  }
  console.log("  ✓ 5 Jalons synchronisés.");

  // 4. Livrables
  const deliverables = [
    { id: "d1", title: "Maquettes UI Figma", url: "https://figma.com", type: "figma" },
    { id: "d2", title: "Aperçu Pré-production Staging", url: "https://staging.exemple.com", type: "preview" },
  ];

  for (const d of deliverables) {
    await prisma.projectDeliverable.upsert({
      where: { id: d.id },
      update: {},
      create: {
        id: d.id,
        projectId: project.id,
        title: d.title,
        url: d.url,
        type: d.type,
      },
    });
  }
  console.log("  ✓ 2 Livrables synchronisés.");

  // 5. Messages
  const messages = [
    {
      id: "msg_1",
      projectId: "prj_demo_1",
      senderId: client.id,
      senderName: "Clinique Santé Plus",
      senderRole: "client",
      content: "Bonjour Nourou, nous avons bien examiné les maquettes Figma, les retours de l'équipe médicale sont très positifs !",
      read: true,
    },
    {
      id: "msg_2",
      projectId: "prj_demo_1",
      senderId: admin.id,
      senderName: "Nourou Dine AMANDOU",
      senderRole: "admin",
      content: "Parfait ! J'ai intégré les derniers ajustements de typographie et j'attaque le développement responsive avec le module de prise de rendez-vous en ligne.",
      read: true,
    },
    {
      id: "msg_3",
      projectId: "prj_demo_1",
      senderId: admin.id,
      senderName: "Nourou Dine AMANDOU",
      senderRole: "admin",
      content: "Le module de prise de rendez-vous est maintenant opérationnel sur l'environnement de staging. Vous pouvez effectuer vos premiers tests.",
      read: false,
    },
  ];

  for (const msg of messages) {
    await prisma.message.upsert({
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
  console.log("  ✓ 3 Messages de discussion en direct synchronisés.");

  // 6. Statistiques récapitulatives en direct depuis Neon
  const totalUsers = await prisma.user.count();
  const totalProjects = await prisma.project.count();
  const totalMessages = await prisma.message.count();

  console.log("\n=======================================================");
  console.log("🎉 BASE DE DONNÉES POSTGRESQL NEON 100% OPÉRATIONNELLE !");
  console.log(`- Utilisateurs en base : ${totalUsers}`);
  console.log(`- Projets en base      : ${totalProjects}`);
  console.log(`- Messages en base     : ${totalMessages}`);
  console.log("=======================================================\n");
}

main()
  .catch((err) => {
    console.error("❌ Erreur de connexion ou d'initialisation:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
