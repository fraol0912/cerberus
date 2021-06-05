import { UseCase } from "@cerberus/core/usecases";
import { Authorizer } from "@cerberus/core/protocols/authorizer";
import { UnauthorizedError } from "@cerberus/core/protocols/errors";
import { CreateClientRequest } from "@cerberus/core/protocols/requests";
import { AddClientGateway } from "@cerberus/core/protocols/data-access";
import { CreateClientPresenter } from "@cerberus/core/protocols/presenter";

export class CreateClientUseCase implements UseCase {
  private authorizer: Authorizer;
  private addClient: AddClientGateway;
  private presenter: CreateClientPresenter;

  constructor(config: CreateClientUseCaseConfig) {
    this.addClient = config.addClient;
    this.presenter = config.presenter;
    this.authorizer = config.authorizer;
  }

  async execute(request: CreateClientRequest) {
    const authorized = await this.authorizer.isValid(
      request.encodedAdminPassword
    );

    if (!authorized) {
      throw new UnauthorizedError();
    }

    const client = await this.addClient.addClient({
      name: request.name,
    });

    this.presenter.present({
      id: client.getId(),
      name: client.getName(),
    });
  }
}
interface CreateClientUseCaseConfig {
  authorizer: Authorizer;
  addClient: AddClientGateway;
  presenter: CreateClientPresenter;
}
