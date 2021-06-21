import { AdminUseCaseRequest } from "../AdminUseCaseRequest";

export interface CreateClientRequest extends AdminUseCaseRequest {
  name: string;
}
