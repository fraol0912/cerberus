import { UpdateClientUseCase } from "./UpdateClientUseCase";
import {
  AcceptingAuthorizer,
  AuthorizerSpy,
  RejectingAuthorizer,
} from "../../data/protocols/authorizer/test/mockAuthorizer";
import { UnauthorizedError } from "../../data/protocols/errors";
import { UpdateClientGatewaySpy } from "../../data/protocols/data-access/Client/test";
import { UpdateClientPresenterSpy } from "../../data/protocols/presenter/Client/test";

describe("Update Client Use Case", () => {
  it("throws if the authorizer rejects", async () => {
    const authorizer = new RejectingAuthorizer();
    const updateClient = new UpdateClientGatewaySpy();
    const presenter = new UpdateClientPresenterSpy();
    let error: Error = Error();

    const usecase = new UpdateClientUseCase({
      authorizer,
      updateClient,
      presenter,
    });

    try {
      await usecase.execute({
        encodedAdminPassword: "x",
        id: "id",
        name: "client_name",
      });
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(UnauthorizedError);
  });

  it("calls authorizer with the right argument", async () => {
    const authorizer = new AuthorizerSpy();
    const updateClient = new UpdateClientGatewaySpy();
    const presenter = new UpdateClientPresenterSpy();

    const usecase = new UpdateClientUseCase({
      authorizer,
      updateClient,
      presenter,
    });

    try {
      await usecase.execute({
        encodedAdminPassword: "x",
        id: "id",
        name: "client_name",
      });
    } catch {}

    expect(authorizer.calledWithPassword).toBe("x");
  });

  it("calls update client gateway with the right argument", async () => {
    const authorizer = new AcceptingAuthorizer();
    const updateClient = new UpdateClientGatewaySpy();
    const presenter = new UpdateClientPresenterSpy();

    const usecase = new UpdateClientUseCase({
      authorizer,
      updateClient,
      presenter,
    });

    try {
      await usecase.execute({
        encodedAdminPassword: "x",
        id: "id",
        name: "client_name",
      });
    } catch {}

    expect(updateClient.calledWithId).toBe("id");
    expect(updateClient.calledWithClientParams.name).toBe("client_name");
  });

  it("calls update client presenter with the right argument", async () => {
    const authorizer = new AcceptingAuthorizer();
    const updateClient = new UpdateClientGatewaySpy();
    const presenter = new UpdateClientPresenterSpy();

    const usecase = new UpdateClientUseCase({
      authorizer,
      updateClient,
      presenter,
    });

    try {
      await usecase.execute({
        encodedAdminPassword: "x",
        id: "id",
        name: "client_name",
      });
    } catch {}

    expect(presenter.calledWithData.id).toBe("id");
    expect(presenter.calledWithData.name).toBe("client_name");
  });
});
