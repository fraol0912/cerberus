import {
  GetClientGateway,
  GetAssertionGateway,
} from "@cerberus/core/protocols/data-access";
import { UseCase } from "@cerberus/core/usecases";
import { Authorizer } from "@cerberus/core/protocols/authorizer";
import { UnauthorizedError } from "@cerberus/core/protocols/errors";
import { TokenEncrypter } from "@cerberus/core/protocols/cryptology";
import { GetAssertionRequest } from "@cerberus/core/protocols/requests";
import { GetAssertionPresenter } from "@cerberus/core/protocols/presenter";

export class GetAssertionUseCase implements UseCase {
  private authorizer: Authorizer;
  private encrypter: TokenEncrypter;
  private getClient: GetClientGateway;
  private getAssertion: GetAssertionGateway;
  private presenter: GetAssertionPresenter;

  constructor(config: GetAssertionUseCaseConfig) {
    this.encrypter = config.encrypter;
    this.getClient = config.getClient;
    this.presenter = config.presenter;
    this.authorizer = config.authorizer;
    this.getAssertion = config.getAssertion;
  }

  async execute(request: GetAssertionRequest) {
    const authorized = await this.authorizer.isValid(
      request.encodedAdminPassword
    );

    if (!authorized) {
      throw new UnauthorizedError();
    }

    const assertion = await this.getAssertion.getAssertion(request.id);

    const client = await this.getClient.getClient(assertion.getSubject());

    const token = await this.encrypter.encrypt({
      jti: assertion.getId(),
      iss: assertion.getIssuer(),
      sub: assertion.getSubject(),
      aud: assertion.getAudience(),

      exp: assertion.getExpiresAt().getTime(),
      nbf: assertion.getNotBefore().getTime(),
      iat: assertion.getInitializedAt().getTime(),
    });

    await this.presenter.present({
      id: assertion.getId(),
      name: assertion.getName(),
      issuer: assertion.getIssuer(),
      audience: assertion.getAudience(),

      subject: {
        id: client.getId(),
        name: client.getName(),
      },

      token,
      notBefore: assertion.getNotBefore(),
      expiresAt: assertion.getExpiresAt(),
      initiatedAt: assertion.getInitializedAt(),

      valid: assertion.isValid(),
    });
  }
}

interface GetAssertionUseCaseConfig {
  authorizer: Authorizer;
  encrypter: TokenEncrypter;
  getClient: GetClientGateway;
  presenter: GetAssertionPresenter;
  getAssertion: GetAssertionGateway;
}
