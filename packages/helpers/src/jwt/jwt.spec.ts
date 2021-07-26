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
});
