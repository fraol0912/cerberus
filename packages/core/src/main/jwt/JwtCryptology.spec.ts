import { JwtCryptology } from "./JwtCryptology";
import { makeAssertion } from "@cerberus/core/entities/Assertion/test";

describe("JWT Cryptology", () => {
  let jwt: JwtCryptology;
  beforeAll(() => {
    jwt = new JwtCryptology("password");
  });

  it("encrypts and decrypts", async () => {
    const assertion = makeAssertion();

    const token = {
      jti: assertion.getId(),
      iss: assertion.getIssuer(),
      sub: assertion.getSubject(),
      aud: assertion.getAudience(),
      nbf: assertion.getNotBefore().getTime(),
      exp: assertion.getExpiresAt().getTime(),
      iat: assertion.getInitializedAt().getTime(),
    };

    const encrypted = await jwt.encrypt(token);
    const decrypted = await jwt.decrypt(encrypted);

    expect(decrypted).toStrictEqual(token);
  });
});
