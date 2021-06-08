import { getClientId, getClientName, getPassword } from "./helpers";

describe("Getters", () => {
  it("gets password", () => {
    const input = new Map<string, string>();
    input.set("password", "one");
    const password = getPassword(input);
    expect(password).toBe("one");
  });

  it("gets client name", () => {
    const input = new Map<string, string>();
    input.set("client:name", "one");
    const clientName = getClientName(input);
    expect(clientName).toBe("one");
  });

  it("get client id", () => {
    const input = new Map<string, string>();
    input.set("client:id", "one");
    const clientId = getClientId(input);
    expect(clientId).toBe("one");
  });
});
