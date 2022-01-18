import { AssertionDetailsGateway } from "@cerberus/core/protocols/data-access";

export class AssertionDetailsRepository implements AssertionDetailsGateway {
  private issuerName: string;
  private audienceField: string;

  constructor(config: AssertionDetailsConfig) {
    this.issuerName = config.issuer;
    this.audienceField = config.audience;
  }

  getIssuerName() {
    return Promise.resolve(this.issuerName);
  }

  getAudienceField() {
    return Promise.resolve(this.audienceField);
  }
}

interface AssertionDetailsConfig {
  issuer: string;
  audience: string;
}
