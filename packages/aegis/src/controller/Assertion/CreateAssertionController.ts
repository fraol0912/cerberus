import {
  JwtCryptology,
  MainAuthorizer,
  CreateAssertionUseCase,
  CreateAssertionRequest,
  AssertionDetailsRepository,
} from "@cerberus/core";
import {
  errorReport,
  NoInputData,
  IdNotProvided,
  ExpiryDateNotGiven,
  NotBeforeDateNotGiven,
  AssertionNameNotGiven,
  AdminPasswordNotGiven,
  ExpiryDateWasNotANumber,
  NotBeforeDateWasNotANumber,
} from "@cerberus/aegis/errors";
import {
  ClientRepository,
  AssertionRepository,
} from "@cerberus/aegis/protocols";
import { AegisCreateAssertionPresenter } from "@cerberus/aegis/presenters";

export class CreateAssertionController {
  private encrypter: JwtCryptology;
  private authorizer: MainAuthorizer;
  private clientRepo: ClientRepository;
  private assertionRepo: AssertionRepository;
  private assertionDetails: AssertionDetailsRepository;

  constructor(config: CreateAssertionControllerConfig) {
    this.encrypter = config.encrypter;
    this.authorizer = config.authorizer;
    this.clientRepo = config.clientRepo;
    this.assertionRepo = config.assertionRepo;
    this.assertionDetails = config.assertionDetails;
  }

  async handle(data?: any): Promise<any> {
    try {
      this.validate(data);
      const request: CreateAssertionRequest = this.buildRequest(data);
      return await this.createAssertion(request);
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

    if (!data.assertionName) {
      throw new AssertionNameNotGiven("Assertion name was not provided.");
    }

    if (!data.clientId) {
      throw new IdNotProvided("Client id was not provided.");
    }

    if (!data.expiresAt) {
      throw new ExpiryDateNotGiven("Expiry date was not provided.");
    }

    if (!parseInt(data.expiresAt)) {
      throw new ExpiryDateWasNotANumber(
        "Expiry date provided is not a number."
      );
    }

    if (!data.notBefore) {
      throw new NotBeforeDateNotGiven("Not before date was not provided.");
    }

    if (!parseInt(data.notBefore)) {
      throw new NotBeforeDateWasNotANumber("Not before date is not a number.");
    }
  }

  private buildRequest(data: any): CreateAssertionRequest {
    return {
      subject: data.clientId,
      name: data.assertionName,
      encodedAdminPassword: data.adminPassword,
      expiresAt: new Date(parseInt(data.expiresAt)),
      notBefore: new Date(parseInt(data.notBefore)),
    };
  }

  private async createAssertion(request: CreateAssertionRequest) {
    const createAssertionPresenter = new AegisCreateAssertionPresenter();

    const usecase = new CreateAssertionUseCase({
      encrypter: this.encrypter,
      getClient: this.clientRepo,
      authorizer: this.authorizer,
      addAssertion: this.assertionRepo,
      presenter: createAssertionPresenter,
      assertionDetails: this.assertionDetails,
    });

    await usecase.execute(request);

    return createAssertionPresenter.getData();
  }
}

interface CreateAssertionControllerConfig {
  encrypter: JwtCryptology;
  authorizer: MainAuthorizer;
  clientRepo: ClientRepository;
  assertionRepo: AssertionRepository;
  assertionDetails: AssertionDetailsRepository;
}
