import { UseCaseRequest } from "../UseCaseRequest";

export interface CreateAssertionRequest extends UseCaseRequest {
  name: string;
  subject: string;
  expiresAt: Date;
  notBefore: Date;
}
