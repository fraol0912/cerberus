import { Client } from "../../../../entities";

export interface ListClientGateway {
  listClients(limit?: number, after?: string, sort?: string): Promise<Client[]>;
}
