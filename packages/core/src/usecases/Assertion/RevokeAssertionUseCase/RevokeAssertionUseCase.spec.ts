import {
  AuthorizerSpy,
  AcceptingAuthorizer,
  RejectingAuthorizer,
} from "@cerberus/core/protocols/authorizer/test";
import { RevokeAssertionUseCase } from "./RevokeAssertionUseCase";
import { UnauthorizedError } from "@cerberus/core/protocols/errors";
import { RevokeAssertionPresenterSpy } from "@cerberus/core/protocols/presenter/Assertion/test";
import { DeleteAssertionGatewaySpy } from "@cerberus/core/protocols/data-access/Assertion/test";

describe("Revoke Assertion Use Case", () => {
  it("calls authorizer with the right argument", async () => {
    const authorizer = new AuthorizerSpy();
    const presenter = new RevokeAssertionPresenterSpy();
    const deleteAssertion = new DeleteAssertionGatewaySpy();

    authorizer.valid = true;

    const usecase = new RevokeAssertionUseCase({
      presenter,
      authorizer,
      deleteAssertion,
    });

    await usecase.execute({
      id: "id",
      encodedAdminPassword: "encoded_password",
    });

    expect(authorizer.calledWithPassword).toBe("encoded_password");
  });

  it("throws an error if the authorizer rejects", async () => {
    const authorizer = new RejectingAuthorizer();
    const presenter = new RevokeAssertionPresenterSpy();
    const deleteAssertion = new DeleteAssertionGatewaySpy();
    let error: Error = new Error();

    const usecase = new RevokeAssertionUseCase({
      presenter,
      authorizer,
      deleteAssertion,
    });

    try {
      await usecase.execute({
        id: "id",
        encodedAdminPassword: "x",
      });
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(UnauthorizedError);
  });

  it("calls delete assertion with the right argument", async () => {
    const authorizer = new AcceptingAuthorizer();
    const presenter = new RevokeAssertionPresenterSpy();
    const deleteAssertion = new DeleteAssertionGatewaySpy();

    deleteAssertion.throw = false;

    const usecase = new RevokeAssertionUseCase({
      presenter,
      authorizer,
      deleteAssertion,
    });

    await usecase.execute({
      id: "id",
      encodedAdminPassword: "encoded_password",
    });

    expect(deleteAssertion.calledWithId).toBe("id");
  });

  it("throws an error if the delete assertion rejects", async () => {
    const authorizer = new AcceptingAuthorizer();
    const presenter = new RevokeAssertionPresenterSpy();
    const deleteAssertion = new DeleteAssertionGatewaySpy();

    let throwed: boolean = false;

    deleteAssertion.throw = true;

    const usecase = new RevokeAssertionUseCase({
      presenter,
      authorizer,
      deleteAssertion,
    });

    try {
      await usecase.execute({
        id: "id",
        encodedAdminPassword: "x",
      });
    } catch {
      throwed = true;
    }

    expect(throwed).toBe(true);
  });

  it("calls the presenter with the right argument", async () => {
    const authorizer = new AcceptingAuthorizer();
    const presenter = new RevokeAssertionPresenterSpy();
    const deleteAssertion = new DeleteAssertionGatewaySpy();

    deleteAssertion.throw = false;

    const usecase = new RevokeAssertionUseCase({
      presenter,
      authorizer,
      deleteAssertion,
    });

    await usecase.execute({
      id: "id",
      encodedAdminPassword: "encoded_password",
    });

    expect(presenter.calledWithData).toBe(true);
  });
});
