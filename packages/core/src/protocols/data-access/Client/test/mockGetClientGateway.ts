import { GetClientGateway } from "..";
import { makeClient } from "../../../../entities/Client/test";

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
