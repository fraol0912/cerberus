import { AdminUseCaseRequest } from "../AdminUseCaseRequest";

export interface UpdateClientRequest extends AdminUseCaseRequest {
  id: string;
  name: string;
}
