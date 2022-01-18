import { AdminUseCaseRequest } from "../AdminUseCaseRequest";

export interface CreateAssertionRequest extends AdminUseCaseRequest {
  name: string;
  subject: string;
  expiresAt: Date;
  notBefore: Date;
}
