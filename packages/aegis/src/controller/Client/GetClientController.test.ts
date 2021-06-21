import { testController } from "@cerberus/aegis/test";
import { GetClientController } from "./GetClientController";
import { clearDB, closeDB, connectToDB } from "@cerberus/mongo";
import { CreateClientController } from "./CreateClientController";

let createClient: CreateClientController =
  testController.getCreateClientController();
let getClient: GetClientController = testController.getGetClientController();

const PASSWORD = Buffer.from("password", "utf-8").toString("base64");

describe("Get Client Controller", () => {
  beforeAll(async () => {
    await connectToDB("mongodb://localhost:27017/cerberus");
  });
  afterAll(async () => {
    await clearDB();
    await closeDB();
  });

  test("with no data", async () => {
    const data = await getClient.handle();

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "NoInputData",
      message: "No input was provided.",
    });
  });

  test("with no admin password", async () => {
    const data = await getClient.handle({});

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "AdminPasswordNotGiven",
      message: "Admin password was not provided.",
    });
  });

  test("with no client id", async () => {
    const data = await getClient.handle({
      adminPassword: "xxxx",
    });

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "IdNotProvidedError",
      message: "No id was provided, couldn't find the client",
    });
  });

  test("with an invalid client id", async () => {
    const data = await getClient.handle({
      clientId: "xxxx",
      adminPassword: PASSWORD,
    });

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({ name: "InvalidId", message: "" });
  });

  test("with an invalid password", async () => {
    const data = await getClient.handle({
      clientId: "xxxx",
      adminPassword: "wrong_password",
    });

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({ name: "Unauthorized", message: "" });
  });

  test("with an id that doesn't exist but is valid", async () => {
    const data = await getClient.handle({
      adminPassword: PASSWORD,
      clientId: "60c48c7a9732777bd5fdca2a",
    });

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({ name: "ClientNotFound", message: "" });
  });

  test("Get Client Successfully", async () => {
    const client = await createClient.handle({
      adminPassword: PASSWORD,
      clientName: "client_name",
    });

    const data = await getClient.handle({
      adminPassword: PASSWORD,
      clientId: client.data.id,
    });

    expect(data.success).toBe(true);
    expect(data.data.id).toBe(client.data.id);
    expect(data.data.name).toBe(client.data.name);
  });
});
