import { UseCaseRequest } from "../UseCaseRequest";

export interface CreateClientRequest extends UseCaseRequest {
  name: string;
}
