import {
  AuthorizerSpy,
  AcceptingAuthorizer,
  RejectingAuthorizer,
} from "@cerberus/core/protocols/authorizer/test";
import { GetAssertionUseCase } from "./GetAssertionUseCase";
import { UnauthorizedError } from "@cerberus/core/protocols/errors";
import { TokenEncrypterSpy } from "@cerberus/core/protocols/cryptology/test";
import { GetClientGatewaySpy } from "@cerberus/core/protocols/data-access/Client/test";
import { GetAssertionPresenterSpy } from "@cerberus/core/protocols/presenter/Assertion/test";
import { GetAssertionGatewaySpy } from "@cerberus/core/protocols/data-access/Assertion/test";

describe("Get Assertion Use Case", () => {
  it("throws an error if the authorizer rejects", async () => {
    const encrypter = new TokenEncrypterSpy();
    const getClient = new GetClientGatewaySpy();
    const authorizer = new RejectingAuthorizer();
    const presenter = new GetAssertionPresenterSpy();
    const getAssertion = new GetAssertionGatewaySpy();
    let error: Error = new Error();

    const usecase = new GetAssertionUseCase({
      encrypter,
      presenter,
      getClient,
      authorizer,
      getAssertion,
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

  it("calls authorizer with the right argument", async () => {
    const authorizer = new AuthorizerSpy();
    const encrypter = new TokenEncrypterSpy();
    const getClient = new GetClientGatewaySpy();
    const presenter = new GetAssertionPresenterSpy();
    const getAssertion = new GetAssertionGatewaySpy();

    const usecase = new GetAssertionUseCase({
      encrypter,
      presenter,
      getClient,
      authorizer,
      getAssertion,
    });

    try {
      await usecase.execute({
        id: "id",
        encodedAdminPassword: "encoded_password",
      });
    } catch {}

    expect(authorizer.calledWithPassword).toBe("encoded_password");
  });

  it("calls get client with the right argument", async () => {
    const encrypter = new TokenEncrypterSpy();
    const getClient = new GetClientGatewaySpy();
    const authorizer = new AcceptingAuthorizer();
    const presenter = new GetAssertionPresenterSpy();
    const getAssertion = new GetAssertionGatewaySpy();

    const usecase = new GetAssertionUseCase({
      encrypter,
      presenter,
      getClient,
      authorizer,
      getAssertion,
    });

    try {
      await usecase.execute({
        id: "assertion_id",
        encodedAdminPassword: "encoded_password",
      });
    } catch {}

    expect(getClient.calledWithId).toBe("subject");
  });

  it("calls get assertion with the right argument", async () => {
    const encrypter = new TokenEncrypterSpy();
    const getClient = new GetClientGatewaySpy();
    const authorizer = new AcceptingAuthorizer();
    const presenter = new GetAssertionPresenterSpy();
    const getAssertion = new GetAssertionGatewaySpy();

    const usecase = new GetAssertionUseCase({
      encrypter,
      presenter,
      getClient,
      authorizer,
      getAssertion,
    });

    try {
      await usecase.execute({
        id: "assertion_id",
        encodedAdminPassword: "encoded_password",
      });
    } catch {}

    expect(getAssertion.calledWithId).toBe("assertion_id");
  });

  it("calls encrypter with the right arguments", async () => {
    const encrypter = new TokenEncrypterSpy();
    const getClient = new GetClientGatewaySpy();
    const authorizer = new AcceptingAuthorizer();
    const presenter = new GetAssertionPresenterSpy();
    const getAssertion = new GetAssertionGatewaySpy();

    const usecase = new GetAssertionUseCase({
      encrypter,
      presenter,
      getClient,
      authorizer,
      getAssertion,
    });

    try {
      await usecase.execute({
        id: "assertion_id",
        encodedAdminPassword: "encoded_password",
      });
    } catch {}

    expect(encrypter.calledWithPayload.jti).toBeDefined();
    expect(encrypter.calledWithPayload.iss).toBeDefined();
    expect(encrypter.calledWithPayload.sub).toBeDefined();
    expect(encrypter.calledWithPayload.aud).toBeDefined();

    expect(encrypter.calledWithPayload.exp).toBeDefined();
    expect(encrypter.calledWithPayload.nbf).toBeDefined();
    expect(encrypter.calledWithPayload.iat).toBeDefined();
  });

  it("calls the presenter with the right arguments", async () => {
    const encrypter = new TokenEncrypterSpy();
    const getClient = new GetClientGatewaySpy();
    const authorizer = new AcceptingAuthorizer();
    const presenter = new GetAssertionPresenterSpy();
    const getAssertion = new GetAssertionGatewaySpy();

    const usecase = new GetAssertionUseCase({
      encrypter,
      presenter,
      getClient,
      authorizer,
      getAssertion,
    });

    try {
      await usecase.execute({
        id: "assertion_id",
        encodedAdminPassword: "encoded_password",
      });
    } catch {}

    expect(presenter.calledWithData.id).toBeDefined();
    expect(presenter.calledWithData.name).toBeDefined();
    expect(presenter.calledWithData.issuer).toBeDefined();
    expect(presenter.calledWithData.audience).toBeDefined();

    expect(presenter.calledWithData.expiresAt).toBeDefined();
    expect(presenter.calledWithData.notBefore).toBeDefined();
    expect(presenter.calledWithData.initiatedAt).toBeDefined();

    expect(presenter.calledWithData.subject.id).toBeDefined();
    expect(presenter.calledWithData.subject.id).toBeDefined();

    expect(presenter.calledWithData.token).toBeDefined();

    expect(presenter.calledWithData.valid).toBe(true);
  });
});
