import { makeClient } from "../../../../../entities/Client/test/mockClient";
import { GetClientGateway } from "../GetClientGateway";

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
