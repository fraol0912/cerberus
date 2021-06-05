import { UseCaseRequest } from "@cerberus/core/protocols/requests";
import { RequestBuilder } from "./RequestBuilder";

const sampleRequestBuilder = (hashMap: Map<string, string>): UseCaseRequest => {
  const password = hashMap.get("password");

  if (!password) {
    throw new Error("Password doesn't exist in request.");
  }

  const request: UseCaseRequest = {
    encodedAdminPassword: password,
  };
  return request;
};

const requestBuilder = new RequestBuilder();

describe("Request Builder", () => {
  it("throws if the requested request builder is not set", () => {
    expect(() =>
      requestBuilder.getRequestFor(
        "Request Builder Doesn't Exist",
        new Map<string, string>()
      )
    ).toThrow();
  });

  it("sets a request builder and requests it", () => {
    requestBuilder.registerBuilder("Sample Request", sampleRequestBuilder);

    const input = new Map<string, string>();
    input.set("password", "x");

    const request = requestBuilder.getRequestFor("Sample Request", input);

    expect(request.encodedAdminPassword).toBe("x");
    expect(() =>
      requestBuilder.getRequestFor("Sample Request", new Map())
    ).toThrow();
  });
});
