export interface AssertionDetailsGateway {
  getIssuerName(): Promise<string>;
  getAudienceField(): Promise<string>;
}
