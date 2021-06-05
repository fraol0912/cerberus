import { makeClient } from "../../../../../entities/Client/test/mockClient";
import { ListClientGateway } from "../ListClientGateway";

export class ListClientGatewaySpy implements ListClientGateway {
  called: boolean = false;

  listClients() {
    this.called = true;
    return Promise.resolve([
      makeClient({
        id: "id",
        name: "client_name",
      }),
    ]);
  }
}
