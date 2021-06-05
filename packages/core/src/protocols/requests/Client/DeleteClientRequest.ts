import { UseCaseRequest } from "../UseCaseRequest";

export interface DeleteClientRequest extends UseCaseRequest {
  id: string;
}
