import { clearDB, closeDB, connectToDB } from "../db";
import { ClientRepository } from "./ClientRepository";
import { InvalidId, ClientNotFound } from "../errors";

const URI = "mongodb://localhost:27017/cerberus";

describe("Client Repository", () => {
  let repo: ClientRepository;
  beforeAll(async () => {
    await connectToDB(URI);
    repo = new ClientRepository();
  });
  afterAll(async () => {
    await clearDB();
    await closeDB();
  });

  describe("Add Client", () => {
    it("adds a client to the db.", async () => {
      const client = await repo.addClient({
        name: "client",
      });
      const retrieved = await repo.getClient(client.getId());

      expect(client.getId()).toStrictEqual(retrieved.getId());
      expect(client.getName()).toBe(retrieved.getName());
    });
  });

  describe("Get Client", () => {
    it("throws if the id is not valid.", async () => {
      expect.assertions(1);
      try {
        await repo.getClient("h");
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidId);
      }
    });

    it("throws if the client is not found.", async () => {
      expect.assertions(1);
      try {
        await repo.getClient("60c48c7a9732777bd5fdca2a");
      } catch (error) {
        expect(error).toBeInstanceOf(ClientNotFound);
      }
    });
  });

  describe("Update Client", () => {
    it("updates a client in the db.", async () => {
      const addedClient = await repo.addClient({
        name: "client 2",
      });

      const updatedClient = await repo.updateClient(addedClient.getId(), {
        name: `${addedClient.getName()}-updated`,
      });

      expect(addedClient.getId()).toStrictEqual(updatedClient.getId());
      expect(`${addedClient.getName()}-updated`).toBe(updatedClient.getName());
    });

    it("throws if the id is not valid.", async () => {
      try {
        await repo.updateClient("id", {
          name: "updated",
        });
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidId);
      }
    });

    it("throws if the client is not found.", async () => {
      try {
        await repo.updateClient("60c48c7a9732777bd5fdca2a", {
          name: "updated",
        });
      } catch (error) {
        expect(error).toBeInstanceOf(ClientNotFound);
      }
    });
  });

  describe("Delete Client", () => {
    it("deletes a client in the db.", async () => {
      const client = await repo.addClient({
        name: "client 3",
      });

      const deleted = await repo.deleteClient(client.getId());

      expect(deleted).toBe(true);
    });

    it("returns false if the id is not valid.", async () => {
      const deleted = await repo.deleteClient("id");
      expect(deleted).toBe(false);
    });

    it("returns false if the client is not found.", async () => {
      const deleted = await repo.deleteClient("60c48c7a9732777bd5fdca2a");
      expect(deleted).toBe(false);
    });
  });

  describe("List Clients", () => {
    it("gets a list of clients", async () => {
      const clients = await repo.listClients();

      expect(clients.length).toBe(2);
      expect(clients[0].getName()).toBe("client");
      expect(clients[1].getName()).toBe("client 2-updated");
    });
  });
});
