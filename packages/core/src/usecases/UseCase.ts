import { UseCaseRequest } from "../data/protocols/requests";

export interface UseCase {
  execute(request: UseCaseRequest): void;
}
