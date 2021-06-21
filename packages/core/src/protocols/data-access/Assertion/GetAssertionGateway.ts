import { Assertion } from "@cerberus/core/entities";

export interface GetAssertionGateway {
  getAssertion(id: string): Promise<Assertion>;
}
