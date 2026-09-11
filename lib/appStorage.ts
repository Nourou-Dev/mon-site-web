import {
  hashPassword,
  encodeSession,
  decodeSession,
  touchSession,
  ADMIN_SESSION_COOKIE,
  CLIENT_SESSION_COOKIE,
  LEGACY_SESSION_COOKIE,
} from "./authUtils";

import {
  dbGetUsers,
  dbFindUserByEmail,
  dbFindUserById,
  dbCreateUser,
  dbUpdateUser,
  dbDeleteUser,
  dbGetProjects,
  dbFindProjectById,
  dbSaveProject,
  dbUpdateProject,
  dbDeleteProject,
  dbGetMessages,
  dbSendMessage,
  dbDeleteMessage,
  dbLogCookieConsent,
  dbGetCookieStats,
  dbClearCookieConsentLogs,
  AppUser,
  ProjectRecord,
  ProjectMilestone,
  ProjectDeliverable,
  MessageRecord,
  CookieConsentLog,
} from "./db";

export {
  hashPassword,
  encodeSession,
  decodeSession,
  touchSession,
  ADMIN_SESSION_COOKIE,
  CLIENT_SESSION_COOKIE,
  LEGACY_SESSION_COOKIE,
};

export type UserRole = "admin" | "client";
export type ProjectStatus = "cadrage" | "design" | "developpement" | "recette" | "en_ligne";
export type { AppUser, ProjectRecord, ProjectMilestone, ProjectDeliverable, MessageRecord, CookieConsentLog };

// ==========================================
// 1. GESTION DES UTILISATEURS (AUTH & CRUD)
// ==========================================

export const getUsers = dbGetUsers;
export const findUserByEmail = dbFindUserByEmail;
export const findUserById = dbFindUserById;
export const updateUser = dbUpdateUser;
export const deleteUser = dbDeleteUser;

export async function registerClientUser(data: {
  name: string;
  email: string;
  password: string;
  company?: string;
  phone?: string;
}): Promise<AppUser> {
  const existing = await dbFindUserByEmail(data.email);
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

  await dbCreateUser(newUser);

  // Initialisation automatique du projet et du canal de messagerie du client
  try {
    const projId = `prj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newProject: ProjectRecord = {
      id: projId,
      title: newUser.company ? `Projet Digital - ${newUser.company}` : `Projet Web - ${newUser.name}`,
      clientId: newUser.id,
      clientName: newUser.name,
      clientEmail: newUser.email,
      category: "Site Web & Stratégie Digitale",
      status: "cadrage",
      progress: 15,
      budget: "À définir",
      paidAmount: "0 FCFA",
      startDate: new Date().toISOString().split("T")[0],
      targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      milestones: [
        { id: "m1", title: "Cadrage initial des besoins & Objectifs", targetDate: new Date().toISOString().split("T")[0], completed: true },
        { id: "m2", title: "Création des maquettes graphiques & UX", targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], completed: false },
        { id: "m3", title: "Développement Front-End & Intégration", targetDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], completed: false },
        { id: "m4", title: "Recette, Sécurité & Tests Mobile", targetDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], completed: false },
        { id: "m5", title: "Mise en ligne & Accompagnement", targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], completed: false },
      ],
      deliverables: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await dbSaveProject(newProject);

    await dbSendMessage({
      id: `msg_${Date.now()}_welcome`,
      projectId: projId,
      senderId: "usr_admin_nourou",
      senderName: "Nourou Dine AMANDOU",
      senderRole: "admin",
      content: `Bienvenue sur votre espace sécurisé, ${newUser.name} ! Je suis ravi de collaborer avec vous. Posez-moi vos questions ou partagez vos remarques directement ici.`,
      createdAt: new Date().toISOString(),
      read: false,
    });
  } catch (err) {
    console.warn("Notice: initialisation projet client différée:", err);
  }

  return newUser;
}

// ==========================================
// 2. GESTION DES PROJETS & JALONS (CRUD)
// ==========================================

export const getProjects = dbGetProjects;
export const findProjectById = dbFindProjectById;
export const saveProject = dbSaveProject;
export const updateProject = dbUpdateProject;
export const deleteProject = dbDeleteProject;

// ==========================================
// 3. MESSAGERIE DIRECTE PROJETS (CRUD)
// ==========================================

export const getMessages = dbGetMessages;
export const sendMessage = dbSendMessage;
export const deleteMessage = dbDeleteMessage;

// ==========================================
// 4. RGPD & CONSENTEMENT COOKIES (CRUD)
// ==========================================

export const logCookieConsent = dbLogCookieConsent;
export const getCookieStats = dbGetCookieStats;
export const clearCookieConsentLogs = dbClearCookieConsentLogs;
