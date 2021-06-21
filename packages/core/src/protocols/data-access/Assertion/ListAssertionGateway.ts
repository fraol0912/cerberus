import { Assertion } from "@cerberus/core/entities";

export interface ListAssertionGateway {
  listAssertions(): Promise<Assertion[]>;
}
