import { Admin } from "../../../entities";

export interface LoadAdminGateway {
  loadAdmin(): Promise<Admin>;
}
