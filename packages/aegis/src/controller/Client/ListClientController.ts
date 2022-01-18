import {
  MainAuthorizer,
  ListClientRequest,
  ListClientUseCase,
} from "@cerberus/core";
import {
  errorReport,
  NoInputData,
  AdminPasswordNotGiven,
} from "@cerberus/aegis/errors";
import { ClientRepository } from "@cerberus/aegis/protocols";
import { AegisListClientPresenter } from "@cerberus/aegis/presenters";

export class ListClientController {
  private authorizer: MainAuthorizer;
  private clientRepo: ClientRepository;
  constructor(config: ListClientControllerConfig) {
    this.authorizer = config.authorizer;
    this.clientRepo = config.clientRepo;
  }

  async handle(data?: any): Promise<any> {
    try {
      this.validate(data);
      const request: ListClientRequest = this.buildRequest(data);
      return await this.listClients(request);
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
  }

  private buildRequest(data: any): ListClientRequest {
    return {
      encodedAdminPassword: data.adminPassword,
    };
  }

  private async listClients(request: ListClientRequest) {
    const listClientPresenter = new AegisListClientPresenter();

    const usecase = new ListClientUseCase({
      authorizer: this.authorizer,
      listClients: this.clientRepo,
      presenter: listClientPresenter,
    });

    await usecase.execute(request);

    return listClientPresenter.getData();
  }
}

interface ListClientControllerConfig {
  authorizer: MainAuthorizer;
  clientRepo: ClientRepository;
}
