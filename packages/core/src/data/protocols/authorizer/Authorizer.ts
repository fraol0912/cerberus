export interface Authorizer {
  isValid(password: string): Promise<boolean>;
}
