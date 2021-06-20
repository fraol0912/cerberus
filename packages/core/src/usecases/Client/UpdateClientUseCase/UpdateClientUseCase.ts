import { UseCase } from "@cerberus/core/usecases";
import { UnauthorizedError } from "@cerberus/core/protocols/errors";
import { UpdateClientRequest } from "@cerberus/core/protocols/requests";
import { UpdateClientPresenter } from "@cerberus/core/protocols/presenter";
import { UpdateClientGateway } from "@cerberus/core/protocols/data-access";
import { Authorizer } from "@cerberus/core/protocols/authorizer/Authorizer";

export class UpdateClientUseCase implements UseCase {
  private authorizer: Authorizer;
  private updateClient: UpdateClientGateway;
  private presenter: UpdateClientPresenter;

  constructor(config: UpdateClientUseCaseConfig) {
    this.updateClient = config.updateClient;
    this.presenter = config.presenter;
    this.authorizer = config.authorizer;
  }

  async execute(request: UpdateClientRequest) {
    const authorized = await this.authorizer.isValid(
      request.encodedAdminPassword
    );

    if (!authorized) {
      throw new UnauthorizedError();
    }

    const client = await this.updateClient.updateClient(request.id, {
      name: request.name,
    });

    await this.presenter.present({
      id: client.getId(),
      name: client.getName(),
    });
  }
}

interface UpdateClientUseCaseConfig {
  authorizer: Authorizer;
  updateClient: UpdateClientGateway;
  presenter: UpdateClientPresenter;
}
