export interface Authorizer {
  isValid(): Promise<boolean>;
}
