import { testController } from "@cerberus/aegis/test";
import { ListClientController } from "./ListClientController";
import { CreateClientController } from "./CreateClientController";

const createClient: CreateClientController =
  testController.getCreateClientController();
const listClient: ListClientController =
  testController.getListClientController();

const clientRepo = testController.getClientRepo();

const PASSWORD = Buffer.from("password", "utf-8").toString("base64");

describe("List Client Controller", () => {
  afterEach(() => clientRepo.clear());

  test("with no data", async () => {
    const data = await listClient.handle();

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "NoInputData",
      message: "No input was provided.",
    });
  });

  test("with no admin password", async () => {
    const data = await listClient.handle({});

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({
      name: "AdminPasswordNotGiven",
      message: "Admin password was not provided.",
    });
  });

  test("with an invalid password", async () => {
    const data = await listClient.handle({
      adminPassword: "wrong_password",
    });

    expect(data.success).toBe(false);
    expect(data.error).toStrictEqual({ name: "Unauthorized", message: "" });
  });

  test("List Client Successfully", async () => {
    const client = await createClient.handle({
      adminPassword: PASSWORD,
      clientName: "client_name",
    });

    const data = await listClient.handle({
      adminPassword: PASSWORD,
    });

    expect(data.success).toBe(true);
    expect(data.data.clients[0].id).toBe(client.data.id);
    expect(data.data.clients[0].name).toBe(client.data.name);
  });
});
