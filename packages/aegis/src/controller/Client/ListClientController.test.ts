import { io, Socket } from "socket.io-client";
import { closeDB, clearDB } from "@cerberus/mongo";
import { config } from "@cerberus/aegis/config/test";
import { clientRepoMongoDB } from "@cerberus/aegis/global/clientRepo";
import { closeAegisServer, createAegisServer } from "@cerberus/aegis/main";

describe("client:list", () => {
  let socket: Socket;
  beforeAll(async () => {
    await createAegisServer();
  });
  beforeEach(() => {
    socket = io(config.serverURL, {
      reconnectionDelay: 0,
      forceNew: true,
    });
  });

  afterEach(async () => {
    await socket.close();
  });
  afterAll(async () => {
    closeAegisServer();
    await clearDB();
    await closeDB();
  });

  test("with no data", (done) => {
    socket.emit("client:list");

    socket.on("client:list", (data) => {
      expect(data.success).toBe(false);
      expect(data.error).toStrictEqual({
        name: "NoInputData",
        message: "No input was provided.",
      });
      done();
    });
  });

  test("with no admin password", (done) => {
    socket.emit("client:list", {});

    socket.on("client:list", (data) => {
      expect(data.success).toBe(false);
      expect(data.error).toStrictEqual({
        name: "AdminPasswordNotGiven",
        message: "Admin password was not provided.",
      });
      done();
    });
  });

  test("with an invalid password", (done) => {
    socket.emit("client:list", {
      adminPassword: "wrong_password",
    });

    socket.on("client:list", (data) => {
      expect(data.success).toBe(false);
      expect(data.error).toStrictEqual({ name: "Unauthorized", message: "" });
      done();
    });
  });

  test("client:list", (done) => {
    clientRepoMongoDB
      .addClient({
        name: "client_name",
      })
      .then((client) => {
        socket.emit("client:list", {
          adminPassword: config.PASSWORD,
        });

        socket.on("client:list", (data) => {
          expect(data.success).toBe(true);
          expect(data.data.clients[0].id).toBe(client.getId());
          expect(data.data.clients[0].name).toBe(client.getName());
          done();
        });
      });
  });
});
