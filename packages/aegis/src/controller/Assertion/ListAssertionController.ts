import {
  MainAuthorizer,
  ListAssertionRequest,
  ListAssertionUseCase,
} from "@cerberus/core";
import {
  errorReport,
  NoInputData,
  AdminPasswordNotGiven,
} from "@cerberus/aegis/errors";
import {
  ClientRepository,
  AssertionRepository,
} from "@cerberus/aegis/protocols";
import { AegisListAssertionPresenter } from "@cerberus/aegis/presenters";

export class ListAssertionController {
  private authorizer: MainAuthorizer;
  private clientRepo: ClientRepository;
  private assertionRepo: AssertionRepository;

  constructor(config: ListAssertionControllerConfig) {
    this.authorizer = config.authorizer;
    this.clientRepo = config.clientRepo;
    this.assertionRepo = config.assertionRepo;
  }

  async handle(data?: any): Promise<any> {
    try {
      this.validate(data);
      const request: ListAssertionRequest = this.buildRequest(data);
      return await this.getAssertion(request);
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

  private buildRequest(data: any): ListAssertionRequest {
    return {
      encodedAdminPassword: data.adminPassword,
    };
  }

  private async getAssertion(request: ListAssertionRequest) {
    const listAssertionPresenter = new AegisListAssertionPresenter();

    const usecase = new ListAssertionUseCase({
      getClient: this.clientRepo,
      authorizer: this.authorizer,
      listAssertions: this.assertionRepo,
      presenter: listAssertionPresenter,
    });

    await usecase.execute(request);

    return listAssertionPresenter.getData();
  }
}

interface ListAssertionControllerConfig {
  authorizer: MainAuthorizer;
  clientRepo: ClientRepository;
  assertionRepo: AssertionRepository;
}
