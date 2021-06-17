import { io, Socket } from "socket.io-client";
import { closeDB, clearDB } from "@cerberus/mongo";
import { config } from "@cerberus/aegis/config/test";
import { clientRepoMongoDB } from "@cerberus/aegis/global/clientRepo";
import { closeAegisServer, createAegisServer } from "@cerberus/aegis/main";

describe("client:update", () => {
  let socket: Socket;
  beforeAll(async () => {
    await createAegisServer();
  });
  afterAll(async () => {
    closeAegisServer();
    await clearDB();
    await closeDB();
  });

  beforeEach(() => {
    socket = io(config.serverURL, {
      forceNew: true,
      reconnectionDelay: 0,
    });
  });
  afterEach(async () => {
    await socket.close();
  });

  test("with no data", (done) => {
    socket.emit("client:update");

    socket.on("client:update", (data) => {
      expect(data.success).toBe(false);
      expect(data.error).toStrictEqual({
        name: "NoInputData",
        message: "No input was provided.",
      });
      done();
    });
  });

  test("with no admin password", (done) => {
    socket.emit("client:delete", {});

    socket.on("client:delete", (data) => {
      expect(data.success).toBe(false);
      expect(data.error).toStrictEqual({
        name: "AdminPasswordNotGiven",
        message: "Admin password was not provided.",
      });
      done();
    });
  });

  test("with no client id", (done) => {
    socket.emit("client:update", {
      adminPassword: "xxxx",
    });

    socket.on("client:update", (data) => {
      expect(data.success).toBe(false);
      expect(data.error).toStrictEqual({
        name: "IdNotProvidedError",
        message: "No id was provided, couldn't find the client",
      });
      done();
    });
  });

  test("with no client name", (done) => {
    socket.emit("client:update", {
      adminPassword: "wrong_password",
      clientId: "xxxx",
    });

    socket.on("client:update", (data) => {
      expect(data.success).toBe(false);
      expect(data.error).toStrictEqual({
        name: "ClientNameNotGiven",
        message: "Client name was not provided.",
      });
      done();
    });
  });

  test("with an invalid password", (done) => {
    socket.emit("client:update", {
      adminPassword: "wrong_password",
      clientId: "xxxx",
      clientName: "client_name",
    });

    socket.on("client:update", (data) => {
      expect(data.success).toBe(false);
      expect(data.error).toStrictEqual({ name: "Unauthorized", message: "" });
      done();
    });
  });

  test("with an invalid client id", (done) => {
    socket.emit("client:update", {
      adminPassword: config.PASSWORD,
      clientId: "xxxx",
      clientName: "client_name",
    });

    socket.on("client:update", (data) => {
      expect(data.success).toBe(false);
      expect(data.error).toStrictEqual({ name: "InvalidId", message: "" });
      done();
    });
  });

  test("with an id that doesn't exist but is valid", (done) => {
    socket.emit("client:update", {
      adminPassword: config.PASSWORD,
      clientId: "60c48c7a9732777bd5fdca2a",
      clientName: "client_name",
    });

    socket.on("client:update", (data) => {
      expect(data.success).toBe(false);
      expect(data.error).toStrictEqual({ name: "ClientNotFound", message: "" });
      done();
    });
  });

  test("client:update", (done) => {
    clientRepoMongoDB.addClient({ name: "client_name" }).then((client) => {
      socket.emit("client:update", {
        adminPassword: config.PASSWORD,
        clientId: client.getId(),
        clientName: `${client.getName()}-updated`,
      });

      socket.on("client:update", (data) => {
        expect(data.success).toBe(true);
        expect(data.data.id).toBe(client.getId());
        expect(data.data.name).toBe(`${client.getName()}-updated`);
        done();
      });
    });
  });
});
