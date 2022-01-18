import {
  MainAuthorizer,
  RevokeAssertionUseCase,
  RevokeAssertionRequest,
} from "@cerberus/core";
import {
  errorReport,
  NoInputData,
  IdNotProvided,
  AdminPasswordNotGiven,
} from "@cerberus/aegis/errors";
import { AssertionRepository } from "@cerberus/aegis/protocols";
import { AegisRevokeAssertionPresenter } from "@cerberus/aegis/presenters";

export class RevokeAssertionController {
  private authorizer: MainAuthorizer;
  private assertionRepo: AssertionRepository;

  constructor(config: RevokeAssertionControllerConfig) {
    this.authorizer = config.authorizer;
    this.assertionRepo = config.assertionRepo;
  }

  async handle(data?: any): Promise<any> {
    try {
      this.validate(data);
      const request: RevokeAssertionRequest = this.buildRequest(data);
      return await this.revokeAssertion(request);
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

  private buildRequest(data: any): RevokeAssertionRequest {
    return {
      id: data.assertionId,
      encodedAdminPassword: data.adminPassword,
    };
  }

  private async revokeAssertion(request: RevokeAssertionRequest) {
    const revokeAssertionPresenter = new AegisRevokeAssertionPresenter();

    const usecase = new RevokeAssertionUseCase({
      authorizer: this.authorizer,
      presenter: revokeAssertionPresenter,
      deleteAssertion: this.assertionRepo,
    });

    await usecase.execute(request);

    return revokeAssertionPresenter.getData();
  }
}

interface RevokeAssertionControllerConfig {
  authorizer: MainAuthorizer;
  assertionRepo: AssertionRepository;
}
