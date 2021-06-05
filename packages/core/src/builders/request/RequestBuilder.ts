import { UseCaseRequest } from "@cerberus/core/protocols/requests";

type RequestBuilderFunction = (hashMap: Map<string, string>) => UseCaseRequest;

export class RequestBuilder {
  builders: Map<string, RequestBuilderFunction>;
  constructor() {
    this.builders = new Map();
  }

  registerBuilder(requestName: string, builder: RequestBuilderFunction) {
    this.builders.set(requestName, builder);
  }

  getRequestFor(
    requestName: string,
    hashMap: Map<string, string>
  ): UseCaseRequest {
    const builderFunction = this.builders.get(requestName);

    if (!builderFunction) {
      throw new RequestNotFoundError();
    }

    const request = builderFunction(hashMap);

    return request;
  }
}

class RequestNotFoundError extends Error {
  name = "RequestNotFoundError";
}
