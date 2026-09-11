import { prisma, isDatabaseConfigured } from "./prisma";
import { autoSeedDatabase, INITIAL_REAL_USERS, INITIAL_REAL_PROJECTS, INITIAL_REAL_MESSAGES } from "./seedData";
import { readJsonStorage, writeJsonStorage } from "./fsStorage";
import path from "path";

// Types
export interface AppUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "client";
  company?: string;
  phone?: string;
  createdAt: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  targetDate: string;
  completed: boolean;
}

export interface ProjectDeliverable {
  id: string;
  title: string;
  url: string;
  type: "figma" | "preview" | "document" | "code";
}

export interface ProjectRecord {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  category: string;
  status: "cadrage" | "design" | "developpement" | "recette" | "en_ligne";
  progress: number;
  budget?: string;
  paidAmount?: string;
  startDate: string;
  targetDate: string;
  milestones: ProjectMilestone[];
  deliverables: ProjectDeliverable[];
  createdAt: string;
  updatedAt: string;
}

export interface MessageRecord {
  id: string;
  projectId: string;
  senderId: string;
  senderName: string;
  senderRole: "admin" | "client";
  content: string;
  createdAt: string;
  read: boolean;
}

export interface CookieConsentLog {
  id: string;
  choice: "accepted_all" | "refused_all" | "customized";
  analytics: boolean;
  experience: boolean;
  ip?: string;
  country?: string;
  month?: string;
  userAgent?: string;
  timestamp: string;
}

export interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  message: string;
  status: "nouveau" | "en_cours" | "traité";
  createdAt: string;
}

export interface NewsletterRecord {
  id: string;
  email: string;
  subscribedAt: string;
  status: "active" | "unsubscribed";
}

// Chemins de fichiers pour fallback persistant
const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");
const COOKIE_STATS_FILE = path.join(DATA_DIR, "cookie_stats.json");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");
const NEWSLETTER_FILE = path.join(DATA_DIR, "newsletter.json");

// Variable indiquant si l'auto-seed a déjà été tenté cette session
let hasSeededDb = false;

async function checkAndSeed() {
  if (!hasSeededDb && isDatabaseConfigured()) {
    hasSeededDb = true;
    try {
      await autoSeedDatabase(prisma);
    } catch (e) {
      console.warn("Notice: tentative autoSeedDatabase:", e);
    }
  }
}

// =============================================================================
// 1. UTILISATEURS (CRUD & AUTH)
// =============================================================================

export async function dbGetUsers(): Promise<AppUser[]> {
  if (isDatabaseConfigured()) {
    try {
      await checkAndSeed();
      const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });
      return users.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        passwordHash: u.passwordHash,
        role: u.role as "admin" | "client",
        company: u.company || undefined,
        phone: u.phone || undefined,
        createdAt: u.createdAt.toISOString(),
      }));
    } catch (err) {
      console.warn("DB Fallback: lecture users depuis stockage local:", err);
    }
  }

  return await readJsonStorage<AppUser[]>(USERS_FILE, INITIAL_REAL_USERS.map(u => ({ ...u, role: u.role as "admin" | "client", createdAt: new Date().toISOString() })));
}

export async function dbFindUserByEmail(email: string): Promise<AppUser | undefined> {
  const cleanEmail = email.trim().toLowerCase();
  if (isDatabaseConfigured()) {
    try {
      await checkAndSeed();
      const u = await prisma.user.findUnique({ where: { email: cleanEmail } });
      if (u) {
        return {
          id: u.id,
          name: u.name,
          email: u.email,
          passwordHash: u.passwordHash,
          role: u.role as "admin" | "client",
          company: u.company || undefined,
          phone: u.phone || undefined,
          createdAt: u.createdAt.toISOString(),
        };
      }
      return undefined;
    } catch (err) {
      console.warn("DB Fallback: findUserByEmail:", err);
    }
  }

  const users = await dbGetUsers();
  return users.find((u) => u.email.toLowerCase() === cleanEmail);
}

export async function dbFindUserById(id: string): Promise<AppUser | undefined> {
  if (isDatabaseConfigured()) {
    try {
      await checkAndSeed();
      const u = await prisma.user.findUnique({ where: { id } });
      if (u) {
        return {
          id: u.id,
          name: u.name,
          email: u.email,
          passwordHash: u.passwordHash,
          role: u.role as "admin" | "client",
          company: u.company || undefined,
          phone: u.phone || undefined,
          createdAt: u.createdAt.toISOString(),
        };
      }
      return undefined;
    } catch (err) {
      console.warn("DB Fallback: findUserById:", err);
    }
  }

  const users = await dbGetUsers();
  return users.find((u) => u.id === id);
}

export async function dbCreateUser(user: AppUser): Promise<AppUser> {
  if (isDatabaseConfigured()) {
    try {
      await checkAndSeed();
      const created = await prisma.user.create({
        data: {
          id: user.id,
          name: user.name,
          email: user.email.toLowerCase(),
          passwordHash: user.passwordHash,
          role: user.role,
          company: user.company,
          phone: user.phone,
        },
      });
      return {
        id: created.id,
        name: created.name,
        email: created.email,
        passwordHash: created.passwordHash,
        role: created.role as "admin" | "client",
        company: created.company || undefined,
        phone: created.phone || undefined,
        createdAt: created.createdAt.toISOString(),
      };
    } catch (err) {
      console.warn("DB Fallback: createUser:", err);
    }
  }

  const users = await readJsonStorage<AppUser[]>(USERS_FILE, []);
  users.push(user);
  await writeJsonStorage(USERS_FILE, users);
  return user;
}

export async function dbUpdateUser(userId: string, updates: Partial<AppUser>): Promise<AppUser | null> {
  if (isDatabaseConfigured()) {
    try {
      await checkAndSeed();
      const updated = await prisma.user.update({
        where: { id: userId },
        data: {
          name: updates.name,
          email: updates.email?.toLowerCase(),
          passwordHash: updates.passwordHash,
          company: updates.company,
          phone: updates.phone,
        },
      });
      return {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        passwordHash: updated.passwordHash,
        role: updated.role as "admin" | "client",
        company: updated.company || undefined,
        phone: updated.phone || undefined,
        createdAt: updated.createdAt.toISOString(),
      };
    } catch (err) {
      console.warn("DB Fallback: updateUser:", err);
    }
  }

  const users = await readJsonStorage<AppUser[]>(USERS_FILE, []);
  const idx = users.findIndex((u) => u.id === userId);
  if (idx < 0) return null;
  users[idx] = { ...users[idx], ...updates };
  await writeJsonStorage(USERS_FILE, users);
  return users[idx];
}

export async function dbDeleteUser(userId: string): Promise<boolean> {
  if (isDatabaseConfigured()) {
    try {
      await checkAndSeed();
      await prisma.user.delete({ where: { id: userId } });
      return true;
    } catch (err) {
      console.warn("DB Fallback: deleteUser:", err);
    }
  }

  const users = await readJsonStorage<AppUser[]>(USERS_FILE, []);
  const filtered = users.filter((u) => u.id !== userId);
  if (filtered.length === users.length) return false;
  await writeJsonStorage(USERS_FILE, filtered);
  return true;
}

// =============================================================================
// 2. PROJETS (CRUD COMPLET)
// =============================================================================

export async function dbGetProjects(user?: AppUser): Promise<ProjectRecord[]> {
  if (isDatabaseConfigured()) {
    try {
      await checkAndSeed();
      const whereClause =
        user && user.role === "client"
          ? {
              OR: [
                { clientId: user.id },
                { clientEmail: { equals: user.email, mode: "insensitive" as const } },
              ],
            }
          : {};

      const projects = await prisma.project.findMany({
        where: whereClause,
        include: {
          milestones: { orderBy: { createdAt: "asc" } },
          deliverables: { orderBy: { createdAt: "asc" } },
        },
        orderBy: { createdAt: "desc" },
      });

      return projects.map((p) => ({
        id: p.id,
        title: p.title,
        clientId: p.clientId || "usr_client",
        clientName: p.clientName,
        clientEmail: p.clientEmail,
        category: p.category,
        status: p.status as ProjectRecord["status"],
        progress: p.progress,
        budget: p.budget || undefined,
        paidAmount: p.paidAmount || undefined,
        startDate: p.startDate,
        targetDate: p.targetDate,
        milestones: p.milestones.map((m) => ({
          id: m.id,
          title: m.title,
          targetDate: m.targetDate,
          completed: m.completed,
        })),
        deliverables: p.deliverables.map((d) => ({
          id: d.id,
          title: d.title,
          url: d.url,
          type: d.type as ProjectDeliverable["type"],
        })),
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      }));
    } catch (err) {
      console.warn("DB Fallback: getProjects:", err);
    }
  }

  let projects = await readJsonStorage<ProjectRecord[]>(PROJECTS_FILE, INITIAL_REAL_PROJECTS.map(p => ({
    ...p,
    status: p.status as ProjectRecord["status"],
    deliverables: p.deliverables.map(d => ({ ...d, type: d.type as ProjectDeliverable["type"] })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })));

  if (user && user.role === "client") {
    projects = projects.filter(
      (p) => p.clientId === user.id || p.clientEmail.toLowerCase() === user.email.toLowerCase()
    );
  }

  return projects;
}

export async function dbFindProjectById(id: string): Promise<ProjectRecord | undefined> {
  const all = await dbGetProjects();
  return all.find((p) => p.id === id);
}

export type SaveProjectInput = Partial<ProjectRecord> & {
  title: string;
  clientName: string;
  clientEmail: string;
};

export async function dbSaveProject(data: SaveProjectInput): Promise<ProjectRecord> {
  const project: ProjectRecord = {
    id: data.id || `prj_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    title: data.title,
    clientId: data.clientId || "usr_client",
    clientName: data.clientName,
    clientEmail: data.clientEmail.toLowerCase(),
    category: data.category || "Site Vitrine",
    status: data.status || "cadrage",
    progress: typeof data.progress === "number" ? data.progress : 15,
    budget: data.budget || "À définir",
    paidAmount: data.paidAmount || "0 FCFA",
    startDate: data.startDate || new Date().toISOString().split("T")[0],
    targetDate: data.targetDate || "À définir",
    milestones: data.milestones || [
      { id: "m1", title: "Cadrage initial", targetDate: "À définir", completed: true },
      { id: "m2", title: "Maquettes Figma", targetDate: "À définir", completed: false },
      { id: "m3", title: "Développement", targetDate: "À définir", completed: false },
      { id: "m4", title: "Livraison finale", targetDate: "À définir", completed: false },
    ],
    deliverables: data.deliverables || [],
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (isDatabaseConfigured()) {
    try {
      await checkAndSeed();
      const upserted = await prisma.project.upsert({
        where: { id: project.id },
        update: {
          title: project.title,
          clientName: project.clientName,
          clientEmail: project.clientEmail.toLowerCase(),
          category: project.category,
          status: project.status,
          progress: project.progress,
          budget: project.budget,
          paidAmount: project.paidAmount,
          startDate: project.startDate,
          targetDate: project.targetDate,
        },
        create: {
          id: project.id,
          title: project.title,
          clientId: project.clientId,
          clientName: project.clientName,
          clientEmail: project.clientEmail.toLowerCase(),
          category: project.category,
          status: project.status,
          progress: project.progress,
          budget: project.budget,
          paidAmount: project.paidAmount,
          startDate: project.startDate,
          targetDate: project.targetDate,
        },
        include: { milestones: true, deliverables: true },
      });

      // Synchroniser les jalons
      if (project.milestones && project.milestones.length > 0) {
        for (const m of project.milestones) {
          await prisma.projectMilestone.upsert({
            where: { id: m.id },
            update: { title: m.title, targetDate: m.targetDate, completed: m.completed },
            create: { id: m.id, projectId: upserted.id, title: m.title, targetDate: m.targetDate, completed: m.completed },
          });
        }
      }

      return project;
    } catch (err) {
      console.warn("DB Fallback: saveProject:", err);
    }
  }

  const projects = await readJsonStorage<ProjectRecord[]>(PROJECTS_FILE, []);
  const idx = projects.findIndex((p) => p.id === project.id);
  if (idx >= 0) {
    projects[idx] = { ...projects[idx], ...project, updatedAt: new Date().toISOString() };
  } else {
    projects.unshift(project);
  }
  await writeJsonStorage(PROJECTS_FILE, projects);
  return project;
}

export async function dbUpdateProject(id: string, updates: Partial<ProjectRecord>): Promise<ProjectRecord | null> {
  if (isDatabaseConfigured()) {
    try {
      await checkAndSeed();
      const updated = await prisma.project.update({
        where: { id },
        data: {
          title: updates.title,
          clientName: updates.clientName,
          clientEmail: updates.clientEmail?.toLowerCase(),
          category: updates.category,
          status: updates.status,
          progress: updates.progress,
          budget: updates.budget,
          paidAmount: updates.paidAmount,
          startDate: updates.startDate,
          targetDate: updates.targetDate,
        },
      });

      // Mettre à jour les jalons si fournis
      if (updates.milestones) {
        for (const m of updates.milestones) {
          await prisma.projectMilestone.upsert({
            where: { id: m.id },
            update: { completed: m.completed, title: m.title, targetDate: m.targetDate },
            create: { id: m.id, projectId: id, title: m.title, targetDate: m.targetDate, completed: m.completed },
          });
        }
      }

      const fresh = await dbFindProjectById(id);
      return fresh || null;
    } catch (err) {
      console.warn("DB Fallback: updateProject:", err);
    }
  }

  const projects = await readJsonStorage<ProjectRecord[]>(PROJECTS_FILE, []);
  const idx = projects.findIndex((p) => p.id === id);
  if (idx < 0) return null;
  projects[idx] = { ...projects[idx], ...updates, updatedAt: new Date().toISOString() };
  await writeJsonStorage(PROJECTS_FILE, projects);
  return projects[idx];
}

export async function dbDeleteProject(id: string): Promise<boolean> {
  if (isDatabaseConfigured()) {
    try {
      await checkAndSeed();
      await prisma.project.delete({ where: { id } });
      return true;
    } catch (err) {
      console.warn("DB Fallback: deleteProject:", err);
    }
  }

  const projects = await readJsonStorage<ProjectRecord[]>(PROJECTS_FILE, []);
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) return false;
  await writeJsonStorage(PROJECTS_FILE, filtered);
  return true;
}

// =============================================================================
// 3. MESSAGERIE DIRECTE (CRUD)
// =============================================================================

export async function dbGetMessages(projectId?: string): Promise<MessageRecord[]> {
  if (isDatabaseConfigured()) {
    try {
      await checkAndSeed();
      const where = projectId ? { projectId } : {};
      const msgs = await prisma.message.findMany({
        where,
        orderBy: { createdAt: "asc" },
      });
      return msgs.map((m) => ({
        id: m.id,
        projectId: m.projectId,
        senderId: m.senderId || "usr_anonymous",
        senderName: m.senderName,
        senderRole: m.senderRole as "admin" | "client",
        content: m.content,
        createdAt: m.createdAt.toISOString(),
        read: m.read,
      }));
    } catch (err) {
      console.warn("DB Fallback: getMessages:", err);
    }
  }

  const msgs = await readJsonStorage<MessageRecord[]>(MESSAGES_FILE, INITIAL_REAL_MESSAGES.map(m => ({
    ...m,
    senderRole: m.senderRole as "admin" | "client",
    createdAt: new Date().toISOString(),
  })));

  if (projectId) {
    return msgs.filter((m) => m.projectId === projectId);
  }
  return msgs;
}

export interface SendMessageInput {
  id?: string;
  projectId: string;
  senderId: string;
  senderName: string;
  senderRole: "admin" | "client";
  content: string;
  createdAt?: string;
  read?: boolean;
}

export async function dbSendMessage(data: SendMessageInput): Promise<MessageRecord> {
  const message: MessageRecord = {
    id: data.id || `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    projectId: data.projectId,
    senderId: data.senderId,
    senderName: data.senderName,
    senderRole: data.senderRole,
    content: data.content.trim(),
    createdAt: data.createdAt || new Date().toISOString(),
    read: Boolean(data.read),
  };

  if (isDatabaseConfigured()) {
    try {
      await checkAndSeed();
      const created = await prisma.message.create({
        data: {
          id: message.id,
          projectId: message.projectId,
          senderId: message.senderId,
          senderName: message.senderName,
          senderRole: message.senderRole,
          content: message.content,
          read: message.read,
        },
      });
      return {
        id: created.id,
        projectId: created.projectId,
        senderId: created.senderId || "usr_anonymous",
        senderName: created.senderName,
        senderRole: created.senderRole as "admin" | "client",
        content: created.content,
        createdAt: created.createdAt.toISOString(),
        read: created.read,
      };
    } catch (err) {
      console.warn("DB Fallback: sendMessage:", err);
    }
  }

  const msgs = await readJsonStorage<MessageRecord[]>(MESSAGES_FILE, []);
  msgs.push(message);
  await writeJsonStorage(MESSAGES_FILE, msgs);
  return message;
}

export async function dbDeleteMessage(id: string): Promise<boolean> {
  if (isDatabaseConfigured()) {
    try {
      await checkAndSeed();
      await prisma.message.delete({ where: { id } });
      return true;
    } catch (err) {
      console.warn("DB Fallback: deleteMessage:", err);
    }
  }

  const msgs = await readJsonStorage<MessageRecord[]>(MESSAGES_FILE, []);
  const filtered = msgs.filter((m) => m.id !== id);
  if (filtered.length === msgs.length) return false;
  await writeJsonStorage(MESSAGES_FILE, filtered);
  return true;
}

// =============================================================================
// 4. CRM : DEMANDES DE CONTACT & NEWSLETTER (CRUD)
// =============================================================================

export async function dbGetInquiries(): Promise<InquiryRecord[]> {
  if (isDatabaseConfigured()) {
    try {
      await checkAndSeed();
      const list = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
      return list.map((i) => ({
        id: i.id,
        name: i.name,
        email: i.email,
        phone: i.phone || undefined,
        projectType: i.projectType || undefined,
        budget: i.budget || undefined,
        message: i.message,
        status: i.status as InquiryRecord["status"],
        createdAt: i.createdAt.toISOString(),
      }));
    } catch (err) {
      console.warn("DB Fallback: getInquiries:", err);
    }
  }

  return await readJsonStorage<InquiryRecord[]>(INQUIRIES_FILE, []);
}

export async function dbSaveInquiry(inquiry: InquiryRecord): Promise<InquiryRecord> {
  if (isDatabaseConfigured()) {
    try {
      await checkAndSeed();
      const created = await prisma.inquiry.create({
        data: {
          id: inquiry.id,
          name: inquiry.name,
          email: inquiry.email.toLowerCase(),
          phone: inquiry.phone,
          projectType: inquiry.projectType,
          budget: inquiry.budget,
          message: inquiry.message,
          status: inquiry.status,
        },
      });
      return {
        id: created.id,
        name: created.name,
        email: created.email,
        phone: created.phone || undefined,
        projectType: created.projectType || undefined,
        budget: created.budget || undefined,
        message: created.message,
        status: created.status as InquiryRecord["status"],
        createdAt: created.createdAt.toISOString(),
      };
    } catch (err) {
      console.warn("DB Fallback: saveInquiry:", err);
    }
  }

  const list = await readJsonStorage<InquiryRecord[]>(INQUIRIES_FILE, []);
  list.unshift(inquiry);
  await writeJsonStorage(INQUIRIES_FILE, list);
  return inquiry;
}

export async function dbUpdateInquiryStatus(id: string, status: InquiryRecord["status"]): Promise<InquiryRecord | null> {
  if (isDatabaseConfigured()) {
    try {
      await checkAndSeed();
      const updated = await prisma.inquiry.update({
        where: { id },
        data: { status },
      });
      return {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        phone: updated.phone || undefined,
        projectType: updated.projectType || undefined,
        budget: updated.budget || undefined,
        message: updated.message,
        status: updated.status as InquiryRecord["status"],
        createdAt: updated.createdAt.toISOString(),
      };
    } catch (err) {
      console.warn("DB Fallback: updateInquiryStatus:", err);
    }
  }

  const list = await readJsonStorage<InquiryRecord[]>(INQUIRIES_FILE, []);
  const idx = list.findIndex((i) => i.id === id);
  if (idx < 0) return null;
  list[idx].status = status;
  await writeJsonStorage(INQUIRIES_FILE, list);
  return list[idx];
}

export async function dbDeleteInquiry(id: string): Promise<boolean> {
  if (isDatabaseConfigured()) {
    try {
      await checkAndSeed();
      await prisma.inquiry.delete({ where: { id } });
      return true;
    } catch (err) {
      console.warn("DB Fallback: deleteInquiry:", err);
    }
  }

  const list = await readJsonStorage<InquiryRecord[]>(INQUIRIES_FILE, []);
  const filtered = list.filter((i) => i.id !== id);
  if (filtered.length === list.length) return false;
  await writeJsonStorage(INQUIRIES_FILE, filtered);
  return true;
}

export async function dbGetNewsletterSubscribers(): Promise<NewsletterRecord[]> {
  if (isDatabaseConfigured()) {
    try {
      await checkAndSeed();
      const subs = await prisma.newsletterSubscriber.findMany({ orderBy: { subscribedAt: "desc" } });
      return subs.map((s) => ({
        id: s.id,
        email: s.email,
        status: s.status as NewsletterRecord["status"],
        subscribedAt: s.subscribedAt.toISOString(),
      }));
    } catch (err) {
      console.warn("DB Fallback: getNewsletterSubscribers:", err);
    }
  }

  return await readJsonStorage<NewsletterRecord[]>(NEWSLETTER_FILE, []);
}

export async function dbSaveNewsletterSubscriber(record: NewsletterRecord): Promise<NewsletterRecord> {
  if (isDatabaseConfigured()) {
    try {
      await checkAndSeed();
      const upserted = await prisma.newsletterSubscriber.upsert({
        where: { email: record.email.toLowerCase() },
        update: { status: record.status },
        create: { id: record.id, email: record.email.toLowerCase(), status: record.status },
      });
      return {
        id: upserted.id,
        email: upserted.email,
        status: upserted.status as NewsletterRecord["status"],
        subscribedAt: upserted.subscribedAt.toISOString(),
      };
    } catch (err) {
      console.warn("DB Fallback: saveNewsletterSubscriber:", err);
    }
  }

  const subs = await readJsonStorage<NewsletterRecord[]>(NEWSLETTER_FILE, []);
  const existing = subs.find((s) => s.email.toLowerCase() === record.email.toLowerCase());
  if (!existing) {
    subs.unshift(record);
    await writeJsonStorage(NEWSLETTER_FILE, subs);
  }
  return record;
}

export async function dbDeleteNewsletterSubscriber(idOrEmail: string): Promise<boolean> {
  if (isDatabaseConfigured()) {
    try {
      await checkAndSeed();
      await prisma.newsletterSubscriber.deleteMany({
        where: { OR: [{ id: idOrEmail }, { email: idOrEmail.toLowerCase() }] },
      });
      return true;
    } catch (err) {
      console.warn("DB Fallback: deleteNewsletterSubscriber:", err);
    }
  }

  const subs = await readJsonStorage<NewsletterRecord[]>(NEWSLETTER_FILE, []);
  const filtered = subs.filter((s) => s.id !== idOrEmail && s.email.toLowerCase() !== idOrEmail.toLowerCase());
  if (filtered.length === subs.length) return false;
  await writeJsonStorage(NEWSLETTER_FILE, filtered);
  return true;
}

// =============================================================================
// 5. RGPD & CONSENTEMENT COOKIES (CRUD)
// =============================================================================

export interface CookieConsentInput {
  id?: string;
  choice: "accepted_all" | "refused_all" | "customized";
  analytics: boolean;
  experience: boolean;
  ip?: string;
  country?: string;
  month?: string;
  userAgent?: string;
  timestamp?: string;
}

export async function dbLogCookieConsent(data: CookieConsentInput): Promise<void> {
  const now = new Date();
  const id = data.id || `ck_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const timestamp = data.timestamp || now.toISOString();
  const month = data.month || timestamp.slice(0, 7);

  const entry: CookieConsentLog = {
    id,
    choice: data.choice,
    analytics: data.analytics,
    experience: data.experience,
    ip: data.ip,
    country: data.country,
    month,
    userAgent: data.userAgent,
    timestamp,
  };

  if (isDatabaseConfigured()) {
    try {
      await prisma.cookieConsentLog.create({
        data: {
          id: entry.id,
          choice: entry.choice,
          analytics: entry.analytics,
          experience: entry.experience,
          ip: entry.ip,
          country: entry.country,
          month: entry.month,
          userAgent: entry.userAgent,
        },
      });
      return;
    } catch (err) {
      console.warn("DB Fallback: logCookieConsent:", err);
    }
  }

  const logs = await readJsonStorage<CookieConsentLog[]>(COOKIE_STATS_FILE, []);
  logs.unshift(entry);
  if (logs.length > 2000) logs.length = 2000;
  await writeJsonStorage(COOKIE_STATS_FILE, logs);
}

export async function dbGetCookieStats(monthFilter?: string) {
  let logs: CookieConsentLog[] = [];
  if (isDatabaseConfigured()) {
    try {
      const dbLogs = await prisma.cookieConsentLog.findMany({
        orderBy: { timestamp: "desc" },
        take: 2000,
      });
      logs = dbLogs.map((l) => ({
        id: l.id,
        choice: l.choice as CookieConsentLog["choice"],
        analytics: l.analytics,
        experience: l.experience,
        ip: l.ip || undefined,
        country: l.country || undefined,
        month: l.month || undefined,
        userAgent: l.userAgent || undefined,
        timestamp: l.timestamp.toISOString(),
      }));
    } catch (err) {
      console.warn("DB Fallback: getCookieStats:", err);
      logs = await readJsonStorage<CookieConsentLog[]>(COOKIE_STATS_FILE, []);
    }
  } else {
    logs = await readJsonStorage<CookieConsentLog[]>(COOKIE_STATS_FILE, []);
  }

  const monthsSet = new Set<string>();
  logs.forEach((l) => {
    const m = l.month || (l.timestamp ? l.timestamp.slice(0, 7) : new Date().toISOString().slice(0, 7));
    monthsSet.add(m);
  });
  if (monthsSet.size === 0) {
    monthsSet.add(new Date().toISOString().slice(0, 7));
  }
  const availableMonths = Array.from(monthsSet).sort().reverse();

  let filtered = logs;
  if (monthFilter && monthFilter !== "all") {
    filtered = logs.filter((l) => {
      const m = l.month || l.timestamp?.slice(0, 7);
      return m === monthFilter;
    });
  }

  const total = filtered.length;
  const acceptedAll = filtered.filter((l) => l.choice === "accepted_all").length;
  const refusedAll = filtered.filter((l) => l.choice === "refused_all").length;
  const customized = filtered.filter((l) => l.choice === "customized").length;
  const withAnalytics = filtered.filter((l) => l.analytics).length;

  return {
    total,
    acceptedAll,
    refusedAll,
    customized,
    analyticsRate: total > 0 ? Math.round((withAnalytics / total) * 100) : 0,
    availableMonths,
    recentLogs: filtered.slice(0, 200),
  };
}

export async function dbClearCookieConsentLogs(): Promise<boolean> {
  if (isDatabaseConfigured()) {
    try {
      await prisma.cookieConsentLog.deleteMany({});
      return true;
    } catch (err) {
      console.warn("DB Fallback: clearCookieConsentLogs:", err);
    }
  }

  await writeJsonStorage(COOKIE_STATS_FILE, []);
  return true;
}
