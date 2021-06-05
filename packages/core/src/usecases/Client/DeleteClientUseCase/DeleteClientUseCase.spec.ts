import {
  AcceptingAuthorizer,
  AuthorizerSpy,
  RejectingAuthorizer,
} from "../../../protocols/authorizer/test";
import { DeleteClientUseCase } from "./DeleteClientUseCase";
import { UnauthorizedError } from "../../../protocols/errors";
import { DeleteClientGatewaySpy } from "../../../protocols/data-access/Client/test";
import { DeleteClientPresenterSpy } from "../../../protocols/presenter/Client/test";

describe("Delete Client Use Case", () => {
  it("throws an error if the authorizer rejects", async () => {
    const authorizer = new RejectingAuthorizer();
    const deleteClient = new DeleteClientGatewaySpy();
    const presenter = new DeleteClientPresenterSpy();
    let error: Error = Error();

    const usecase = new DeleteClientUseCase({
      deleteClient,
      authorizer,
      presenter,
    });

    try {
      await usecase.execute({ encodedAdminPassword: "x", id: "id" });
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(UnauthorizedError);
  });

  it("calls authorizer with the right argument", async () => {
    const authorizer = new AuthorizerSpy();
    const deleteClient = new DeleteClientGatewaySpy();
    const presenter = new DeleteClientPresenterSpy();

    const usecase = new DeleteClientUseCase({
      deleteClient,
      authorizer,
      presenter,
    });

    try {
      await usecase.execute({
        encodedAdminPassword: "encoded_password",
        id: "id",
      });
    } catch {}

    expect(authorizer.calledWithPassword).toBe("encoded_password");
  });

  it("calls delete client gateway with the right argument", async () => {
    const authorizer = new AcceptingAuthorizer();
    const deleteClient = new DeleteClientGatewaySpy();
    const presenter = new DeleteClientPresenterSpy();

    const usecase = new DeleteClientUseCase({
      deleteClient,
      authorizer,
      presenter,
    });

    try {
      await usecase.execute({
        encodedAdminPassword: "encoded_password",
        id: "id",
      });
    } catch {}

    expect(deleteClient.calledWithId).toBe("id");
  });

  it("calls delete client presenter with the right argument", async () => {
    const authorizer = new AcceptingAuthorizer();
    const deleteClient = new DeleteClientGatewaySpy();
    const presenter = new DeleteClientPresenterSpy();

    const usecase = new DeleteClientUseCase({
      deleteClient,
      authorizer,
      presenter,
    });

    try {
      await usecase.execute({
        encodedAdminPassword: "encoded_password",
        id: "id",
      });
    } catch {}

    expect(presenter.calledWithData).toBe(true);
  });
});
