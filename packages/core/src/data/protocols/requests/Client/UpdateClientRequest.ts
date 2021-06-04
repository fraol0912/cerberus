import { UseCaseRequest } from "../UseCaseRequest";

export interface UpdateClientRequest extends UseCaseRequest {
  id: string;
  name: string;
}
