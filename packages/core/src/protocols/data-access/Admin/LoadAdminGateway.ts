import { Admin } from "@cerberus/core/entities";

export interface LoadAdminGateway {
  loadAdmin(): Promise<Admin>;
}
