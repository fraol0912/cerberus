import { jwt } from ".";

describe("Encrypt", () => {
  it("encrypts an object", async () => {
    const payload = {
      random: 403,
      iat: 1000000000,
    };

    const token = await jwt.encrypt(payload, "password");
    const decoded = await jwt.decrypt(token, "password");

    expect(decoded).toStrictEqual(payload);
  });

  it("ignores not before", async () => {
    const token = await jwt.decrypt(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJpZCIsImlzcyI6Imlzc3VlciIsInN1YiI6InN1YmplY3QiLCJhdWQiOiJhdWRpZW5jZSIsIm5iZiI6MTYyNzMyMzYxNjg0MywiZXhwIjoxNjI3MzIzNjE3ODQzLCJpYXQiOjE2MjczMjM2MTU4NDN9.va5U2Js08AsZtOEeC8xH9A6yqy0iwLh0p2fNCiwTers",
      "password"
    );

    expect(token).toStrictEqual({
      jti: "id",
      iss: "issuer",
      sub: "subject",
      aud: "audience",
      nbf: 1627323616843,
      exp: 1627323617843,
      iat: 1627323615843,
    });
  });
});
