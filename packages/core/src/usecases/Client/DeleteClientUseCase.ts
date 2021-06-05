import { UseCase } from "../UseCase";
import { Authorizer } from "../../protocols/authorizer";
import { UnauthorizedError } from "../../protocols/errors";
import { DeleteClientRequest } from "../../protocols/requests";
import { DeleteClientGateway } from "../../protocols/data-access";
import { DeleteClientPresenter } from "../../protocols/presenter";

export class DeleteClientUseCase implements UseCase {
  private authorizer: Authorizer;
  private deleteClient: DeleteClientGateway;
  private presenter: DeleteClientPresenter;

  constructor(config: DeleteClientUseCaseConfig) {
    this.deleteClient = config.deleteClient;
    this.presenter = config.presenter;
    this.authorizer = config.authorizer;
  }

  async execute(request: DeleteClientRequest) {
    const authorized = await this.authorizer.isValid(
      request.encodedAdminPassword
    );

    if (!authorized) {
      throw new UnauthorizedError();
    }

    const deleted = await this.deleteClient.deleteClient(request.id);

    this.presenter.present(deleted);
  }
}
interface DeleteClientUseCaseConfig {
  authorizer: Authorizer;
  deleteClient: DeleteClientGateway;
  presenter: DeleteClientPresenter;
}
