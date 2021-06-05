import {
  AuthorizerSpy,
  AcceptingAuthorizer,
  RejectingAuthorizer,
} from "@cerberus/core/protocols/authorizer/test";
import { CreateClientUseCase } from "./CreateClientUseCase";
import { UnauthorizedError } from "@cerberus/core/protocols/errors";
import { AddClientGatewaySpy } from "@cerberus/core/protocols/data-access/Client/test";
import { CreateClientPresenterSpy } from "@cerberus/core/protocols/presenter/Client/test";

describe("Create Client Use Case", () => {
  it("throws an error if the authorizer rejects", async () => {
    const authorizer = new RejectingAuthorizer();
    const addClient = new AddClientGatewaySpy();
    const presenter = new CreateClientPresenterSpy();
    let error: Error = Error();

    const usecase = new CreateClientUseCase({
      addClient,
      authorizer,
      presenter,
    });

    try {
      await usecase.execute({ encodedAdminPassword: "x", name: "x" });
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(UnauthorizedError);
  });

  it("calls authorizer with the right argument", async () => {
    const authorizer = new AuthorizerSpy();
    const addClient = new AddClientGatewaySpy();
    const presenter = new CreateClientPresenterSpy();

    const usecase = new CreateClientUseCase({
      addClient,
      authorizer,
      presenter,
    });

    try {
      await usecase.execute({
        encodedAdminPassword: "encoded_password",
        name: "client_name",
      });
    } catch {}

    expect(authorizer.calledWithPassword).toBe("encoded_password");
  });

  it("calls add client with the right argument", async () => {
    const authorizer = new AcceptingAuthorizer();
    const addClient = new AddClientGatewaySpy();
    const presenter = new CreateClientPresenterSpy();

    const usecase = new CreateClientUseCase({
      addClient,
      authorizer,
      presenter,
    });

    try {
      await usecase.execute({
        encodedAdminPassword: "encoded_password",
        name: "client_name",
      });
    } catch {}

    expect(addClient.calledWithClientParams.name).toBe("client_name");
  });

  it("calls create client presenter with the right argument", async () => {
    const authorizer = new AcceptingAuthorizer();
    const addClient = new AddClientGatewaySpy();
    const presenter = new CreateClientPresenterSpy();

    const usecase = new CreateClientUseCase({
      addClient,
      authorizer,
      presenter,
    });

    try {
      await usecase.execute({
        encodedAdminPassword: "encoded_password",
        name: "client_name",
      });
    } catch {}

    expect(presenter.calledWithData.name).toBe("client_name");
    expect(presenter.calledWithData.id).toBe("id");
  });
});
