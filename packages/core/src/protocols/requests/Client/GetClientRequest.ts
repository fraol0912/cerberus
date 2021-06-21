import { AdminUseCaseRequest } from "../AdminUseCaseRequest";

export interface GetClientRequest extends AdminUseCaseRequest {
  id: string;
}
