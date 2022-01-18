import { Request } from "express";

export function getAdminPasswordFromRequest(req: Request): string {
  const authorizationHeader = req.headers?.authorization?.split(" ");

  if (authorizationHeader) {
    if (authorizationHeader[0] === "Basic") {
      if (authorizationHeader[1]) {
        const adminPassword = authorizationHeader[1];
        return adminPassword;
      } else {
        return "";
      }
    } else {
      return "";
    }
  } else {
    return "";
  }
}
