import { encodeBase64 } from "./encodeBase64";

describe("Encode Base64", () => {
  it("encodes a string to return a base64", () => {
    const encoded = encodeBase64("string to encode");
    expect(encoded).toBe("c3RyaW5nIHRvIGVuY29kZQ==");
  });
});
