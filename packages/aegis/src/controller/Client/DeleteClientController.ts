import {
  MainAuthorizer,
  DeleteClientRequest,
  DeleteClientUseCase,
} from "@cerberus/core";
import {
  errorReport,
  NoInputData,
  IdNotProvided,
  AdminPasswordNotGiven,
} from "@cerberus/aegis/errors";
import { ClientRepository } from "@cerberus/aegis/protocols";
import { AegisDeleteClientPresenter } from "@cerberus/aegis/presenters";
export class DeleteClientController {
  private authorizer: MainAuthorizer;
  private clientRepo: ClientRepository;

  constructor(config: DeleteClientControllerConfig) {
    this.authorizer = config.authorizer;
    this.clientRepo = config.clientRepo;
  }

  async handle(data?: any): Promise<any> {
    try {
      this.validate(data);
      const request: DeleteClientRequest = this.buildRequest(data);
      return await this.deleteClient(request);
    } catch (error) {
      return errorReport(error);
    }
  }

  private validate(data: any) {
    if (!data) {
      throw new NoInputData("No input was provided.");
    }

    if (!data.adminPassword) {
      throw new AdminPasswordNotGiven("Admin password was not provided.");
    }

    if (!data.clientId) {
      throw new IdNotProvided("No id was provided, couldn't find the client");
    }
  }

  private buildRequest(data: any): DeleteClientRequest {
    return {
      encodedAdminPassword: data.adminPassword,
      id: data.clientId,
    };
  }

  private async deleteClient(request: DeleteClientRequest) {
    const deleteClientPresenter = new AegisDeleteClientPresenter();

    const usecase = new DeleteClientUseCase({
      authorizer: this.authorizer,
      deleteClient: this.clientRepo,
      presenter: deleteClientPresenter,
    });

    await usecase.execute(request);

    return deleteClientPresenter.getData();
  }
}

interface DeleteClientControllerConfig {
  authorizer: MainAuthorizer;
  clientRepo: ClientRepository;
}
