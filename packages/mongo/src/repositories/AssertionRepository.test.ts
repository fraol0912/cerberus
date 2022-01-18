import { clearDB, closeDB, connectToDB } from "../db";
import { InvalidId, AssertionNotFound } from "../errors";
import { AssertionRepository, ClientRepository } from ".";

//
const URI = "mongodb://localhost:27017/cerberus";

describe("Assertion Repository", () => {
  let clientRepo: ClientRepository;
  let assertionRepo: AssertionRepository;
  beforeEach(async () => {
    await connectToDB(URI);
    clientRepo = new ClientRepository();
    assertionRepo = new AssertionRepository();
  });
  afterEach(async () => {
    await clearDB();
    await closeDB();
  });

  describe("Add Assertion", () => {
    it("adds an assertion to the db.", async () => {
      const client = await clientRepo.addClient({
        name: "client",
      });

      const now = Date.now();
      const assertion = await assertionRepo.addAssertion({
        name: "name",
        issuer: "issuer",
        audience: "audience",
        subject: client.getId(),

        initiatedAt: new Date(now),
        notBefore: new Date(now + 10000),
        expiresAt: new Date(now + 30000),
      });

      expect(assertion.getName()).toBe("name");
      expect(assertion.getIssuer()).toBe("issuer");
      expect(assertion.getAudience()).toBe("audience");
      expect(assertion.getSubject()).toBe(client.getId());

      expect(assertion.getInitializedAt().getTime()).toBe(now);
      expect(assertion.getNotBefore().getTime()).toBe(now + 10000);
      expect(assertion.getExpiresAt().getTime()).toBe(now + 30000);
    });
  });

  describe("Get Assertion", () => {
    it("throws if id is not valid.", async () => {
      expect.assertions(1);
      try {
        await assertionRepo.getAssertion("invalid");
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidId);
      }
    });

    it("throws if the assertion is not found.", async () => {
      expect.assertions(1);
      try {
        await assertionRepo.getAssertion("60c48c7a9732777bd5fdca2a");
      } catch (error) {
        expect(error).toBeInstanceOf(AssertionNotFound);
      }
    });

    it("gets an assertion", async () => {
      const client = await clientRepo.addClient({
        name: "client",
      });

      const now = Date.now();
      const added = await assertionRepo.addAssertion({
        name: "name",
        issuer: "issuer",
        audience: "audience",
        subject: client.getId(),

        initiatedAt: new Date(now),
        notBefore: new Date(now + 10000),
        expiresAt: new Date(now + 30000),
      });

      const assertion = await assertionRepo.getAssertion(added.getId());

      expect(assertion.getName()).toBe("name");
      expect(assertion.getIssuer()).toBe("issuer");
      expect(assertion.getAudience()).toBe("audience");
      expect(assertion.getSubject()).toBe(client.getId());

      expect(assertion.getInitializedAt().getTime()).toBe(now);
      expect(assertion.getNotBefore().getTime()).toBe(now + 10000);
      expect(assertion.getExpiresAt().getTime()).toBe(now + 30000);
    });
  });

  describe("List Assertions", () => {
    it("gets a list of assertions", async () => {
      const client = await clientRepo.addClient({
        name: "client",
      });

      const now = Date.now();
      const assertion = await assertionRepo.addAssertion({
        name: "name",
        issuer: "issuer",
        audience: "audience",
        subject: client.getId(),

        initiatedAt: new Date(now),
        notBefore: new Date(now + 10000),
        expiresAt: new Date(now + 30000),
      });

      const assertions = await assertionRepo.listAssertions();

      expect(assertions.length).toBe(1);

      expect(assertion.getId()).toBe(assertions[0].getId());
      expect(assertion.getName()).toBe(assertions[0].getName());
      expect(assertion.getIssuer()).toBe(assertions[0].getIssuer());
      expect(assertion.getAudience()).toBe(assertions[0].getAudience());
      expect(assertion.getSubject()).toBe(assertions[0].getSubject());

      expect(assertion.getInitializedAt().getTime()).toBe(
        assertions[0].getInitializedAt().getTime()
      );
      expect(assertion.getNotBefore().getTime()).toBe(
        assertions[0].getNotBefore().getTime()
      );
      expect(assertion.getExpiresAt().getTime()).toBe(
        assertions[0].getExpiresAt().getTime()
      );
    });
  });

  describe("Delete Assertion", () => {
    it("doesn't delete an assertion with an invalid id", async () => {
      const deleted = await assertionRepo.deleteAssertion("id");

      expect(deleted).toBe(false);
    });

    it("doesn't delete an assertion that doesn't exist", async () => {
      const deleted = await assertionRepo.deleteAssertion(
        "60c48c7a9732777bd5fdca2a"
      );

      expect(deleted).toBe(false);
    });

    it("deletes an assertion", async () => {
      const client = await clientRepo.addClient({
        name: "client",
      });

      const now = Date.now();
      const assertion = await assertionRepo.addAssertion({
        name: "name",
        issuer: "issuer",
        audience: "audience",
        subject: client.getId(),

        initiatedAt: new Date(now),
        notBefore: new Date(now + 10000),
        expiresAt: new Date(now + 30000),
      });

      const deleted = await assertionRepo.deleteAssertion(assertion.getId());

      expect(deleted).toBe(true);
    });
  });
});
