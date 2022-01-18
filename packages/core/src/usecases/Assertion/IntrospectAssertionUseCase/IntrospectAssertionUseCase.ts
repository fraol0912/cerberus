import {
  GetClientGateway,
  GetAssertionGateway,
  AssertionDetailsGateway,
} from "@cerberus/core/protocols/data-access";
import { UseCase } from "@cerberus/core/usecases";
import { TokenDecrypter } from "@cerberus/core/protocols/cryptology";
import { IntrospectAssertionRequest } from "@cerberus/core/protocols/requests";
import { IntrospectAssertionPresenter } from "@cerberus/core/protocols/presenter";

export class IntrospectAssertionUseCase implements UseCase {
  private decrypter: TokenDecrypter;
  private getClient: GetClientGateway;
  private getAssertion: GetAssertionGateway;
  private presenter: IntrospectAssertionPresenter;
  private assertionDetails: AssertionDetailsGateway;

  constructor(config: GetAssertionUseCaseConfig) {
    this.decrypter = config.decrypter;
    this.getClient = config.getClient;
    this.presenter = config.presenter;
    this.getAssertion = config.getAssertion;
    this.assertionDetails = config.assertionDetails;
  }

  async execute(request: IntrospectAssertionRequest) {
    try {
      const token = await this.decrypter.decrypt(request.token);

      await this.getClient.getClient(token.sub);

      const issuer = await this.assertionDetails.getIssuerName();
      const audience = await this.assertionDetails.getAudienceField();

      if (issuer !== token.iss) {
        throw Error("Issuer Doesn't Match Token Issuer.");
      }

      if (audience !== token.aud) {
        throw Error("Audience Doesn't Match Token Audience.");
      }

      const assertion = await this.getAssertion.getAssertion(token.jti);

      await this.presenter.present({
        valid: assertion.isValid(),
      });
    } catch {
      await this.presenter.present({
        valid: false,
      });
    }
  }
}

interface GetAssertionUseCaseConfig {
  decrypter: TokenDecrypter;
  getClient: GetClientGateway;
  getAssertion: GetAssertionGateway;
  presenter: IntrospectAssertionPresenter;
  assertionDetails: AssertionDetailsGateway;
}
