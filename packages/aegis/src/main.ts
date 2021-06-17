import { Server, Socket } from "socket.io";
import { connectToDB } from "@cerberus/mongo";
import { registerClientHandlers } from "./handlers";
import { Config } from "./config";

let server: Server;

export function closeAegisServer() {
  if (server) {
    server.close();
  }
}

export async function createAegisServer() {
  const httpServer = Config.getServer();
  if (httpServer) {
    server = new Server(httpServer);
  } else {
    server = new Server();
  }

  await connectToDB(Config.getMongoURI());

  server.on("connect", (socket: Socket) => {
    registerClientHandlers(socket);
  });

  server.listen(Config.getPort());
}

export const AegisConfig = Config;
