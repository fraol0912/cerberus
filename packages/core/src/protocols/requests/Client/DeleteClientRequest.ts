import { AdminUseCaseRequest } from "../AdminUseCaseRequest";

export interface DeleteClientRequest extends AdminUseCaseRequest {
  id: string;
}
