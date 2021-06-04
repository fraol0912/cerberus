import {
  AcceptingAuthorizer,
  AuthorizerSpy,
  RejectingAuthorizer,
} from "../../data/protocols/authorizer/test/mockAuthorizer";
import { GetClientGatewaySpy } from "../../data/protocols/data-access/Client/test/mockLoadClientGateway";
import { GetClientPresenterSpy } from "../../data/protocols/presenter/Client/test/mockGetClientPresenter";
import { UnauthorizedError } from "../../data/protocols/errors";
import { GetClientUseCase } from "./GetClientUseCase";

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
