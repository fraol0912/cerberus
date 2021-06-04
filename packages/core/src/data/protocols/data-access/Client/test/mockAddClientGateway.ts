import { makeClient } from "../../../../../entities/Client/test/mockClient";
import { AddClientGateway, AddClientParameter } from "../AddClientGateway";

export class AddClientGatewaySpy implements AddClientGateway {
  calledWithClientParams: AddClientParameter;

  addClient(clientParams: AddClientParameter) {
    this.calledWithClientParams = clientParams;
    return Promise.resolve(makeClient());
  }
}
