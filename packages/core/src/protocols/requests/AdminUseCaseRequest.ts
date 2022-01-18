import { UseCaseRequest } from "./UseCaseRequest";

export interface AdminUseCaseRequest extends UseCaseRequest {
  encodedAdminPassword: string;
}
