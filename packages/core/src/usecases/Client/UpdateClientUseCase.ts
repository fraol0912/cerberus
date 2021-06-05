import { UseCase } from "../UseCase";
import { UnauthorizedError } from "../../protocols/errors";
import { Authorizer } from "../../protocols/authorizer/Authorizer";
import { UpdateClientRequest } from "../../protocols/requests";
import { UpdateClientGateway } from "../../protocols/data-access";
import { UpdateClientPresenter } from "../../protocols/presenter";

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

    this.presenter.present({
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
