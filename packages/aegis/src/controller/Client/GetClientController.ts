import {
  errorReport,
  NoInputData,
  IdNotProvided,
  AdminPasswordNotGiven,
} from "@cerberus/aegis/errors";
import { GetClientRequest, GetClientUseCase } from "@cerberus/core";
import { SocketGetClientPresenter } from "@cerberus/aegis/presenters";
import { authorizer, clientRepoMongoDB } from "@cerberus/aegis/global";

export class GetClientController {
  async handle(data: any): Promise<any> {
    try {
      this.validate(data);
      const request: GetClientRequest = this.buildRequest(data);
      return await this.getClient(request);
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

  private buildRequest(data: any): GetClientRequest {
    return {
      encodedAdminPassword: data.adminPassword,
      id: data.clientId,
    };
  }

  private async getClient(request: GetClientRequest) {
    const socketGetClientPresenter = new SocketGetClientPresenter();

    const usecase = new GetClientUseCase({
      authorizer,
      loadClient: clientRepoMongoDB,
      presenter: socketGetClientPresenter,
    });

    await usecase.execute(request);

    return socketGetClientPresenter.getData();
  }
}
