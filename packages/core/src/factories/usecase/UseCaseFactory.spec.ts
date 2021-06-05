import { UseCaseFactory } from "./UseCaseFactory";
import { UseCaseDummy } from "@cerberus/core/usecases/test";

const factory = new UseCaseFactory();

describe("Use Case Factory", () => {
  it("registers a usecase", () => {
    const usecase = new UseCaseDummy();
    factory.register("Use Case", usecase);
    const usecaseFromFactory = factory.getUseCase("Use Case") as UseCaseDummy;
    usecaseFromFactory.execute();

    expect(usecase.called).toBe(true);
    expect(usecaseFromFactory).toBe(usecase);
    expect(usecaseFromFactory.called).toBe(true);
  });

  it("throws if requested to return an un registered usecase", () => {
    expect(() => factory.getUseCase("Use Case Doesn't Exist")).toThrow();
  });
});
