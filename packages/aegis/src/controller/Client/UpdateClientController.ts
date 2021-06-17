import {
  errorReport,
  NoInputData,
  IdNotProvided,
  ClientNameNotGiven,
  AdminPasswordNotGiven,
} from "@cerberus/aegis/errors";
import { authorizer, clientRepoMongoDB } from "@cerberus/aegis/global";
import { SocketUpdateClientPresenter } from "@cerberus/aegis/presenters";
import { UpdateClientRequest, UpdateClientUseCase } from "@cerberus/core";

export class UpdateClientController {
  async handle(data: any): Promise<any> {
    try {
      this.validate(data);
      const request: UpdateClientRequest = this.buildRequest(data);
      return await this.updateClient(request);
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

    if (!data.clientId) {
      throw new IdNotProvided("No id was provided, couldn't find the client");
    }

    if (!data.clientName) {
      throw new ClientNameNotGiven("Client name was not provided.");
    }
  }

  private buildRequest(data: any): UpdateClientRequest {
    return {
      id: data.clientId,
      name: data.clientName,
      encodedAdminPassword: data.adminPassword,
    };
  }

  private async updateClient(request: UpdateClientRequest) {
    const socketGetClientPresenter = new SocketUpdateClientPresenter();

    const usecase = new UpdateClientUseCase({
      authorizer,
      updateClient: clientRepoMongoDB,
      presenter: socketGetClientPresenter,
    });

    await usecase.execute(request);

    return socketGetClientPresenter.getData();
  }
}
