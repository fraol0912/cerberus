export interface TokenEncrypter {
  encrypt(token: Token): Promise<string>;
}

export interface TokenDecrypter {
  decrypt(token: string): Promise<Token>;
}

export interface Token {
  jti: string;
  iss: string;
  sub: string;
  aud: string;

  exp: number;
  nbf: number;
  iat: number;
}
