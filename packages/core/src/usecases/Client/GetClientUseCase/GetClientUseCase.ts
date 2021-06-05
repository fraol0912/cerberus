import { UseCase } from "../..";
import { Authorizer } from "../../../protocols/authorizer";
import { UnauthorizedError } from "../../../protocols/errors";
import { GetClientRequest } from "../../../protocols/requests";
import { GetClientGateway } from "../../../protocols/data-access";
import { GetClientPresenter } from "../../../protocols/presenter";

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

    this.presenter.present({
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
