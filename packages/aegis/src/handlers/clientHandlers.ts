import {
  GetClientController,
  ListClientController,
  CreateClientController,
  UpdateClientController,
  DeleteClientController,
} from "../controller";
import { Socket } from "socket.io";

export function registerClientHandlers(socket: Socket) {
  socket.on("client:create", createClientHandler(socket));
  socket.on("client:get", getClientHandler(socket));
  socket.on("client:update", updateClientHandler(socket));
  socket.on("client:delete", deleteClientHandler(socket));
  socket.on("client:list", listClientsHandler(socket));
}

function listClientsHandler(socket: Socket): (...args: any[]) => void {
  return async (data: any) => {
    const listClients = new ListClientController();
    const response = await listClients.handle(data);
    socket.emit("client:list", response);
  };
}

function deleteClientHandler(socket: Socket): (...args: any[]) => void {
  return async (data: any) => {
    const deleteClient = new DeleteClientController();
    const response = await deleteClient.handle(data);
    socket.emit("client:delete", response);
  };
}

function updateClientHandler(socket: Socket): (...args: any[]) => void {
  return async (data: any) => {
    const updateClient = new UpdateClientController();
    const response = await updateClient.handle(data);
    socket.emit("client:update", response);
  };
}

function getClientHandler(socket: Socket): (...args: any[]) => void {
  return async (data: any) => {
    const getClient = new GetClientController();
    const response = await getClient.handle(data);
    socket.emit("client:get", response);
  };
}

function createClientHandler(socket: Socket): (...args: any[]) => void {
  return async (data: any) => {
    const createClient = new CreateClientController();
    const response = await createClient.handle(data);
    socket.emit("client:create", response);
  };
}
