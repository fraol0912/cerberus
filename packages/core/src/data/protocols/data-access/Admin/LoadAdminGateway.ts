import { Admin } from "./LoadAdminGatewayProtocols";

export interface LoadAdminGateway {
  loadAdmin(): Promise<Admin>;
}
