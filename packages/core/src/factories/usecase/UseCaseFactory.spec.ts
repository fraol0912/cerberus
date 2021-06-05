import { UseCaseFactory } from "./UseCaseFactory";
import { UseCaseDummy } from "@cerberus/core/usecases/test";

const factory = new UseCaseFactory();

describe("Use Case Factory", () => {
  it("registers a usecase", () => {
    const usecase = new UseCaseDummy();
    factory.register("Add Client Use Case", usecase);

    expect(factory.getUseCase("Add Client Use Case")).toBe(usecase);
  });

  it("throws if requested to return an un registered usecase", () => {
    expect(() => factory.getUseCase("Use Case Doesn't Exist")).toThrow();
  });
});
