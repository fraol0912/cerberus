import { AdminUseCaseRequest } from "../AdminUseCaseRequest";

export interface RevokeAssertionRequest extends AdminUseCaseRequest {
  id: string;
}
