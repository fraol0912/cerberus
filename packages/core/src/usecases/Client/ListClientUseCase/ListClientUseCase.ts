import { UseCase } from "@cerberus/core/usecases";
import {
  ClientResponse,
  ListClientPresenter,
} from "@cerberus/core/protocols/presenter";
import { Authorizer } from "@cerberus/core/protocols/authorizer";
import { UnauthorizedError } from "@cerberus/core/protocols/errors";
import { ListClientRequest } from "@cerberus/core/protocols/requests";
import { ListClientGateway } from "@cerberus/core/protocols/data-access";

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
          id: client.getId(),
          name: client.getName(),
        };
      }
    );

    await this.presenter.present(clientResponses);
  }
}

interface ListClientUseCaseConfig {
  authorizer: Authorizer;
  listClients: ListClientGateway;
  presenter: ListClientPresenter;
}
