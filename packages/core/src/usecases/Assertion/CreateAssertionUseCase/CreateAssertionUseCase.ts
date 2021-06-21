import {
  GetClientGateway,
  AddAssertionGateway,
  AssertionDetailsGateway,
} from "@cerberus/core/protocols/data-access";
import { UseCase } from "@cerberus/core/usecases";
import { Authorizer } from "@cerberus/core/protocols/authorizer";
import { UnauthorizedError } from "@cerberus/core/protocols/errors";
import { TokenEncrypter } from "@cerberus/core/protocols/cryptology";
import { CreateAssertionRequest } from "@cerberus/core/protocols/requests";
import { CreateAssertionPresenter } from "@cerberus/core/protocols/presenter";

export class CreateAssertionUseCase implements UseCase {
  private authorizer: Authorizer;
  private encrypter: TokenEncrypter;
  private getClient: GetClientGateway;
  private addAssertion: AddAssertionGateway;
  private presenter: CreateAssertionPresenter;
  private assertionDetails: AssertionDetailsGateway;

  constructor(config: CreateAssertionUseCaseConfig) {
    this.encrypter = config.encrypter;
    this.getClient = config.getClient;
    this.presenter = config.presenter;
    this.authorizer = config.authorizer;
    this.addAssertion = config.addAssertion;
    this.assertionDetails = config.assertionDetails;
  }

  async execute(request: CreateAssertionRequest) {
    const authorized = await this.authorizer.isValid(
      request.encodedAdminPassword
    );

    if (!authorized) {
      throw new UnauthorizedError();
    }

    const client = await this.getClient.getClient(request.subject);

    const issuerName = await this.assertionDetails.getIssuerName();
    const audienceField = await this.assertionDetails.getAudienceField();

    const initiatedAt = new Date();

    const assertion = await this.addAssertion.addAssertion({
      name: request.name,
      subject: client.getId(),

      issuer: issuerName,
      audience: audienceField,

      initiatedAt,
      notBefore: request.notBefore,
      expiresAt: request.expiresAt,
    });

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

interface CreateAssertionUseCaseConfig {
  authorizer: Authorizer;
  encrypter: TokenEncrypter;
  getClient: GetClientGateway;
  addAssertion: AddAssertionGateway;
  presenter: CreateAssertionPresenter;
  assertionDetails: AssertionDetailsGateway;
}
