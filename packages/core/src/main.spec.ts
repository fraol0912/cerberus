import { add } from "./main";

describe("Add Function", () => {
  it("should add", () => {
    expect(add(1, 2)).toBe(3);
  });
});
