import {
  MainAuthorizer,
  GetClientRequest,
  GetClientUseCase,
} from "@cerberus/core";
import {
  errorReport,
  NoInputData,
  IdNotProvided,
  AdminPasswordNotGiven,
} from "@cerberus/aegis/errors";
import { ClientRepository } from "@cerberus/aegis/protocols";
import { AegisGetClientPresenter } from "@cerberus/aegis/presenters";

export class GetClientController {
  private authorizer: MainAuthorizer;
  private clientRepo: ClientRepository;

  constructor(config: GetClientControllerConfig) {
    this.authorizer = config.authorizer;
    this.clientRepo = config.clientRepo;
  }

  async handle(data?: any): Promise<any> {
    try {
      this.validate(data);
      const request: GetClientRequest = this.buildRequest(data);
      return await this.getClient(request);
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

  private buildRequest(data: any): GetClientRequest {
    return {
      encodedAdminPassword: data.adminPassword,
      id: data.clientId,
    };
  }

  private async getClient(request: GetClientRequest) {
    const getClientPresenter = new AegisGetClientPresenter();

    const usecase = new GetClientUseCase({
      authorizer: this.authorizer,
      loadClient: this.clientRepo,
      presenter: getClientPresenter,
    });

    await usecase.execute(request);

    return getClientPresenter.getData();
  }
}

interface GetClientControllerConfig {
  authorizer: MainAuthorizer;
  clientRepo: ClientRepository;
}
