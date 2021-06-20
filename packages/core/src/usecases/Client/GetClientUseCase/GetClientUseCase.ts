import { UseCase } from "@cerberus/core/usecases";
import { Authorizer } from "@cerberus/core/protocols/authorizer";
import { UnauthorizedError } from "@cerberus/core/protocols/errors";
import { GetClientRequest } from "@cerberus/core/protocols/requests";
import { GetClientGateway } from "@cerberus/core/protocols/data-access";
import { GetClientPresenter } from "@cerberus/core/protocols/presenter";

export class GetClientUseCase implements UseCase {
  authorizer: Authorizer;
  loadClient: GetClientGateway;
  presenter: GetClientPresenter;
  constructor(config: GetClientUseCaseConfig) {
    this.authorizer = config.authorizer;
    this.loadClient = config.loadClient;
    this.presenter = config.presenter;
  }

  async execute(request: GetClientRequest) {
    const authorized = await this.authorizer.isValid(
      request.encodedAdminPassword
    );

    if (!authorized) {
      throw new UnauthorizedError();
    }

    const client = await this.loadClient.getClient(request.id);

    await this.presenter.present({
      id: client.getId(),
      name: client.getName(),
    });
  }
}

interface GetClientUseCaseConfig {
  authorizer: Authorizer;
  loadClient: GetClientGateway;
  presenter: GetClientPresenter;
}
