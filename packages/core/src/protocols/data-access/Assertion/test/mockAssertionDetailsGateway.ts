import { AssertionDetailsGateway } from "../AssertionDetailsGateway";

export class AssertionDetailsGatewaySpy implements AssertionDetailsGateway {
  calledLoadIssuerName = false;
  calledLoadAudienceField = false;

  issuerName = "issuer";
  audienceField = "audience";

  getIssuerName() {
    this.calledLoadIssuerName = true;
    return Promise.resolve(this.issuerName);
  }

  getAudienceField() {
    this.calledLoadAudienceField = true;
    return Promise.resolve(this.audienceField);
  }
}
