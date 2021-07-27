import { testController } from "@cerberus/aegis/test";
import { CreateAssertionController } from "./CreateAssertionController";

const createAssertion: CreateAssertionController =
  testController.getCreateAssertionController();

const clientRepo = testController.getClientRepo();
const assertionRepo = testController.getAssertionRepo();

const PASSWORD = Buffer.from("password", "utf-8").toString("base64");

describe("Create Assertion Controller", () => {
  afterEach(() => {
    clientRepo.clear();
    assertionRepo.clear();
  });

  test("with no data", async () => {
    const data = await createAssertion.handle();

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "NoInputData",
      message: "No input was provided.",
    });
  });

  test("with no admin password", async () => {
    const data = await createAssertion.handle({});

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "AdminPasswordNotGiven",
      message: "Admin password was not provided.",
    });
  });

  test("with no assertion name", async () => {
    const data = await createAssertion.handle({
      adminPassword: PASSWORD,
    });

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "AssertionNameNotGiven",
      message: "Assertion name was not provided.",
    });
  });

  test("with no client id", async () => {
    const data = await createAssertion.handle({
      adminPassword: PASSWORD,
      assertionName: "assertion-name",
    });

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "IdNotProvidedError",
      message: "Client id was not provided.",
    });
  });

  test("with no expires at", async () => {
    const data = await createAssertion.handle({
      clientId: "client-id",
      adminPassword: PASSWORD,
      assertionName: "assertion-name",
    });

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "ExpiryDateNotGiven",
      message: "Expiry date was not provided.",
    });
  });

  test("with expires at that is not a number", async () => {
    const data = await createAssertion.handle({
      clientId: "client-id",
      expiresAt: "tomorrow",
      adminPassword: PASSWORD,
      assertionName: "assertion-name",
    });

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "ExpiryDateWasNotANumber",
      message: "Expiry date provided is not a number.",
    });
  });

  test("with no not before date", async () => {
    const data = await createAssertion.handle({
      clientId: "client-id",
      expiresAt: "5000000000",
      adminPassword: PASSWORD,
      assertionName: "assertion-name",
    });

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "NotBeforeDateNotGiven",
      message: "Not before date was not provided.",
    });
  });

  test("with not before date that is not a number", async () => {
    const data = await createAssertion.handle({
      notBefore: "may 10",
      clientId: "client-id",
      expiresAt: "5000000000",
      adminPassword: PASSWORD,
      assertionName: "assertion-name",
    });

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "NotBeforeDateWasNotANumber",
      message: "Not before date is not a number.",
    });
  });

  test("with an incorrect admin password", async () => {
    const data = await createAssertion.handle({
      clientId: "client-id",
      expiresAt: "5000000000",
      notBefore: "5000000000",
      adminPassword: "PASSWORD",
      assertionName: "assertion-name",
    });

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({ name: "Unauthorized", message: "" });
  });

  test("with a client that doesn't exist", async () => {
    const data = await createAssertion.handle({
      clientId: "client-id",
      expiresAt: "5000000000",
      notBefore: "5000000000",
      adminPassword: PASSWORD,
      assertionName: "assertion-name",
    });

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({ name: "ClientNotFound", message: "" });
  });

  test("success", async () => {
    const client = await clientRepo.addClient({
      name: "client",
    });

    const now = Date.now();

    const data = await createAssertion.handle({
      expiresAt: String(now + 30000),
      notBefore: String(now + 10000),
      adminPassword: PASSWORD,
      clientId: client.getId(),
      assertionName: "assertion-name",
    });

    expect(data.success).toBe(true);
    expect(data.data.valid).toBe(true);
    expect(data.data.issuer).toBe("issuer");
    expect(data.data.audience).toBe("audience");
    expect(data.data.name).toBe("assertion-name");
    expect(data.data.subject.name).toBe("client");
  });
});
