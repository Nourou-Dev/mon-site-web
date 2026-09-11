import crypto from "crypto";
import {
  SESSION_INACTIVITY_TIMEOUT_MS,
  ADMIN_SESSION_COOKIE,
  CLIENT_SESSION_COOKIE,
  LEGACY_SESSION_COOKIE,
  SessionPayload,
  encodeSession,
  touchSession,
  decodeSession,
} from "./sessionUtils";

export {
  SESSION_INACTIVITY_TIMEOUT_MS,
  ADMIN_SESSION_COOKIE,
  CLIENT_SESSION_COOKIE,
  LEGACY_SESSION_COOKIE,
  encodeSession,
  touchSession,
  decodeSession,
};
export type { SessionPayload };

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "_nd_salt_2026").digest("hex");
}
