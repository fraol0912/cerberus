import {
  Client,
  AddClientGateway,
  GetClientGateway,
  ListClientGateway,
  AddClientParameter,
  UpdateClientGateway,
  DeleteClientGateway,
  UpdateClientParameter,
} from "@cerberus/core";
import { generateId } from "../helpers";
import { ClientNotFound } from "../errors";

export class ClientRepository
  implements
    AddClientGateway,
    GetClientGateway,
    ListClientGateway,
    UpdateClientGateway,
    DeleteClientGateway
{
  private hashMap: Map<string, Client>;
  constructor() {
    this.hashMap = new Map();
  }

  async addClient(params: AddClientParameter) {
    const client = new Client({
      id: generateId(),
      name: params.name,
    });

    this.hashMap.set(client.getId(), client);

    return client;
  }

  async getClient(id: string) {
    const client = this.hashMap.get(id);

    if (!client) {
      throw new ClientNotFound();
    }

    return client;
  }

  async updateClient(id: string, params: UpdateClientParameter) {
    const client = this.hashMap.get(id);

    if (!client) {
      throw new ClientNotFound();
    }

    const updated = new Client({
      id: client.getId(),
      name: params.name,
    });

    this.hashMap.set(updated.getId(), updated);

    return updated;
  }

  async deleteClient(id: string) {
    const client = this.hashMap.get(id);

    if (!client) {
      return false;
    }

    this.hashMap.delete(client.getId());

    return true;
  }

  async listClients() {
    const clients = Array.from(this.hashMap.values());

    return clients;
  }

  clear() {
    this.hashMap.clear();
  }
}
