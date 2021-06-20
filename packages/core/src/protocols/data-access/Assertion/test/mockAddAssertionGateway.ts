import {
  AddAssertionGateway,
  AddAssertionParameter,
} from "../AddAssertionGateway";
import { makeAssertion } from "@cerberus/core/entities/Assertion/test";

export class AddAssertionGatewaySpy implements AddAssertionGateway {
  calledWithAssertionParams: AddAssertionParameter;

  addAssertion(assertionParams: AddAssertionParameter) {
    this.calledWithAssertionParams = assertionParams;
    return Promise.resolve(makeAssertion());
  }
}
