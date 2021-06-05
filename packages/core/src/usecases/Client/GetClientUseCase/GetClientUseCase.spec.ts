import {
  AcceptingAuthorizer,
  AuthorizerSpy,
  RejectingAuthorizer,
} from "@cerberus/core/protocols/authorizer/test";
import { GetClientUseCase } from "./GetClientUseCase";
import { UnauthorizedError } from "@cerberus/core/protocols/errors";
import { GetClientGatewaySpy } from "@cerberus/core/protocols/data-access/Client/test";
import { GetClientPresenterSpy } from "@cerberus/core/protocols/presenter/Client/test";

describe("Get Client Use Case", () => {
  it("throws the authorizer rejects", async () => {
    const authorizer = new RejectingAuthorizer();
    const loadClient = new GetClientGatewaySpy();
    const presenter = new GetClientPresenterSpy();

    let error: Error = new Error();

    const usecase = new GetClientUseCase({
      authorizer,
      loadClient,
      presenter,
    });

    try {
      await usecase.execute({
        encodedAdminPassword: "x",
        id: "id",
      });
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(UnauthorizedError);
  });

  it("calls authorizer with the right argument", async () => {
    const authorizer = new AuthorizerSpy();
    const loadClient = new GetClientGatewaySpy();
    const presenter = new GetClientPresenterSpy();

    const usecase = new GetClientUseCase({
      authorizer,
      loadClient,
      presenter,
    });

    try {
      await usecase.execute({
        encodedAdminPassword: "x",
        id: "id",
      });
    } catch {}

    expect(authorizer.calledWithPassword).toBe("x");
  });

  it("calls get client with the right argument", async () => {
    const authorizer = new AcceptingAuthorizer();
    const loadClient = new GetClientGatewaySpy();
    const presenter = new GetClientPresenterSpy();

    const usecase = new GetClientUseCase({
      authorizer,
      loadClient,
      presenter,
    });

    try {
      await usecase.execute({
        encodedAdminPassword: "x",
        id: "id",
      });
    } catch {}

    expect(loadClient.calledWithId).toBe("id");
  });

  it("calls get client presenter with the right argument", async () => {
    const authorizer = new AcceptingAuthorizer();
    const loadClient = new GetClientGatewaySpy();
    const presenter = new GetClientPresenterSpy();

    const usecase = new GetClientUseCase({
      authorizer,
      loadClient,
      presenter,
    });

    try {
      await usecase.execute({
        encodedAdminPassword: "x",
        id: "id",
      });
    } catch {}

    expect(presenter.calledWithData.id).toBe("id");
    expect(presenter.calledWithData.name).toBe("client_name");
  });
});
