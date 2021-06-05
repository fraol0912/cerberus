import { UseCase } from "../..";
import {
  ClientResponse,
  ListClientPresenter,
} from "../../../protocols/presenter";
import { Authorizer } from "../../../protocols/authorizer";
import { UnauthorizedError } from "../../../protocols/errors";
import { ListClientRequest } from "../../../protocols/requests";
import { ListClientGateway } from "../../../protocols/data-access";

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
