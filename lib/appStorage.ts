import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { hashPassword, encodeSession, decodeSession, touchSession } from "./authUtils";

export { hashPassword, encodeSession, decodeSession, touchSession };

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");
const COOKIE_STATS_FILE = path.join(DATA_DIR, "cookie_stats.json");

// ==========================================
// 1. TYPES & INTERFACES
// ==========================================

export type UserRole = "admin" | "client";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  company?: string;
  phone?: string;
  createdAt: string;
}

export type ProjectStatus =
  | "cadrage"
  | "design"
  | "developpement"
  | "recette"
  | "en_ligne";

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
  status: ProjectStatus;
  progress: number; // 0 to 100
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
  senderRole: UserRole;
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
  month?: string; // Format YYYY-MM
  country?: string;
  userAgent?: string;
  timestamp: string;
}

// ==========================================
// 2. UTILITAIRES DE STOCKAGE SÉCURISÉ
// ==========================================

async function ensureDataDir(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {}
}

async function readJson<T>(filePath: string, defaultValue: T): Promise<T> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as T;
  } catch {
    return defaultValue;
  }
}

async function writeJson<T>(filePath: string, data: T): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// ==========================================
// 3. GESTION DES UTILISATEURS (AUTH)
// ==========================================

export async function getUsers(): Promise<AppUser[]> {
  const users = await readJson<AppUser[]>(USERS_FILE, []);

  // Création automatique de l'administrateur si inexistant
  if (!users.some((u) => u.role === "admin")) {
    const defaultAdmin: AppUser = {
      id: "usr_admin_nourou",
      name: "Nourou Dine AMANDOU",
      email: "contact@nouroudineamandou.com",
      passwordHash: hashPassword("admin123!"),
      role: "admin",
      company: "Studio Webdesign",
      phone: "+229 01 00 00 00",
      createdAt: new Date().toISOString(),
    };
    users.unshift(defaultAdmin);
    await writeJson(USERS_FILE, users);
  }

  return users;
}

export async function findUserByEmail(email: string): Promise<AppUser | undefined> {
  const users = await getUsers();
  return users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
}

export async function findUserById(id: string): Promise<AppUser | undefined> {
  const users = await getUsers();
  return users.find((u) => u.id === id);
}

export async function registerClientUser(data: {
  name: string;
  email: string;
  password: string;
  company?: string;
  phone?: string;
}): Promise<AppUser> {
  const users = await getUsers();
  const existing = await findUserByEmail(data.email);
  if (existing) {
    throw new Error("Un compte existe déjà avec cette adresse e-mail.");
  }

  const newUser: AppUser = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    passwordHash: hashPassword(data.password),
    role: "client",
    company: data.company ? data.company.trim() : "",
    phone: data.phone ? data.phone.trim() : "",
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await writeJson(USERS_FILE, users);
  return newUser;
}

export async function updateUser(userId: string, updates: Partial<AppUser>): Promise<AppUser | null> {
  const users = await getUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx < 0) return null;

  users[idx] = {
    ...users[idx],
    ...updates,
  };

  await writeJson(USERS_FILE, users);
  return users[idx];
}

// ==========================================
// 4. GESTION DES PROJETS & JALONS
// ==========================================

export async function getProjects(user?: AppUser): Promise<ProjectRecord[]> {
  const projects = await readJson<ProjectRecord[]>(PROJECTS_FILE, []);

  // Démonstration initiale avec un projet actif si la liste est vide
  if (projects.length === 0) {
    const initialProject: ProjectRecord = {
      id: "prj_demo_1",
      title: "Refonte Site Web & Catalogue Interactif",
      clientId: "usr_client_demo",
      clientName: "Clinique Santé Plus",
      clientEmail: "direction@cliniquesanteplus.com",
      category: "Site Vitrine & Système de Devis",
      status: "developpement",
      progress: 65,
      budget: "450 000 FCFA",
      paidAmount: "300 000 FCFA",
      startDate: "2026-09-01",
      targetDate: "2026-09-28",
      milestones: [
        { id: "m1", title: "Cadrage & Stratégie de Marque", targetDate: "2026-09-05", completed: true },
        { id: "m2", title: "Maquettes Graphiques & Validation UX", targetDate: "2026-09-12", completed: true },
        { id: "m3", title: "Développement Front-End & Intégration", targetDate: "2026-09-20", completed: false },
        { id: "m4", title: "Recette, Sécurité & Tests Mobile", targetDate: "2026-09-25", completed: false },
        { id: "m5", title: "Mise en Ligne & Formation Équipe", targetDate: "2026-09-28", completed: false },
      ],
      deliverables: [
        { id: "d1", title: "Maquettes UI Figma", url: "https://figma.com", type: "figma" },
        { id: "d2", title: "Aperçu de Pré-production", url: "https://staging.exemple.com", type: "preview" },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    projects.push(initialProject);
    await writeJson(PROJECTS_FILE, projects);
  }

  // Filtrage : si client, ne renvoyer que ses projets
  if (user && user.role === "client") {
    return projects.filter(
      (p) => p.clientId === user.id || p.clientEmail.toLowerCase() === user.email.toLowerCase()
    );
  }

  return projects;
}

export async function saveProject(projectData: Partial<ProjectRecord> & { title: string; clientName: string; clientEmail: string }): Promise<ProjectRecord> {
  const projects = await getProjects();

  const newProject: ProjectRecord = {
    id: projectData.id || `prj_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    title: projectData.title,
    clientId: projectData.clientId || "usr_client",
    clientName: projectData.clientName,
    clientEmail: projectData.clientEmail.toLowerCase(),
    category: projectData.category || "Site Vitrine",
    status: projectData.status || "cadrage",
    progress: typeof projectData.progress === "number" ? projectData.progress : 15,
    budget: projectData.budget || "À définir",
    paidAmount: projectData.paidAmount || "0 FCFA",
    startDate: projectData.startDate || new Date().toISOString().split("T")[0],
    targetDate: projectData.targetDate || "À définir",
    milestones: projectData.milestones || [
      { id: "m1", title: "Cadrage initial", targetDate: "À définir", completed: true },
      { id: "m2", title: "Maquettes Figma", targetDate: "À définir", completed: false },
      { id: "m3", title: "Développement", targetDate: "À définir", completed: false },
      { id: "m4", title: "Livraison finale", targetDate: "À définir", completed: false },
    ],
    deliverables: projectData.deliverables || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const existingIdx = projects.findIndex((p) => p.id === newProject.id);
  if (existingIdx >= 0) {
    projects[existingIdx] = { ...projects[existingIdx], ...newProject, updatedAt: new Date().toISOString() };
  } else {
    projects.unshift(newProject);
  }

  await writeJson(PROJECTS_FILE, projects);
  return newProject;
}

export async function updateProject(id: string, updates: Partial<ProjectRecord>): Promise<ProjectRecord | null> {
  const projects = await getProjects();
  const idx = projects.findIndex((p) => p.id === id);
  if (idx < 0) return null;

  projects[idx] = {
    ...projects[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  await writeJson(PROJECTS_FILE, projects);
  return projects[idx];
}

// ==========================================
// 5. MESSAGERIE DIRECTE PROJETS
// ==========================================

export async function getMessages(projectId?: string): Promise<MessageRecord[]> {
  const messages = await readJson<MessageRecord[]>(MESSAGES_FILE, []);

  // Démo initiale si aucun message
  if (messages.length === 0) {
    const demoMessages: MessageRecord[] = [
      {
        id: "msg_1",
        projectId: "prj_demo_1",
        senderId: "usr_client_demo",
        senderName: "Clinique Santé Plus",
        senderRole: "client",
        content: "Bonjour Nourou, nous avons bien examiné les maquettes Figma, les retours de l'équipe médicale sont très positifs !",
        createdAt: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
        read: true,
      },
      {
        id: "msg_2",
        projectId: "prj_demo_1",
        senderId: "usr_admin_nourou",
        senderName: "Nourou Dine AMANDOU",
        senderRole: "admin",
        content: "Parfait ! J'ai intégré les derniers ajustements de typographie et j'attaque le développement responsive avec le module de prise de rendez-vous en ligne.",
        createdAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
        read: true,
      },
    ];
    await writeJson(MESSAGES_FILE, demoMessages);
    return projectId ? demoMessages.filter((m) => m.projectId === projectId) : demoMessages;
  }

  if (projectId) {
    return messages.filter((m) => m.projectId === projectId);
  }
  return messages;
}

export async function sendMessage(data: {
  projectId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  content: string;
}): Promise<MessageRecord> {
  const messages = await getMessages();

  const newMsg: MessageRecord = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    projectId: data.projectId,
    senderId: data.senderId,
    senderName: data.senderName,
    senderRole: data.senderRole,
    content: data.content.trim(),
    createdAt: new Date().toISOString(),
    read: false,
  };

  messages.push(newMsg);
  await writeJson(MESSAGES_FILE, messages);
  return newMsg;
}

// ==========================================
// 6. STATISTIQUES DES COOKIES (RGPD)
// ==========================================

export async function logCookieConsent(data: {
  choice: "accepted_all" | "refused_all" | "customized";
  analytics: boolean;
  experience: boolean;
  ip?: string;
  country?: string;
  userAgent?: string;
}): Promise<void> {
  const logs = await readJson<CookieConsentLog[]>(COOKIE_STATS_FILE, []);
  const now = new Date();
  const month = now.toISOString().slice(0, 7); // Format "YYYY-MM"

  const entry: CookieConsentLog = {
    id: `ck_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    choice: data.choice,
    analytics: data.analytics,
    experience: data.experience,
    ip: data.ip || "127.0.0.1",
    country: data.country || "Non déterminé",
    month,
    userAgent: data.userAgent?.slice(0, 200) || "",
    timestamp: now.toISOString(),
  };

  logs.unshift(entry);
  // Conserver les 2000 derniers événements
  if (logs.length > 2000) logs.length = 2000;

  await writeJson(COOKIE_STATS_FILE, logs);
}

export async function getCookieStats(monthFilter?: string): Promise<{
  total: number;
  acceptedAll: number;
  refusedAll: number;
  customized: number;
  analyticsRate: number;
  availableMonths: string[];
  recentLogs: CookieConsentLog[];
}> {
  let logs = await readJson<CookieConsentLog[]>(COOKIE_STATS_FILE, []);

  // Mois disponibles dans l'historique
  const monthsSet = new Set<string>();
  logs.forEach((l) => {
    const m = l.month || (l.timestamp ? l.timestamp.slice(0, 7) : new Date().toISOString().slice(0, 7));
    monthsSet.add(m);
  });
  if (monthsSet.size === 0) {
    monthsSet.add(new Date().toISOString().slice(0, 7));
  }
  const availableMonths = Array.from(monthsSet).sort().reverse();

  // Filtrer par mois si spécifié
  if (monthFilter && monthFilter !== "all") {
    logs = logs.filter((l) => {
      const m = l.month || l.timestamp?.slice(0, 7);
      return m === monthFilter;
    });
  }

  const total = logs.length;
  const acceptedAll = logs.filter((l) => l.choice === "accepted_all").length;
  const refusedAll = logs.filter((l) => l.choice === "refused_all").length;
  const customized = logs.filter((l) => l.choice === "customized").length;
  const withAnalytics = logs.filter((l) => l.analytics).length;

  return {
    total,
    acceptedAll,
    refusedAll,
    customized,
    analyticsRate: total > 0 ? Math.round((withAnalytics / total) * 100) : 0,
    availableMonths,
    recentLogs: logs.slice(0, 200), // Renvoyer jusqu'à 200 logs
  };
}
