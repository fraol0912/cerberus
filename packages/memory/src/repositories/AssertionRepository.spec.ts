import { AssertionNotFound } from "../errors";
import { AssertionRepository } from "./AssertionRepository";

const assertionRepo = new AssertionRepository();

describe("Assertion Repository", () => {
  afterEach(() => assertionRepo.clear());

  it("adds an assertion", async () => {
    const initiatedAt = new Date();
    const expiresAt = new Date(Date.now() + 2000);
    const notBefore = new Date(Date.now() + 1000);

    const assertion = await assertionRepo.addAssertion({
      name: "name",
      issuer: "issuer",
      subject: "subject",
      audience: "audience",

      expiresAt,
      notBefore,
      initiatedAt,
    });

    expect(assertion.getId()).toBeDefined();
    expect(assertion.getName()).toBe("name");
    expect(assertion.getIssuer()).toBe("issuer");
    expect(assertion.getSubject()).toBe("subject");
    expect(assertion.getAudience()).toBe("audience");

    expect(assertion.getExpiresAt()).toStrictEqual(expiresAt);
    expect(assertion.getNotBefore()).toStrictEqual(notBefore);
    expect(assertion.getInitializedAt()).toStrictEqual(initiatedAt);
  });

  it("gets an assertion", async () => {
    const addedAssertion = await assertionRepo.addAssertion({
      name: "name",
      issuer: "issuer",
      subject: "subject",
      audience: "audience",

      initiatedAt: new Date(),
      expiresAt: new Date(Date.now() + 2000),
      notBefore: new Date(Date.now() + 1000),
    });

    const assertion = await assertionRepo.getAssertion(addedAssertion.getId());

    expect(assertion.getId()).toBe(addedAssertion.getId());
    expect(assertion.getName()).toBe(addedAssertion.getName());
    expect(assertion.getIssuer()).toBe(addedAssertion.getIssuer());
    expect(assertion.getSubject()).toBe(addedAssertion.getSubject());
    expect(assertion.getAudience()).toBe(addedAssertion.getAudience());

    expect(assertion.getExpiresAt()).toStrictEqual(
      addedAssertion.getExpiresAt()
    );
    expect(assertion.getNotBefore()).toStrictEqual(
      addedAssertion.getNotBefore()
    );
    expect(assertion.getInitializedAt()).toStrictEqual(
      addedAssertion.getInitializedAt()
    );
  });

  it("throws if the assertion is not found", async () => {
    let error: Error = new Error();

    try {
      await assertionRepo.getAssertion("random_id");
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(AssertionNotFound);
  });

  it("lists assertions", async () => {
    const initiatedAt = new Date();
    const expiresAt = new Date(Date.now() + 2000);
    const notBefore = new Date(Date.now() + 1000);

    const addedAssertion = await assertionRepo.addAssertion({
      name: "name",
      issuer: "issuer",
      subject: "subject",
      audience: "audience",

      expiresAt,
      notBefore,
      initiatedAt,
    });

    const [assertion] = await assertionRepo.listAssertions();

    expect(assertion.getId()).toBe(addedAssertion.getId());
    expect(assertion.getName()).toBe(addedAssertion.getName());
    expect(assertion.getIssuer()).toBe(addedAssertion.getIssuer());
    expect(assertion.getSubject()).toBe(addedAssertion.getSubject());
    expect(assertion.getAudience()).toBe(addedAssertion.getAudience());

    expect(assertion.getExpiresAt()).toStrictEqual(
      addedAssertion.getExpiresAt()
    );
    expect(assertion.getNotBefore()).toStrictEqual(
      addedAssertion.getNotBefore()
    );
    expect(assertion.getInitializedAt()).toStrictEqual(
      addedAssertion.getInitializedAt()
    );
  });
});
