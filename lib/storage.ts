import fs from "fs/promises";
import path from "path";

export interface InquiryInput {
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  message: string;
}

export interface InquiryRecord extends InquiryInput {
  id: string;
  createdAt: string;
  status: "nouveau" | "en_cours" | "traité";
}

export interface NewsletterRecord {
  id: string;
  email: string;
  subscribedAt: string;
  status: "active" | "unsubscribed";
}

const DATA_DIR = path.join(process.cwd(), "data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");
const NEWSLETTER_FILE = path.join(DATA_DIR, "newsletter.json");

// S'assure que le dossier data/ existe
async function ensureDataDir(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Le dossier existe déjà ou erreur ignorée
  }
}

// Lecture sécurisée d'un fichier JSON
async function readJsonFile<T>(filePath: string, defaultValue: T): Promise<T> {
  await ensureDataDir();
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch {
    return defaultValue;
  }
}

// Écriture sécurisée d'un fichier JSON
async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

/**
 * Enregistre une nouvelle demande de devis/contact
 */
export async function saveInquiry(input: InquiryInput): Promise<InquiryRecord> {
  const inquiries = await readJsonFile<InquiryRecord[]>(INQUIRIES_FILE, []);

  const newRecord: InquiryRecord = {
    id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone ? input.phone.trim() : "",
    projectType: input.projectType || "site-vitrine",
    budget: input.budget || "150k-350k",
    message: input.message.trim(),
    createdAt: new Date().toISOString(),
    status: "nouveau",
  };

  inquiries.unshift(newRecord);
  await writeJsonFile(INQUIRIES_FILE, inquiries);

  return newRecord;
}

/**
 * Récupère toutes les demandes
 */
export async function getInquiries(): Promise<InquiryRecord[]> {
  return await readJsonFile<InquiryRecord[]>(INQUIRIES_FILE, []);
}

/**
 * Enregistre un nouvel abonné à la newsletter (avec déduplication)
 */
export async function saveNewsletterSubscriber(
  rawEmail: string
): Promise<{ success: boolean; isNew: boolean; subscriber: NewsletterRecord }> {
  const email = rawEmail.trim().toLowerCase();
  const subscribers = await readJsonFile<NewsletterRecord[]>(NEWSLETTER_FILE, []);

  const existing = subscribers.find((s) => s.email === email);
  if (existing) {
    return {
      success: true,
      isNew: false,
      subscriber: existing,
    };
  }

  const newSubscriber: NewsletterRecord = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    email,
    subscribedAt: new Date().toISOString(),
    status: "active",
  };

  subscribers.unshift(newSubscriber);
  await writeJsonFile(NEWSLETTER_FILE, subscribers);

  return {
    success: true,
    isNew: true,
    subscriber: newSubscriber,
  };
}

/**
 * Récupère tous les abonnés newsletter
 */
export async function getNewsletterSubscribers(): Promise<NewsletterRecord[]> {
  return await readJsonFile<NewsletterRecord[]>(NEWSLETTER_FILE, []);
}
