import { DeleteClientGateway } from "../DeleteClientGateway";

export class DeleteClientGatewaySpy implements DeleteClientGateway {
  calledWithId: string;

  deleteClient(id: string) {
    this.calledWithId = id;
    return Promise.resolve(true);
  }
}
