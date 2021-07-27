import { testController } from "@cerberus/aegis/test";
import { ListAssertionController } from "./ListAssertionController";

const listAssertion: ListAssertionController =
  testController.getListAssertionController();

const clientRepo = testController.getClientRepo();
const assertionRepo = testController.getAssertionRepo();

const PASSWORD = Buffer.from("password", "utf-8").toString("base64");

describe("List Assertion Controller", () => {
  afterEach(() => {
    clientRepo.clear();
    assertionRepo.clear();
  });

  test("with no data", async () => {
    const data = await listAssertion.handle();

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "NoInputData",
      message: "No input was provided.",
    });
  });

  test("with no admin password", async () => {
    const data = await listAssertion.handle({});

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "AdminPasswordNotGiven",
      message: "Admin password was not provided.",
    });
  });

  test("success", async () => {
    const now = Date.now();
    const client = await clientRepo.addClient({
      name: "client-name",
    });
    const assertion = await assertionRepo.addAssertion({
      issuer: "issuer",
      audience: "audience",
      name: "assertion-name",
      subject: client.getId(),
      initiatedAt: new Date(now),
      expiresAt: new Date(now + 30000),
      notBefore: new Date(now + 30000),
    });

    const data = await listAssertion.handle({
      adminPassword: PASSWORD,
    });

    const assert = data.data.assertions[0];

    expect(data.success).toBe(true);
    expect(assert.id).toBe(assertion.getId());
    expect(assert.name).toBe(assertion.getName());
    expect(assert.issuer).toBe(assertion.getIssuer());
    expect(assert.audience).toBe(assertion.getAudience());
    expect(assert.expiresAt).toBe(assertion.getExpiresAt().getTime());
    expect(assert.notBefore).toBe(assertion.getNotBefore().getTime());
    expect(assert.initiatedAt).toBe(assertion.getInitializedAt().getTime());
    expect(assert.valid).toBe(true);

    expect(assert.subject.id).toBe(client.getId());
    expect(assert.subject.name).toBe(client.getName());
  });
});
