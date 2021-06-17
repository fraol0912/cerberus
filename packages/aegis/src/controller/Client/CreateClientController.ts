import {
  errorReport,
  NoInputData,
  ClientNameNotGiven,
  AdminPasswordNotGiven,
} from "@cerberus/aegis/errors";
import { authorizer, clientRepoMongoDB } from "@cerberus/aegis/global";
import { SocketCreateClientPresenter } from "@cerberus/aegis/presenters";
import { CreateClientRequest, CreateClientUseCase } from "@cerberus/core";

export class CreateClientController {
  async handle(data: any): Promise<any> {
    try {
      this.validate(data);
      const request: CreateClientRequest = this.buildRequest(data);
      return await this.createClient(request);
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

    if (!data.clientName) {
      throw new ClientNameNotGiven("Client name was not provided.");
    }
  }

  private buildRequest(data: any): CreateClientRequest {
    return {
      name: data.clientName,
      encodedAdminPassword: data.adminPassword,
    };
  }

  private async createClient(request: CreateClientRequest) {
    const socketCreateClientPresenter = new SocketCreateClientPresenter();

    const usecase = new CreateClientUseCase({
      authorizer: authorizer,
      addClient: clientRepoMongoDB,
      presenter: socketCreateClientPresenter,
    });

    await usecase.execute(request);

    return socketCreateClientPresenter.getData();
  }
}
