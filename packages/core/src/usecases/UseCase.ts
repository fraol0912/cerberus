import { UseCaseRequest } from "../data/protocols/requests/UseCaseRequest";

export interface UseCase {
  execute(request: UseCaseRequest): void;
}
