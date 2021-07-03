import { Token, TokenDecrypter, TokenEncrypter } from "../Token";

export class TokenEncrypterSpy implements TokenEncrypter {
  calledWithPayload: Token;

  encrypt(token: Token) {
    this.calledWithPayload = token;
    return Promise.resolve("encrypted-token");
  }
}

export class TokenDecrypterSpy implements TokenDecrypter {
  throw: boolean;
  calledWithData: string;

  decrypt(token: string) {
    if (this.throw) {
      throw Error();
    }

    this.calledWithData = token;
    return Promise.resolve<Token>({
      jti: "id",
      iss: "issuer",
      sub: "subject",
      aud: "audience",

      iat: new Date().getTime(),
      nbf: new Date(Date.now() + 1000).getTime(),
      exp: new Date(Date.now() + 2000).getTime(),
    });
  }
}
