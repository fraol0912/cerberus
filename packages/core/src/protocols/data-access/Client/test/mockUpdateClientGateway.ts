import {
  UpdateClientGateway,
  UpdateClientParameter,
} from "../UpdateClientGateway";
import { makeClient } from "@cerberus/core/entities/Client/test";

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
