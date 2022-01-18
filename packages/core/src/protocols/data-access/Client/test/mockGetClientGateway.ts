import { GetClientGateway } from "../GetClientGateway";
import { makeClient } from "@cerberus/core/entities/Client/test";

export class GetClientGatewaySpy implements GetClientGateway {
  throw: boolean;
  calledWithId: string;

  getClient(id: string) {
    if (this.throw) {
      throw Error();
    }

    this.calledWithId = id;
    return Promise.resolve(
      makeClient({
        name: "client_name",
        id,
      })
    );
  }
}
