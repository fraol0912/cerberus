import {
  Token,
  TokenEncrypter,
  TokenDecrypter,
} from "@cerberus/core/protocols/cryptology/Token";

import { jwt } from "@cerberus/helpers";

export class JwtCryptology implements TokenDecrypter, TokenEncrypter {
  private password: string;
  constructor(password: string) {
    this.password = password;
  }

  encrypt(token: Token): Promise<string> {
    return jwt.encrypt(token, this.password);
  }

  decrypt(token: string): Promise<Token> {
    return jwt.decrypt(token, this.password) as Promise<Token>;
  }
}
