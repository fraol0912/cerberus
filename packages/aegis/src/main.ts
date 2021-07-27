import {
  ClientRepository,
  AssertionRepository,
} from "@cerberus/aegis/protocols";
import {
  GetClientController,
  ListClientController,
  CreateClientController,
  DeleteClientController,
  UpdateClientController,
  GetAssertionController,
  ListAssertionController,
  CreateAssertionController,
  IntrospectAssertionController,
} from "./controller";
import {
  MainDecoder,
  JwtCryptology,
  MainAuthorizer,
  AdminRepository,
  AssertionDetailsRepository,
} from "@cerberus/core";

export abstract class Controller {
  abstract getIssuerName(): string;
  abstract getAdminPassword(): string;
  abstract getAudienceField(): string;
  abstract getEncryptionPassword(): string;

  // Repositories
  abstract getClientRepo(): ClientRepository;
  abstract getAssertionRepo(): AssertionRepository;

  getAdminRepo() {
    return new AdminRepository({
      password: this.getAdminPassword(),
    });
  }

  getAuthorizer() {
    const decoder = new MainDecoder();

    const authorizer = new MainAuthorizer({
      decoder,
      loadAdmin: this.getAdminRepo(),
    });

    return authorizer;
  }

  getTokenCrypto() {
    return new JwtCryptology(this.getEncryptionPassword());
  }

  getAssertionDetails() {
    return new AssertionDetailsRepository({
      issuer: this.getIssuerName(),
      audience: this.getAudienceField(),
    });
  }

  // Client Controllers
  getCreateClientController() {
    const controller = new CreateClientController({
      authorizer: this.getAuthorizer(),
      clientRepo: this.getClientRepo(),
    });

    return controller;
  }

  getDeleteClientController() {
    const controller = new DeleteClientController({
      authorizer: this.getAuthorizer(),
      clientRepo: this.getClientRepo(),
    });

    return controller;
  }

  getGetClientController() {
    const controller = new GetClientController({
      authorizer: this.getAuthorizer(),
      clientRepo: this.getClientRepo(),
    });

    return controller;
  }

  getListClientController() {
    const controller = new ListClientController({
      authorizer: this.getAuthorizer(),
      clientRepo: this.getClientRepo(),
    });

    return controller;
  }

  getUpdateClientController() {
    const controller = new UpdateClientController({
      authorizer: this.getAuthorizer(),
      clientRepo: this.getClientRepo(),
    });

    return controller;
  }

  // Assertion Controllers
  getCreateAssertionController() {
    return new CreateAssertionController({
      encrypter: this.getTokenCrypto(),
      authorizer: this.getAuthorizer(),
      clientRepo: this.getClientRepo(),
      assertionRepo: this.getAssertionRepo(),
      assertionDetails: this.getAssertionDetails(),
    });
  }

  getGetAssertionController() {
    return new GetAssertionController({
      encrypter: this.getTokenCrypto(),
      authorizer: this.getAuthorizer(),
      clientRepo: this.getClientRepo(),
      assertionRepo: this.getAssertionRepo(),
    });
  }

  getListAssertionController() {
    return new ListAssertionController({
      authorizer: this.getAuthorizer(),
      clientRepo: this.getClientRepo(),
      assertionRepo: this.getAssertionRepo(),
    });
  }

  getIntrospectAssertionController() {
    return new IntrospectAssertionController({
      decrypter: this.getTokenCrypto(),
      clientRepo: this.getClientRepo(),
      assertionRepo: this.getAssertionRepo(),
      assertionDetails: this.getAssertionDetails(),
    });
  }
}
