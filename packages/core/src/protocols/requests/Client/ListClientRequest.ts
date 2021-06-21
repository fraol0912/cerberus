import { AdminUseCaseRequest } from "../AdminUseCaseRequest";

export interface ListClientRequest extends AdminUseCaseRequest {
  after?: string;
  limit?: number;
  sort?: string;
}
