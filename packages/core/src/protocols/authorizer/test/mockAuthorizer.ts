import { Authorizer } from "../Authorizer";

class DummyAuthorizer implements Authorizer {
  protected valid: boolean;

  isValid() {
    return Promise.resolve(this.valid);
  }
}

export class RejectingAuthorizer extends DummyAuthorizer {
  protected valid = false;
}

export class AcceptingAuthorizer extends DummyAuthorizer {
  protected valid = true;
}

export class AuthorizerSpy implements Authorizer {
  calledWithPassword: string;
  valid: boolean;

  isValid(password: string) {
    this.calledWithPassword = password;
    return Promise.resolve(this.valid);
  }
}
