import { Client } from "@cerberus/core/entities";

export interface AddClientGateway {
  addClient(clientParams: AddClientParameter): Promise<Client>;
}

export interface AddClientParameter {
  name: string;
}
