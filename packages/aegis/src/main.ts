import {
  GetClientController,
  ListClientController,
  CreateClientController,
  DeleteClientController,
  UpdateClientController,
} from "./controller";
import { ClientRepository } from "@cerberus/aegis/protocols";
import { AdminRepository, MainAuthorizer, MainDecoder } from "@cerberus/core";

export abstract class Controller {
  abstract getAdminPassword(): string;
  abstract getClientRepo(): ClientRepository;

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
}
