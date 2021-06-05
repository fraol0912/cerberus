import { Client } from "@cerberus/core/entities";

export interface ListClientGateway {
  listClients(limit?: number, after?: string, sort?: string): Promise<Client[]>;
}
