import { Client } from "../../../entities";

export interface UpdateClientGateway {
  updateClient(
    id: string,
    clientParams: UpdateClientParameter
  ): Promise<Client>;
}

export interface UpdateClientParameter {
  name: string;
}
