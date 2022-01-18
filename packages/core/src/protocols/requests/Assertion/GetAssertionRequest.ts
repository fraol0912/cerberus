import { AdminUseCaseRequest } from "../AdminUseCaseRequest";

export interface GetAssertionRequest extends AdminUseCaseRequest {
  id: string;
}
