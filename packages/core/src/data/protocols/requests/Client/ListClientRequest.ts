import { UseCaseRequest } from "../UseCaseRequest";

export interface ListClientRequest extends UseCaseRequest {
  after: string;
  limit: number;
  sort: string;
}
