import { PrismaClient } from "@prisma/client";
import { autoSeedDatabase } from "../lib/seedData";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Lancement du seed Prisma...");
  await autoSeedDatabase(prisma);
  console.log("🏁 Seed terminé !");
}

main()
  .catch((e) => {
    console.error("Erreur durant le seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
