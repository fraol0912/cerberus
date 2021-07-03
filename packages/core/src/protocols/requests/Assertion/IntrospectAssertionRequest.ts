import { UseCaseRequest } from "../UseCaseRequest";

export interface IntrospectAssertionRequest extends UseCaseRequest {
  token: string;
}
