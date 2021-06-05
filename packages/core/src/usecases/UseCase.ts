import { UseCaseRequest } from "../protocols/requests";

export interface UseCase {
  execute(request: UseCaseRequest): void;
}
