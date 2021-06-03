import { Client } from "./Client";

describe("Client Entity", () => {
  it("has a name", () => {
    const client = new Client({
      id: "id",
      name: "client_name",
    });

    expect(client.getName()).toBe("client_name");
  });
});
