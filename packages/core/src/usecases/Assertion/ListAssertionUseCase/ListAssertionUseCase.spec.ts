import {
  AuthorizerSpy,
  AcceptingAuthorizer,
  RejectingAuthorizer,
} from "@cerberus/core/protocols/authorizer/test/mockAuthorizer";
import { ListAssertionUseCase } from "./ListAssertionUseCase";
import { UnauthorizedError } from "@cerberus/core/protocols/errors";
import { GetClientGatewaySpy } from "@cerberus/core/protocols/data-access/Client/test";
import { ListAssertionGatewaySpy } from "@cerberus/core/protocols/data-access/Assertion/test";
import { ListAssertionPresenterSpy } from "@cerberus/core/protocols/presenter/Assertion/test";

describe("List Assertion Use Case", () => {
  it("throws the authorizer rejects", async () => {
    const getClient = new GetClientGatewaySpy();
    const authorizer = new RejectingAuthorizer();
    const presenter = new ListAssertionPresenterSpy();
    const listAssertions = new ListAssertionGatewaySpy();
    let error: Error = new Error();

    const usecase = new ListAssertionUseCase({
      getClient,
      presenter,
      authorizer,
      listAssertions,
    });

    try {
      await usecase.execute({
        encodedAdminPassword: "x",
      });
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(UnauthorizedError);
  });

  it("calls authorizer with the right argument", async () => {
    const authorizer = new AuthorizerSpy();
    const getClient = new GetClientGatewaySpy();
    const presenter = new ListAssertionPresenterSpy();
    const listAssertions = new ListAssertionGatewaySpy();

    const usecase = new ListAssertionUseCase({
      getClient,
      presenter,
      authorizer,
      listAssertions,
    });

    try {
      await usecase.execute({
        encodedAdminPassword: "encoded_password",
      });
    } catch {}

    expect(authorizer.calledWithPassword).toBe("encoded_password");
  });

  it("calls list assertions with the right argument", async () => {
    const getClient = new GetClientGatewaySpy();
    const authorizer = new AcceptingAuthorizer();
    const presenter = new ListAssertionPresenterSpy();
    const listAssertions = new ListAssertionGatewaySpy();

    const usecase = new ListAssertionUseCase({
      getClient,
      presenter,
      authorizer,
      listAssertions,
    });

    try {
      await usecase.execute({
        encodedAdminPassword: "encoded_password",
      });
    } catch {}

    expect(listAssertions.called).toBe(true);
  });

  it("calls get client with the right argument", async () => {
    const getClient = new GetClientGatewaySpy();
    const authorizer = new AcceptingAuthorizer();
    const presenter = new ListAssertionPresenterSpy();
    const listAssertions = new ListAssertionGatewaySpy();

    const usecase = new ListAssertionUseCase({
      getClient,
      presenter,
      authorizer,
      listAssertions,
    });

    try {
      await usecase.execute({
        encodedAdminPassword: "encoded_password",
      });
    } catch {}

    expect(getClient.calledWithId).toBe("subject");
  });

  it("calls list assertions presenter with the right argument", async () => {
    const getClient = new GetClientGatewaySpy();
    const authorizer = new AcceptingAuthorizer();
    const presenter = new ListAssertionPresenterSpy();
    const listAssertions = new ListAssertionGatewaySpy();

    const usecase = new ListAssertionUseCase({
      getClient,
      presenter,
      authorizer,
      listAssertions,
    });

    try {
      await usecase.execute({
        encodedAdminPassword: "encoded_password",
      });
    } catch {}

    expect(presenter.calledWithData[0].id).toBe("id");
    expect(presenter.calledWithData[0].issuer).toBe("issuer");
    expect(presenter.calledWithData[0].audience).toBe("audience");
    expect(presenter.calledWithData[0].name).toBe("assertion_name");

    expect(presenter.calledWithData[0].subject.id).toBe("subject");
    expect(presenter.calledWithData[0].subject.name).toBe("client_name");

    expect(presenter.calledWithData[0].expiresAt).toBeDefined();
    expect(presenter.calledWithData[0].notBefore).toBeDefined();
    expect(presenter.calledWithData[0].initiatedAt).toBeDefined();

    expect(presenter.calledWithData[0].valid).toBe(true);
  });
});
