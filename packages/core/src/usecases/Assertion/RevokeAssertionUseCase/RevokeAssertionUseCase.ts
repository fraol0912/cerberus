import { UseCase } from "@cerberus/core/usecases";
import { Authorizer } from "@cerberus/core/protocols/authorizer";
import { UnauthorizedError } from "@cerberus/core/protocols/errors";
import { RevokeAssertionRequest } from "@cerberus/core/protocols/requests";
import { RevokeAssertionPresenter } from "@cerberus/core/protocols/presenter";
import { DeleteAssertionGateway } from "@cerberus/core/protocols/data-access";

export class RevokeAssertionUseCase implements UseCase {
  private authorizer: Authorizer;
  private presenter: RevokeAssertionPresenter;
  private deleteAssertion: DeleteAssertionGateway;

  constructor(config: RevokeAssertionUseCaseConfig) {
    this.presenter = config.presenter;
    this.authorizer = config.authorizer;
    this.deleteAssertion = config.deleteAssertion;
  }

  async execute(request: RevokeAssertionRequest) {
    const authorized = await this.authorizer.isValid(
      request.encodedAdminPassword
    );

    if (!authorized) {
      throw new UnauthorizedError();
    }

    await this.deleteAssertion.deleteAssertion(request.id);

    await this.presenter.present(true);
  }
}

interface RevokeAssertionUseCaseConfig {
  authorizer: Authorizer;
  presenter: RevokeAssertionPresenter;
  deleteAssertion: DeleteAssertionGateway;
}
