import {
  errorReport,
  NoInputData,
  AdminPasswordNotGiven,
} from "@cerberus/aegis/errors";
import { ListClientRequest, ListClientUseCase } from "@cerberus/core";
import { SocketListClientPresenter } from "@cerberus/aegis/presenters";
import { authorizer, clientRepoMongoDB } from "@cerberus/aegis/global";

export class ListClientController {
  async handle(data: any): Promise<any> {
    try {
      this.validate(data);
      const request: ListClientRequest = this.buildRequest(data);
      return await this.listClients(request);
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
  }

  private buildRequest(data: any): ListClientRequest {
    return {
      encodedAdminPassword: data.adminPassword,
    };
  }

  private async listClients(request: ListClientRequest) {
    const socketListClientPresenter = new SocketListClientPresenter();

    const usecase = new ListClientUseCase({
      authorizer,
      listClients: clientRepoMongoDB,
      presenter: socketListClientPresenter,
    });

    await usecase.execute(request);

    return socketListClientPresenter.getData();
  }
}
