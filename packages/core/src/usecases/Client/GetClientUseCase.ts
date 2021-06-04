import { Authorizer } from "../../data/protocols/authorizer/Authorizer";
import { GetClientGateway } from "../../data/protocols/data-access/Client/GetClientGateway";
import { GetClientPresenter } from "../../data/protocols/presenter";
import { UseCase } from "../UseCase";
import { UnauthorizedError } from "../../data/protocols/errors";
import { GetClientRequest } from "../../data/protocols/requests";

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
