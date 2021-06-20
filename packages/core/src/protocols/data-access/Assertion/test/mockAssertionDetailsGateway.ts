import { AssertionDetailsGateway } from "../AssertionDetailsGateway";

export class AssertionDetailsGatewaySpy implements AssertionDetailsGateway {
  calledLoadIssuerName = false;
  calledLoadAudienceField = false;

  getIssuerName() {
    this.calledLoadIssuerName = true;
    return Promise.resolve("issuer");
  }

  getAudienceField() {
    this.calledLoadAudienceField = true;
    return Promise.resolve("audience");
  }
}
