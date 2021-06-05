import { UpdateClientGateway, UpdateClientParameter } from "..";
import { makeClient } from "../../../../entities/Client/test";

export class UpdateClientGatewaySpy implements UpdateClientGateway {
  calledWithId: string;
  calledWithClientParams: UpdateClientParameter;

  updateClient(id: string, clientParams: UpdateClientParameter) {
    this.calledWithId = id;
    this.calledWithClientParams = clientParams;

    return Promise.resolve(
      makeClient({
        name: clientParams.name,
        id,
      })
    );
  }
}
