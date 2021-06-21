import { testController } from "@cerberus/aegis/test";
import { clearDB, closeDB, connectToDB } from "@cerberus/mongo";
import { CreateClientController } from "./CreateClientController";

let createClient: CreateClientController =
  testController.getCreateClientController();

const PASSWORD = Buffer.from("password", "utf-8").toString("base64");

describe("Create Client Controller", () => {
  beforeAll(async () => {
    await connectToDB("mongodb://localhost:27017/cerberus");
  });
  afterAll(async () => {
    await clearDB();
    await closeDB();
  });

  test("with no data", async () => {
    const data = await createClient.handle();

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "NoInputData",
      message: "No input was provided.",
    });
  });

  test("with no admin password", async () => {
    const data = await createClient.handle({});

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "AdminPasswordNotGiven",
      message: "Admin password was not provided.",
    });
  });

  test("with no client name", async () => {
    const data = await createClient.handle({
      adminPassword: "xxxx",
    });

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "ClientNameNotGiven",
      message: "Client name was not provided.",
    });
  });

  test("with an invalid password", async () => {
    const data = await createClient.handle({
      clientName: "xxxx",
      adminPassword: "wrong_password",
    });

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({ name: "Unauthorized", message: "" });
  });

  test("create client successfully", async () => {
    const data = await createClient.handle({
      adminPassword: PASSWORD,
      clientName: "client_name",
    });

    expect(data.success).toBe(true);
    expect(data.data.name).toBe("client_name");
  });
});
