import { UseCaseRequest } from "../UseCaseRequest";

export interface GetClientRequest extends UseCaseRequest {
  id: string;
}
