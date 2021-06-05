import { DeleteClientGateway } from "..";

export class DeleteClientGatewaySpy implements DeleteClientGateway {
  calledWithId: string;

  deleteClient(id: string) {
    this.calledWithId = id;
    return Promise.resolve(true);
  }
}
