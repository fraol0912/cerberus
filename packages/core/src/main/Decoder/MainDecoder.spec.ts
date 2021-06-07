import { MainDecoder } from "./MainDecoder";

describe("Main Decoder", () => {
  it("decodes a base64 string", async () => {
    const decoder = new MainDecoder();
    const decoded = await decoder.decode("c3RyaW5nIHRvIGVuY29kZQ==");
    expect(decoded).toBe("string to encode");
  });
});
