import { testController } from "@cerberus/aegis/test";
import { IntrospectAssertionController, CreateAssertionController } from ".";

const introspectAssertion: IntrospectAssertionController =
  testController.getIntrospectAssertionController();
const createAssertion: CreateAssertionController =
  testController.getCreateAssertionController();

const clientRepo = testController.getClientRepo();
const assertionRepo = testController.getAssertionRepo();

const PASSWORD = Buffer.from("password", "utf-8").toString("base64");

describe("Introspect Assertion Controller", () => {
  afterEach(() => {
    clientRepo.clear();
    assertionRepo.clear();
  });

  test("with no data", async () => {
    const data = await introspectAssertion.handle();

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "NoInputData",
      message: "No input was provided.",
    });
  });

  test("with no assertion", async () => {
    const data = await introspectAssertion.handle({});

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "AssertionTokenNotGiven",
      message: "The token to be introspected is not provided.",
    });
  });

  test("success", async () => {
    const client = await clientRepo.addClient({
      name: "client",
    });
    const now = Date.now();
    const { data } = await createAssertion.handle({
      expiresAt: String(now + 30000),
      notBefore: String(now + 10000),
      adminPassword: PASSWORD,
      clientId: client.getId(),
      assertionName: "assertion-name",
    });

    const introspected = await introspectAssertion.handle({
      assertion: data.token,
    });

    expect(introspected.success).toBe(true);
    expect(introspected.data.active).toBe(true);
  });
});
