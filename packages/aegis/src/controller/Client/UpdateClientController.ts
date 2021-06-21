import {
  MainAuthorizer,
  UpdateClientRequest,
  UpdateClientUseCase,
} from "@cerberus/core";
import {
  errorReport,
  NoInputData,
  IdNotProvided,
  ClientNameNotGiven,
  AdminPasswordNotGiven,
} from "@cerberus/aegis/errors";
import { ClientRepository } from "@cerberus/aegis/protocols";
import { AegisUpdateClientPresenter } from "@cerberus/aegis/presenters";

export class UpdateClientController {
  private authorizer: MainAuthorizer;
  private clientRepo: ClientRepository;
  constructor(config: UpdateClientControllerConfig) {
    this.authorizer = config.authorizer;
    this.clientRepo = config.clientRepo;
  }

  async handle(data?: any): Promise<any> {
    try {
      this.validate(data);
      const request: UpdateClientRequest = this.buildRequest(data);
      return await this.updateClient(request);
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

    if (!data.clientName) {
      throw new ClientNameNotGiven("Client name was not provided.");
    }
  }

  private buildRequest(data: any): UpdateClientRequest {
    return {
      id: data.clientId,
      name: data.clientName,
      encodedAdminPassword: data.adminPassword,
    };
  }

  private async updateClient(request: UpdateClientRequest) {
    const getClientPresenter = new AegisUpdateClientPresenter();

    const usecase = new UpdateClientUseCase({
      authorizer: this.authorizer,
      updateClient: this.clientRepo,
      presenter: getClientPresenter,
    });

    await usecase.execute(request);

    return getClientPresenter.getData();
  }
}

interface UpdateClientControllerConfig {
  authorizer: MainAuthorizer;
  clientRepo: ClientRepository;
}
