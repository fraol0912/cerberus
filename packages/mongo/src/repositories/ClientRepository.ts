import {
  Client,
  GetClientGateway,
  AddClientGateway,
  ListClientGateway,
  AddClientParameter,
  UpdateClientGateway,
  DeleteClientGateway,
  UpdateClientParameter,
} from "@cerberus/core";
import { ClientModel } from "../models";
import { isValidObjectId } from "mongoose";
import { InvalidId, ClientNotFound } from "../errors";

export class ClientRepository
  implements
    AddClientGateway,
    GetClientGateway,
    ListClientGateway,
    UpdateClientGateway,
    DeleteClientGateway
{
  async addClient(params: AddClientParameter) {
    const client = await ClientModel.create({
      name: params.name,
    });

    await client.save();

    return new Client({
      id: client._id.toString(),
      name: client.name,
    });
  }

  async getClient(id: string) {
    if (!isValidObjectId(id)) {
      throw new InvalidId();
    }

    const client = await ClientModel.findById(id);

    if (!client) {
      throw new ClientNotFound();
    }

    return new Client({
      id: client._id.toString(),
      name: client.name,
    });
  }

  async updateClient(id: string, params: UpdateClientParameter) {
    if (!isValidObjectId(id)) {
      throw new InvalidId();
    }

    const client = await ClientModel.findById(id);

    if (!client) {
      throw new ClientNotFound();
    }

    client.name = params.name;

    await client.save();

    return new Client({
      id: client._id.toString(),
      name: client.name,
    });
  }

  async deleteClient(id: string) {
    if (!isValidObjectId(id)) {
      return false;
    }

    const client = await ClientModel.findById(id);

    if (!client) {
      return false;
    }

    await client.delete();

    return true;
  }

  async listClients() {
    // limit?: number, after?: string, sort?: string
    const result = await ClientModel.find();
    const clients = result.map((model) => {
      return new Client({
        id: model._id.toString(),
        name: model.name,
      });
    });

    return clients;
  }
}
