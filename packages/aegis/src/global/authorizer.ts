import { decoder } from "./decoder";
import { adminRepo } from "./adminRepo";
import { MainAuthorizer } from "@cerberus/core";

export const authorizer = new MainAuthorizer({
  decoder,
  loadAdmin: adminRepo,
});
