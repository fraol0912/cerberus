import { ListAssertionGateway } from "../ListAssertionGateway";
import { makeAssertion } from "@cerberus/core/entities/Assertion/test";

export class ListAssertionGatewaySpy implements ListAssertionGateway {
  called: boolean = false;

  listAssertions() {
    this.called = true;
    return Promise.resolve([makeAssertion()]);
  }
}
