import { makeClient } from "../../../../../entities/Client/test/mockClient";
import {
  UpdateClientGateway,
  UpdateClientParameter,
} from "../UpdateClientGateway";

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
