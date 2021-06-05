import { Authorizer } from "../../data/protocols/authorizer/Authorizer";
import { ListClientGateway } from "../../data/protocols/data-access/Client/ListClientGateway";
import { UnauthorizedError } from "../../data/protocols/errors";
import {
  ClientResponse,
  ListClientPresenter,
} from "../../data/protocols/presenter";
import { ListClientRequest } from "../../data/protocols/requests";
import { UseCase } from "../UseCase";

export class ListClientUseCase implements UseCase {
  authorizer: Authorizer;
  listClients: ListClientGateway;
  presenter: ListClientPresenter;
  constructor(config: ListClientUseCaseConfig) {
    this.authorizer = config.authorizer;
    this.listClients = config.listClients;
    this.presenter = config.presenter;
  }

  async execute(request: ListClientRequest) {
    const authorized = await this.authorizer.isValid(
      request.encodedAdminPassword
    );

    if (!authorized) {
      throw new UnauthorizedError();
    }

    const clients = await this.listClients.listClients();
    const clientResponses: ClientResponse[] = clients.map<ClientResponse>(
      (client) => {
        return {
          name: client.getName(),
        };
      }
    );

    this.presenter.present(clientResponses);
  }
}

interface ListClientUseCaseConfig {
  authorizer: Authorizer;
  listClients: ListClientGateway;
  presenter: ListClientPresenter;
}
