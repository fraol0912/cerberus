import { io, Socket } from "socket.io-client";
import { closeDB, clearDB } from "@cerberus/mongo";
import { config } from "@cerberus/aegis/config/test";
import { clientRepoMongoDB } from "@cerberus/aegis/global/clientRepo";
import { closeAegisServer, createAegisServer } from "@cerberus/aegis/main";

describe("client:delete", () => {
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
    socket.emit("client:delete");

    socket.on("client:delete", (data) => {
      expect(data.success).toBe(false);
      expect(data.error).toStrictEqual({
        name: "NoInputData",
        message: "No input was provided.",
      });
      done();
    });
  });

  test("with no client id", (done) => {
    socket.emit("client:delete", {
      adminPassword: "xxxx",
    });

    socket.on("client:delete", (data) => {
      expect(data.success).toBe(false);
      expect(data.error).toStrictEqual({
        name: "IdNotProvidedError",
        message: "No id was provided, couldn't find the client",
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

  test("with an invalid client id", (done) => {
    socket.emit("client:delete", {
      adminPassword: config.PASSWORD,
      clientId: "xxxx",
    });

    socket.on("client:delete", (data) => {
      expect(data.success).toBe(true);
      expect(data.data).toStrictEqual({ deleted: false });
      done();
    });
  });

  test("with an invalid password", (done) => {
    socket.emit("client:delete", {
      adminPassword: "wrong_password",
      clientId: "xxxx",
    });

    socket.on("client:delete", (data) => {
      expect(data.success).toBe(false);
      expect(data.error).toStrictEqual({ name: "Unauthorized", message: "" });
      done();
    });
  });

  test("with an id that doesn't exist but is valid", (done) => {
    socket.emit("client:delete", {
      adminPassword: config.PASSWORD,
      clientId: "60c48c7a9732777bd5fdca2a",
    });

    socket.on("client:delete", (data) => {
      expect(data.success).toBe(true);
      expect(data.data).toStrictEqual({ deleted: false });
      done();
    });
  });

  test("client:delete", (done) => {
    clientRepoMongoDB.addClient({ name: "client_name" }).then((client) => {
      socket.emit("client:delete", {
        adminPassword: config.PASSWORD,
        clientId: client.getId(),
      });

      socket.on("client:delete", (data) => {
        expect(data.success).toBe(true);
        expect(data.data.deleted).toBe(true);
        done();
      });
    });
  });
});
