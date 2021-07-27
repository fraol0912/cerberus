import {
  JwtCryptology,
  IntrospectAssertionRequest,
  IntrospectAssertionUseCase,
  AssertionDetailsRepository,
} from "@cerberus/core";
import {
  errorReport,
  NoInputData,
  AssertionTokenNotGiven,
} from "@cerberus/aegis/errors";
import {
  ClientRepository,
  AssertionRepository,
} from "@cerberus/aegis/protocols";
import { AegisIntrospectAssertionPresenter } from "@cerberus/aegis/presenters";

export class IntrospectAssertionController {
  private decrypter: JwtCryptology;
  private clientRepo: ClientRepository;
  private assertionRepo: AssertionRepository;
  private assertionDetails: AssertionDetailsRepository;

  constructor(config: IntrospectAssertionControllerConfig) {
    this.decrypter = config.decrypter;
    this.clientRepo = config.clientRepo;
    this.assertionRepo = config.assertionRepo;
    this.assertionDetails = config.assertionDetails;
  }

  async handle(data?: any): Promise<any> {
    try {
      this.validate(data);
      const request: IntrospectAssertionRequest = this.buildRequest(data);
      return await this.introspectAssertion(request);
    } catch (error) {
      return errorReport(error);
    }
  }

  private validate(data: any) {
    if (!data) {
      throw new NoInputData("No input was provided.");
    }

    if (!data.assertion) {
      throw new AssertionTokenNotGiven(
        "The token to be introspected is not provided."
      );
    }
  }

  private buildRequest(data: any): IntrospectAssertionRequest {
    return {
      token: data.assertion,
    };
  }

  private async introspectAssertion(request: IntrospectAssertionRequest) {
    const introspectAssertionPresenter =
      new AegisIntrospectAssertionPresenter();

    const usecase = new IntrospectAssertionUseCase({
      decrypter: this.decrypter,
      getClient: this.clientRepo,
      getAssertion: this.assertionRepo,
      assertionDetails: this.assertionDetails,
      presenter: introspectAssertionPresenter,
    });

    await usecase.execute(request);

    return introspectAssertionPresenter.getData();
  }
}

interface IntrospectAssertionControllerConfig {
  decrypter: JwtCryptology;
  clientRepo: ClientRepository;
  assertionRepo: AssertionRepository;
  assertionDetails: AssertionDetailsRepository;
}
