import { Token, TokenEncrypter } from "../TokenEncrypter";

export class TokenEncrypterSpy implements TokenEncrypter {
  calledWithPayload: Token;

  encrypt(token: Token) {
    this.calledWithPayload = token;
    return Promise.resolve("encrypted-token");
  }
}
