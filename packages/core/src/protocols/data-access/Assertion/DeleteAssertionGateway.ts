import { Assertion } from "@cerberus/core/entities";

export interface DeleteAssertionGateway {
  deleteAssertion(id: string): Promise<Assertion>;
}
