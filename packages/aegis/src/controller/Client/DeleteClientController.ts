import {
  errorReport,
  NoInputData,
  IdNotProvided,
  AdminPasswordNotGiven,
} from "@cerberus/aegis/errors";
import { authorizer, clientRepoMongoDB } from "@cerberus/aegis/global";
import { SocketDeleteClientPresenter } from "@cerberus/aegis/presenters";
import { DeleteClientRequest, DeleteClientUseCase } from "@cerberus/core";

export class DeleteClientController {
  async handle(data: any): Promise<any> {
    try {
      this.validate(data);
      const request: DeleteClientRequest = this.buildRequest(data);
      return await this.deleteClient(request);
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
  }

  private buildRequest(data: any): DeleteClientRequest {
    return {
      encodedAdminPassword: data.adminPassword,
      id: data.clientId,
    };
  }

  private async deleteClient(request: DeleteClientRequest) {
    const socketDeleteClientPresenter = new SocketDeleteClientPresenter();

    const usecase = new DeleteClientUseCase({
      authorizer,
      deleteClient: clientRepoMongoDB,
      presenter: socketDeleteClientPresenter,
    });

    await usecase.execute(request);

    return socketDeleteClientPresenter.getData();
  }
}
