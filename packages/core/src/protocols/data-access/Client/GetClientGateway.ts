import { Client } from "@cerberus/core/entities";

export interface GetClientGateway {
  getClient(id: string): Promise<Client>;
}
