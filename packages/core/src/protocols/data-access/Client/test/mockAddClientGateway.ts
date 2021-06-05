import { AddClientGateway, AddClientParameter } from "..";
import { makeClient } from "../../../../entities/Client/test";

export class AddClientGatewaySpy implements AddClientGateway {
  calledWithClientParams: AddClientParameter;

  addClient(clientParams: AddClientParameter) {
    this.calledWithClientParams = clientParams;
    return Promise.resolve(
      makeClient({
        name: clientParams.name,
        id: "id",
      })
    );
  }
}
