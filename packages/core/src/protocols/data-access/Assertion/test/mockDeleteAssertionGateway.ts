import { DeleteAssertionGateway } from "../DeleteAssertionGateway";

export class DeleteAssertionGatewaySpy implements DeleteAssertionGateway {
  throw: boolean;
  calledWithId: string;

  deleteAssertion(id: string) {
    if (this.throw) {
      throw Error();
    }

    this.calledWithId = id;
    return Promise.resolve(true);
  }
}
