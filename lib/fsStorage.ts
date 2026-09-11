import fs from "fs/promises";
import path from "path";

// Répertoire inscriptible garanti en environnement Serverless (Vercel / AWS Lambda)
const TMP_DATA_DIR = path.join("/tmp", "nd_site_data");

declare global {
  // eslint-disable-next-line no-var
  var __ND_APP_STORAGE_CACHE: Record<string, any> | undefined;
}

if (!globalThis.__ND_APP_STORAGE_CACHE) {
  globalThis.__ND_APP_STORAGE_CACHE = {};
}

async function ensureDir(dirPath: string): Promise<void> {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch {}
}

/**
 * Lecture sécurisée avec triple-niveau de cache :
 * 1. Mémoire vive globale du conteneur (instantané et préservé entre invocations)
 * 2. Dossier inscriptible /tmp/nd_site_data (sauvegardes Vercel Serverless)
 * 3. Fichier statique initial packagé dans le bundle (/var/task/data ou ./data)
 */
export async function readJsonStorage<T>(filePath: string, defaultValue: T): Promise<T> {
  const fileName = path.basename(filePath);

  // 1. Cache mémoire global du conteneur
  if (globalThis.__ND_APP_STORAGE_CACHE && globalThis.__ND_APP_STORAGE_CACHE[fileName] !== undefined) {
    return globalThis.__ND_APP_STORAGE_CACHE[fileName] as T;
  }

  // 2. Tenter de lire depuis /tmp (données persistées lors de précédentes écritures sur Vercel)
  const tmpPath = path.join(TMP_DATA_DIR, fileName);
  try {
    const tmpData = await fs.readFile(tmpPath, "utf-8");
    const parsed = JSON.parse(tmpData) as T;
    if (globalThis.__ND_APP_STORAGE_CACHE) {
      globalThis.__ND_APP_STORAGE_CACHE[fileName] = parsed;
    }
    return parsed;
  } catch {}

  // 3. Lire le fichier initial packagé avec le code (process.cwd()/data/<fileName>)
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(data) as T;
    if (globalThis.__ND_APP_STORAGE_CACHE) {
      globalThis.__ND_APP_STORAGE_CACHE[fileName] = parsed;
    }
    return parsed;
  } catch {
    // 4. Valeur par défaut si introuvable
    if (globalThis.__ND_APP_STORAGE_CACHE) {
      globalThis.__ND_APP_STORAGE_CACHE[fileName] = defaultValue;
    }
    return defaultValue;
  }
}

/**
 * Écriture sécurisée et résiliente aux contraintes de lecture seule Vercel :
 * - Met à jour le cache mémoire sans bloquer
 * - Tente d'écrire localement dans ./data (mode développement)
 * - Si échec (EROFS en production Vercel Serverless), écrit dans /tmp/nd_site_data sans jamais crasher
 */
export async function writeJsonStorage<T>(filePath: string, data: T): Promise<void> {
  const fileName = path.basename(filePath);

  // Toujours mettre à jour le cache mémoire en priorité absolue
  if (!globalThis.__ND_APP_STORAGE_CACHE) {
    globalThis.__ND_APP_STORAGE_CACHE = {};
  }
  globalThis.__ND_APP_STORAGE_CACHE[fileName] = data;

  const jsonStr = JSON.stringify(data, null, 2);

  // 1. Tenter l'écriture dans le dossier projet local (développement local)
  try {
    await ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, jsonStr, "utf-8");
    return;
  } catch {
    // Si EROFS sur Vercel, on bascule silencieusement sur /tmp
  }

  // 2. Écrire dans /tmp (zone inscriptible garantie sur Vercel Serverless)
  try {
    await ensureDir(TMP_DATA_DIR);
    const tmpPath = path.join(TMP_DATA_DIR, fileName);
    await fs.writeFile(tmpPath, jsonStr, "utf-8");
  } catch (tmpErr) {
    console.warn("Storage notice: écriture /tmp échouée, donnée conservée en cache mémoire:", tmpErr);
  }
}
