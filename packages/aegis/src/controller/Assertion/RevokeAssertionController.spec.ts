import { testController } from "@cerberus/aegis/test";
import { RevokeAssertionController } from "./RevokeAssertionController";

const revokeAssertion: RevokeAssertionController =
  testController.getRevokeAssertionController();

const clientRepo = testController.getClientRepo();
const assertionRepo = testController.getAssertionRepo();

const PASSWORD = Buffer.from("password", "utf-8").toString("base64");

describe("Revoke Assertion Controller", () => {
  afterEach(() => {
    clientRepo.clear();
    assertionRepo.clear();
  });

  test("with no data", async () => {
    const data = await revokeAssertion.handle();

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "NoInputData",
      message: "No input was provided.",
    });
  });

  test("with no admin password", async () => {
    const data = await revokeAssertion.handle({});

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "AdminPasswordNotGiven",
      message: "Admin password was not provided.",
    });
  });

  test("with no assertion id", async () => {
    const data = await revokeAssertion.handle({
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

    const data = await revokeAssertion.handle({
      adminPassword: PASSWORD,
      assertionId: assertion.getId(),
    });

    expect(data.success).toBe(true);
    expect(data.data.revoked).toBe(true);
  });
});
