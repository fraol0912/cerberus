import { randomBytes } from "crypto";

export function generateId() {
  return randomBytes(10).toString("base64url");
}
