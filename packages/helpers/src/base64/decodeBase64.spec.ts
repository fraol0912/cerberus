import { decodeBase64 } from "./decodeBase64";

describe("Decode Base64", () => {
  it("decodes a base64 to return a string", () => {
    const encoded = decodeBase64("c3RyaW5nIHRvIGVuY29kZQ==");
    expect(encoded).toBe("string to encode");
  });
});
