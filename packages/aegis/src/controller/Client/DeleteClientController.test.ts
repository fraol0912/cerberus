import { testController } from "@cerberus/aegis/test";
import { clearDB, closeDB, connectToDB } from "@cerberus/mongo";
import { CreateClientController } from "./CreateClientController";
import { DeleteClientController } from "./DeleteClientController";

let deleteClient: DeleteClientController =
  testController.getDeleteClientController();
let createClient: CreateClientController =
  testController.getCreateClientController();

const PASSWORD = Buffer.from("password", "utf-8").toString("base64");

describe("Delete Client Controller", () => {
  beforeAll(async () => {
    await connectToDB("mongodb://localhost:27017/cerberus");
  });
  afterAll(async () => {
    await clearDB();
    await closeDB();
  });

  test("with no data", async () => {
    const data = await deleteClient.handle();

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "NoInputData",
      message: "No input was provided.",
    });
  });

  test("with no client id", async () => {
    const data = await deleteClient.handle({
      adminPassword: "xxxx",
    });

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "IdNotProvidedError",
      message: "No id was provided, couldn't find the client",
    });
  });

  test("with no admin password", async () => {
    const data = await deleteClient.handle({});

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "AdminPasswordNotGiven",
      message: "Admin password was not provided.",
    });
  });

  test("with an invalid client id", async () => {
    const data = await deleteClient.handle({
      clientId: "xxxx",
      adminPassword: PASSWORD,
    });

    expect(data.success).toBe(true);
    expect(data.data).toStrictEqual({ deleted: false });
  });

  test("with an invalid password", async () => {
    const data = await deleteClient.handle({
      adminPassword: "wrong_password",
      clientId: "xxxx",
    });

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({ name: "Unauthorized", message: "" });
  });

  test("with an id that doesn't exist but is valid", async () => {
    const data = await deleteClient.handle({
      adminPassword: PASSWORD,
      clientId: "60c48c7a9732777bd5fdca2a",
    });

    expect(data.success).toBe(true);
    expect(data.data).toStrictEqual({ deleted: false });
  });

  test("Delete Client Successfully", async () => {
    const client = await createClient.handle({
      adminPassword: PASSWORD,
      clientName: "client_name",
    });

    const data = await deleteClient.handle({
      adminPassword: PASSWORD,
      clientId: client.data.id,
    });

    expect(data.success).toBe(true);
    expect(data.data.deleted).toBe(true);
  });
});
