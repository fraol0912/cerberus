import { UseCaseRequest } from "../UseCaseRequest";

export interface CreateAssertionRequest extends UseCaseRequest {
  name: string;
  expiresAt: Date;
  notBefore: Date;
}
