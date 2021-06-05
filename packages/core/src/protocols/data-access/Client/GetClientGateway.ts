import { Client } from "../../../entities";

export interface GetClientGateway {
  getClient(id: string): Promise<Client>;
}
