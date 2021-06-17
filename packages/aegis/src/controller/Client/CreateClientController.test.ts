import { config } from "@cerberus/aegis/config/test";
import { io, Socket } from "socket.io-client";
import { closeDB, clearDB } from "@cerberus/mongo";
import { closeAegisServer, createAegisServer } from "@cerberus/aegis/main";

describe("client:create", () => {
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
    socket.emit("client:create");

    socket.on("client:create", (data) => {
      expect(data.success).toBe(false);
      expect(data.error).toStrictEqual({
        name: "NoInputData",
        message: "No input was provided.",
      });
      done();
    });
  });

  test("with no admin password", (done) => {
    socket.emit("client:create", {});

    socket.on("client:create", (data) => {
      expect(data.success).toBe(false);
      expect(data.error).toStrictEqual({
        name: "AdminPasswordNotGiven",
        message: "Admin password was not provided.",
      });
      done();
    });
  });

  test("with no client name", (done) => {
    socket.emit("client:create", {
      adminPassword: "xxxx",
    });

    socket.on("client:create", (data) => {
      expect(data.success).toBe(false);
      expect(data.error).toStrictEqual({
        name: "ClientNameNotGiven",
        message: "Client name was not provided.",
      });
      done();
    });
  });

  test("with an invalid password", (done) => {
    socket.emit("client:create", {
      adminPassword: "wrong_password",
      clientName: "xxxx",
    });

    socket.on("client:create", (data) => {
      expect(data.success).toBe(false);
      expect(data.error).toStrictEqual({ name: "Unauthorized", message: "" });
      done();
    });
  });

  test("client:create", (done) => {
    socket.emit("client:create", {
      adminPassword: config.PASSWORD,
      clientName: "client_name",
    });

    socket.on("client:create", (data) => {
      expect(data.success).toBe(true);
      expect(data.data.name).toBe("client_name");
      done();
    });
  });
});
