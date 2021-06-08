import { getProperty } from "./helpers";

describe("Get Property", () => {
  it("gets property", () => {
    const input = new Map<string, string>();
    input.set("num", "one");
    const num = getProperty(input, "num", "Num Not Found");
    expect(num).toBe("one");
  });

  it("throws if property is not set", () => {
    const input = new Map<string, string>();
    expect(() =>
      getProperty(input, "prop doesn't exist", "Property Not Found")
    ).toThrowError("Property Not Found");
  });
});
