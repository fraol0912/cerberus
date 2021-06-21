import {
  MainAuthorizer,
  CreateClientRequest,
  CreateClientUseCase,
} from "@cerberus/core";
import {
  errorReport,
  NoInputData,
  ClientNameNotGiven,
  AdminPasswordNotGiven,
} from "@cerberus/aegis/errors";
import { ClientRepository } from "@cerberus/aegis/protocols";
import { AegisCreateClientPresenter } from "@cerberus/aegis/presenters";

export class CreateClientController {
  private authorizer: MainAuthorizer;
  private clientRepo: ClientRepository;

  constructor(config: CreateClientControllerConfig) {
    this.authorizer = config.authorizer;
    this.clientRepo = config.clientRepo;
  }

  async handle(data?: any): Promise<any> {
    try {
      this.validate(data);
      const request: CreateClientRequest = this.buildRequest(data);
      return await this.createClient(request);
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

    if (!data.clientName) {
      throw new ClientNameNotGiven("Client name was not provided.");
    }
  }

  private buildRequest(data: any): CreateClientRequest {
    return {
      name: data.clientName,
      encodedAdminPassword: data.adminPassword,
    };
  }

  private async createClient(request: CreateClientRequest) {
    const createClientPresenter = new AegisCreateClientPresenter();

    const usecase = new CreateClientUseCase({
      addClient: this.clientRepo,
      authorizer: this.authorizer,
      presenter: createClientPresenter,
    });

    await usecase.execute(request);

    return createClientPresenter.getData();
  }
}

interface CreateClientControllerConfig {
  authorizer: MainAuthorizer;
  clientRepo: ClientRepository;
}
