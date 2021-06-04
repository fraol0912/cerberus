import { UseCaseRequest } from "../UseCaseRequest";

export interface UpdateClientRequest extends UseCaseRequest {
  name: string;
}
