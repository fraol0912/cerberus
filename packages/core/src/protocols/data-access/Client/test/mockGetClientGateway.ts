import { GetClientGateway } from "../GetClientGateway";
import { makeClient } from "@cerberus/core/entities/Client/test";

export class GetClientGatewaySpy implements GetClientGateway {
  calledWithId: string;

  getClient(id: string) {
    this.calledWithId = id;
    return Promise.resolve(
      makeClient({
        name: "client_name",
        id,
      })
    );
  }
}
