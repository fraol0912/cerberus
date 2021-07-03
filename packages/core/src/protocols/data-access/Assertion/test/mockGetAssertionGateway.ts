import { GetAssertionGateway } from "../GetAssertionGateway";
import { makeAssertion } from "@cerberus/core/entities/Assertion/test";

export class GetAssertionGatewaySpy implements GetAssertionGateway {
  throw: boolean;
  calledWithId: string;

  getAssertion(id: string) {
    if (this.throw) {
      throw Error();
    }

    this.calledWithId = id;
    return Promise.resolve(makeAssertion());
  }
}
