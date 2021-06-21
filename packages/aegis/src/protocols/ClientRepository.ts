import {
  AddClientGateway,
  GetClientGateway,
  ListClientGateway,
  DeleteClientGateway,
  UpdateClientGateway,
} from "@cerberus/core";

export interface ClientRepository
  extends AddClientGateway,
    GetClientGateway,
    ListClientGateway,
    UpdateClientGateway,
    DeleteClientGateway {}
