import { testController } from "@cerberus/aegis/test";
import { GetAssertionController } from "./GetAssertionController";

const getAssertion: GetAssertionController =
  testController.getGetAssertionController();

const clientRepo = testController.getClientRepo();
const assertionRepo = testController.getAssertionRepo();

const PASSWORD = Buffer.from("password", "utf-8").toString("base64");

describe("Get Assertion Controller", () => {
  afterEach(() => {
    clientRepo.clear();
    assertionRepo.clear();
  });

  test("with no data", async () => {
    const data = await getAssertion.handle();

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "NoInputData",
      message: "No input was provided.",
    });
  });

  test("with no admin password", async () => {
    const data = await getAssertion.handle({});

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "AdminPasswordNotGiven",
      message: "Admin password was not provided.",
    });
  });

  test("with no assertion id", async () => {
    const data = await getAssertion.handle({
      adminPassword: PASSWORD,
    });

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "IdNotProvidedError",
      message: "Assertion id was not provided.",
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

    const data = await getAssertion.handle({
      adminPassword: PASSWORD,
      assertionId: assertion.getId(),
    });

    expect(data.success).toBe(true);
    expect(data.data.id).toBe(assertion.getId());
    expect(data.data.name).toBe(assertion.getName());
    expect(data.data.issuer).toBe(assertion.getIssuer());
    expect(data.data.audience).toBe(assertion.getAudience());
    expect(data.data.expiresAt).toBe(assertion.getExpiresAt().getTime());
    expect(data.data.notBefore).toBe(assertion.getNotBefore().getTime());
    expect(data.data.initiatedAt).toBe(assertion.getInitializedAt().getTime());
    expect(data.data.valid).toBe(true);

    expect(data.data.subject.id).toBe(client.getId());
    expect(data.data.subject.name).toBe(client.getName());
  });
});
