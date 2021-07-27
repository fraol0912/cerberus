export interface DeleteAssertionGateway {
  deleteAssertion(id: string): Promise<boolean>;
}
