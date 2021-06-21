import { GetAssertionGateway } from "../GetAssertionGateway";
import { makeAssertion } from "@cerberus/core/entities/Assertion/test";

export class GetAssertionGatewaySpy implements GetAssertionGateway {
  calledWithId: string;

  getAssertion(id: string) {
    this.calledWithId = id;
    return Promise.resolve(makeAssertion());
  }
}
