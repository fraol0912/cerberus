import {
  Assertion,
  AddAssertionGateway,
  GetAssertionGateway,
  AddAssertionParameter,
  ListAssertionGateway,
} from "@cerberus/core";
import { generateId } from "../helpers";
import { AssertionNotFound } from "../errors";

export class AssertionRepository
  implements AddAssertionGateway, GetAssertionGateway, ListAssertionGateway
{
  private hashMap: Map<string, Assertion>;
  constructor() {
    this.hashMap = new Map();
  }

  async getAssertion(id: string) {
    const assertion = this.hashMap.get(id);

    if (!assertion) {
      throw new AssertionNotFound();
    }

    return assertion;
  }

  async addAssertion(params: AddAssertionParameter) {
    const assertion = new Assertion({
      id: generateId(),
      name: params.name,
      issuer: params.issuer,
      subject: params.subject,
      audience: params.audience,

      expiresAt: params.expiresAt,
      notBefore: params.notBefore,
      initiatedAt: params.initiatedAt,
    });

    this.hashMap.set(assertion.getId(), assertion);

    return assertion;
  }

  async listAssertions() {
    return Array.from(this.hashMap.values());
  }

  clear() {
    this.hashMap.clear();
  }
}
