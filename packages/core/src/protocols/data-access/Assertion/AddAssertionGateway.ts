import { Assertion } from "@cerberus/core/entities";

export interface AddAssertionGateway {
  addAssertion(assertionParams: AddAssertionParameter): Promise<Assertion>;
}

export interface AddAssertionParameter {
  name: string;
  issuer: string;
  subject: string;
  audience: string;

  expiresAt: Date;
  notBefore: Date;
  initiatedAt: Date;
}
