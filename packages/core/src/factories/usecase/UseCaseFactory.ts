import { UseCase } from "@cerberus/core/usecases";

export class UseCaseFactory {
  private usecases: Map<string, UseCase>;
  constructor() {
    this.usecases = new Map();
  }

  register(useCaseName: string, useCase: UseCase) {
    this.usecases.set(useCaseName, useCase);
  }

  getUseCase(useCaseName: string) {
    const usecase = this.usecases.get(useCaseName);

    if (usecase) {
      return usecase;
    } else {
      throw new UseCaseNotFoundError();
    }
  }
}

class UseCaseNotFoundError extends Error {
  name = "UseCaseNotFoundError";
}
