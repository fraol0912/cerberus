import { ClientNotFound } from "../errors";
import { ClientRepository } from "./ClientRepository";

const clientRepository = new ClientRepository();

describe("Client Repository", () => {
  afterEach(() => {
    clientRepository.clear();
  });

  it("adds a client", async () => {
    const client = await clientRepository.addClient({
      name: "client_name",
    });

    expect(client.getName()).toBe("client_name");
  });

  it("gets a client", async () => {
    const addedClient = await clientRepository.addClient({
      name: "client_name",
    });

    const client = await clientRepository.getClient(addedClient.getId());

    expect(addedClient.getId()).toBe(client.getId());
    expect(addedClient.getName()).toBe(client.getName());
  });

  it("throws if the client to get is not found", async () => {
    let error: Error = new Error();

    try {
      await clientRepository.getClient("random_id");
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(ClientNotFound);
  });

  it("updates a client", async () => {
    const addedClient = await clientRepository.addClient({
      name: "client_name",
    });

    const client = await clientRepository.updateClient(addedClient.getId(), {
      name: `${addedClient.getName()}_updated`,
    });

    expect(client.getId()).toBe(addedClient.getId());
    expect(client.getName()).toBe(`${addedClient.getName()}_updated`);
  });

  it("throws if the client to update is not found", async () => {
    let error: Error = new Error();

    try {
      await clientRepository.updateClient("random_id", {
        name: "client_name",
      });
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(ClientNotFound);
  });

  it("deletes a client", async () => {
    const addedClient = await clientRepository.addClient({
      name: "client_name",
    });

    const deleted = await clientRepository.deleteClient(addedClient.getId());

    expect(deleted).toBe(true);
  });

  it("doesn't delete a client with a non existent id", async () => {
    const deleted = await clientRepository.deleteClient("random_id");

    expect(deleted).toBe(false);
  });

  it("lists clients", async () => {
    const addedClient = await clientRepository.addClient({
      name: "client_name",
    });

    const clients = await clientRepository.listClients();

    expect(clients[0].getId()).toBe(addedClient.getId());
    expect(clients[0].getName()).toBe(addedClient.getName());
  });
});
