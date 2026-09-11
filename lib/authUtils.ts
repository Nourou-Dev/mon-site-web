import crypto from "crypto";
import {
  SESSION_INACTIVITY_TIMEOUT_MS,
  SessionPayload,
  encodeSession,
  touchSession,
  decodeSession,
} from "./sessionUtils";

export {
  SESSION_INACTIVITY_TIMEOUT_MS,
  encodeSession,
  touchSession,
  decodeSession,
};
export type { SessionPayload };

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "_nd_salt_2026").digest("hex");
}
