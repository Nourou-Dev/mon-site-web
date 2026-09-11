import {
  dbGetInquiries,
  dbSaveInquiry,
  dbUpdateInquiryStatus,
  dbDeleteInquiry,
  dbGetNewsletterSubscribers,
  dbSaveNewsletterSubscriber,
  dbDeleteNewsletterSubscriber,
  InquiryRecord,
  NewsletterRecord,
} from "./db";

export interface InquiryInput {
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  message: string;
}

export type { InquiryRecord, NewsletterRecord };

/**
 * Enregistre une nouvelle demande de devis/contact (CRUD: Create)
 */
export async function saveInquiry(input: InquiryInput): Promise<InquiryRecord> {
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

  return await dbSaveInquiry(newRecord);
}

/**
 * Récupère toutes les demandes CRM (CRUD: Read)
 */
export const getInquiries = dbGetInquiries;

/**
 * Met à jour le statut d'une demande (CRUD: Update)
 */
export const updateInquiryStatus = dbUpdateInquiryStatus;

/**
 * Supprime une demande CRM (CRUD: Delete)
 */
export const deleteInquiry = dbDeleteInquiry;

/**
 * Enregistre un nouvel abonné à la newsletter (CRUD: Create / Read)
 */
export async function saveNewsletterSubscriber(
  rawEmail: string
): Promise<{ success: boolean; isNew: boolean; subscriber: NewsletterRecord }> {
  const email = rawEmail.trim().toLowerCase();
  const subscribers = await dbGetNewsletterSubscribers();

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

  const saved = await dbSaveNewsletterSubscriber(newSubscriber);
  return {
    success: true,
    isNew: true,
    subscriber: saved,
  };
}

/**
 * Récupère tous les abonnés newsletter (CRUD: Read)
 */
export const getNewsletterSubscribers = dbGetNewsletterSubscribers;

/**
 * Supprime un abonné newsletter (CRUD: Delete)
 */
export const deleteNewsletterSubscriber = dbDeleteNewsletterSubscriber;
