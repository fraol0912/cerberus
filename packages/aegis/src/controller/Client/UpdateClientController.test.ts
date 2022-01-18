import { testController } from "@cerberus/aegis/test";
import { CreateClientController } from "./CreateClientController";
import { UpdateClientController } from "./UpdateClientController";

const updateClient: UpdateClientController =
  testController.getUpdateClientController();
const createClient: CreateClientController =
  testController.getCreateClientController();

const clientRepo = testController.getClientRepo();

const PASSWORD = Buffer.from("password", "utf-8").toString("base64");

describe("Update Client Controller", () => {
  afterEach(() => clientRepo.clear());

  test("with no data", async () => {
    const data = await updateClient.handle();

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "NoInputData",
      message: "No input was provided.",
    });
  });

  test("with no admin password", async () => {
    const data = await updateClient.handle({});

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "AdminPasswordNotGiven",
      message: "Admin password was not provided.",
    });
  });

  test("with no client id", async () => {
    const data = await updateClient.handle({
      adminPassword: "xxxx",
    });

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "IdNotProvidedError",
      message: "No id was provided, couldn't find the client",
    });
  });

  test("with no client name", async () => {
    const data = await updateClient.handle({
      clientId: "xxxx",
      adminPassword: "wrong_password",
    });

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "ClientNameNotGiven",
      message: "Client name was not provided.",
    });
  });

  test("with an invalid password", async () => {
    const data = await updateClient.handle({
      clientId: "xxxx",
      clientName: "client_name",
      adminPassword: "wrong_password",
    });

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({ name: "Unauthorized", message: "" });
  });

  test("with an id that doesn't exist", async () => {
    const data = await updateClient.handle({
      adminPassword: PASSWORD,
      clientName: "client_name",
      clientId: "id",
    });

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({ name: "ClientNotFound", message: "" });
  });

  test("Update Client Successfully", async () => {
    const client = await createClient.handle({
      adminPassword: PASSWORD,
      clientName: "client_name",
    });

    const data = await updateClient.handle({
      adminPassword: PASSWORD,
      clientId: client.data.id,
      clientName: client.data.name,
    });

    expect(data.success).toBe(true);
    expect(data.data.id).toBe(client.data.id);
    expect(data.data.name).toBe(client.data.name);
  });
});
