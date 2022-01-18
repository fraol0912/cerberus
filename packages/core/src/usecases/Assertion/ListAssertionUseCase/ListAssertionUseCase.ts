import {
  AssertionResponse,
  ListAssertionPresenter,
} from "@cerberus/core/protocols/presenter";
import {
  GetClientGateway,
  ListAssertionGateway,
} from "@cerberus/core/protocols/data-access";
import { UseCase } from "@cerberus/core/usecases";
import { Authorizer } from "@cerberus/core/protocols/authorizer";
import { UnauthorizedError } from "@cerberus/core/protocols/errors";
import { ListAssertionRequest } from "@cerberus/core/protocols/requests";

export class ListAssertionUseCase implements UseCase {
  private authorizer: Authorizer;
  private getClient: GetClientGateway;
  private presenter: ListAssertionPresenter;
  private listAssertions: ListAssertionGateway;

  constructor(config: ListAssertionUseCaseConfig) {
    this.getClient = config.getClient;
    this.presenter = config.presenter;
    this.authorizer = config.authorizer;
    this.listAssertions = config.listAssertions;
  }

  async execute(request: ListAssertionRequest) {
    const authorized = await this.authorizer.isValid(
      request.encodedAdminPassword
    );

    if (!authorized) {
      throw new UnauthorizedError();
    }

    const assertions = await this.listAssertions.listAssertions();

    const result: AssertionResponse[] = [];

    for (const assertion of assertions) {
      const client = await this.getClient.getClient(assertion.getSubject());

      result.push({
        id: assertion.getId(),
        name: assertion.getName(),
        issuer: assertion.getIssuer(),
        audience: assertion.getAudience(),

        subject: {
          id: client.getId(),
          name: client.getName(),
        },

        notBefore: assertion.getNotBefore(),
        expiresAt: assertion.getExpiresAt(),
        initiatedAt: assertion.getInitializedAt(),

        valid: assertion.isValid(),
      });
    }

    this.presenter.present(result);
  }
}

interface ListAssertionUseCaseConfig {
  authorizer: Authorizer;
  getClient: GetClientGateway;
  presenter: ListAssertionPresenter;
  listAssertions: ListAssertionGateway;
}
