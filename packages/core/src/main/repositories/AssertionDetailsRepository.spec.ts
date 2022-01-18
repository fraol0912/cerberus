import { AssertionDetailsRepository } from "./AssertionDetailsRepository";

describe("Assertion Details Repository", () => {
  let repo: AssertionDetailsRepository;
  beforeAll(() => {
    repo = new AssertionDetailsRepository({
      issuer: "issuer",
      audience: "audience",
    });
  });

  it("gets issuer name", async () => {
    expect(await repo.getIssuerName()).toBe("issuer");
  });

  it("gets audience field", async () => {
    expect(await repo.getAudienceField()).toBe("audience");
  });
});
