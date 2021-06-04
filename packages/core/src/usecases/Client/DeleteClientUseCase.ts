import { Authorizer } from "../../data/protocols/authorizer/Authorizer";
import { DeleteClientGateway } from "../../data/protocols/data-access/Client/DeleteClientGateway";
import { UnauthorizedError } from "../../data/protocols/errors/";
import { DeleteClientPresenter } from "../../data/protocols/presenter/Client/DeleteClientPresenter";
import { DeleteClientRequest } from "../../data/protocols/requests";
import { UseCase } from "../UseCase";

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
