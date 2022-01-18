import { makeClient } from "@cerberus/core/entities/Client/test";
import { AddClientGateway, AddClientParameter } from "../AddClientGateway";

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
