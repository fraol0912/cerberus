import {
  JwtCryptology,
  MainAuthorizer,
  GetAssertionRequest,
  GetAssertionUseCase,
} from "@cerberus/core";
import {
  errorReport,
  NoInputData,
  IdNotProvided,
  AdminPasswordNotGiven,
} from "@cerberus/aegis/errors";
import {
  ClientRepository,
  AssertionRepository,
} from "@cerberus/aegis/protocols";
import { AegisGetAssertionPresenter } from "@cerberus/aegis/presenters";

export class GetAssertionController {
  private encrypter: JwtCryptology;
  private authorizer: MainAuthorizer;
  private clientRepo: ClientRepository;
  private assertionRepo: AssertionRepository;

  constructor(config: GetAssertionControllerConfig) {
    this.encrypter = config.encrypter;
    this.authorizer = config.authorizer;
    this.clientRepo = config.clientRepo;
    this.assertionRepo = config.assertionRepo;
  }

  async handle(data?: any): Promise<any> {
    try {
      this.validate(data);
      const request: GetAssertionRequest = this.buildRequest(data);
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

    if (!data.assertionId) {
      throw new IdNotProvided("Assertion id was not provided.");
    }
  }

  private buildRequest(data: any): GetAssertionRequest {
    return {
      id: data.assertionId,
      encodedAdminPassword: data.adminPassword,
    };
  }

  private async getAssertion(request: GetAssertionRequest) {
    const getAssertionPresenter = new AegisGetAssertionPresenter();

    const usecase = new GetAssertionUseCase({
      encrypter: this.encrypter,
      getClient: this.clientRepo,
      authorizer: this.authorizer,
      presenter: getAssertionPresenter,
      getAssertion: this.assertionRepo,
    });

    await usecase.execute(request);

    return getAssertionPresenter.getData();
  }
}

interface GetAssertionControllerConfig {
  encrypter: JwtCryptology;
  authorizer: MainAuthorizer;
  clientRepo: ClientRepository;
  assertionRepo: AssertionRepository;
}
