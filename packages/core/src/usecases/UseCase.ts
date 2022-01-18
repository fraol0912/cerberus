import { UseCaseRequest } from "@cerberus/core/protocols/requests";

export interface UseCase {
  execute(request: UseCaseRequest): void;
}
