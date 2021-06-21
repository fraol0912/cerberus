import {
  AuthorizerSpy,
  AcceptingAuthorizer,
  RejectingAuthorizer,
} from "@cerberus/core/protocols/authorizer/test";
import {
  AddAssertionGatewaySpy,
  AssertionDetailsGatewaySpy,
} from "@cerberus/core/protocols/data-access/Assertion/test";
import { CreateAssertionUseCase } from "./CreateAssertionUseCase";
import { UnauthorizedError } from "@cerberus/core/protocols/errors";
import { TokenEncrypterSpy } from "@cerberus/core/protocols/cryptology/test";
import { GetClientGatewaySpy } from "@cerberus/core/protocols/data-access/Client/test";
import { CreateAssertionPresenterSpy } from "@cerberus/core/protocols/presenter/Assertion/test";

describe("Create Assertion Use Case", () => {
  it("throws an error if the authorizer rejects", async () => {
    const encrypter = new TokenEncrypterSpy();
    const getClient = new GetClientGatewaySpy();
    const authorizer = new RejectingAuthorizer();
    const addAssertion = new AddAssertionGatewaySpy();
    const presenter = new CreateAssertionPresenterSpy();
    const assertionDetails = new AssertionDetailsGatewaySpy();
    let error: Error = new Error();

    const usecase = new CreateAssertionUseCase({
      encrypter,
      presenter,
      getClient,
      authorizer,
      addAssertion,
      assertionDetails,
    });

    try {
      await usecase.execute({
        name: "x",
        subject: "x",
        expiresAt: new Date(),
        notBefore: new Date(),
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
    const addAssertion = new AddAssertionGatewaySpy();
    const presenter = new CreateAssertionPresenterSpy();
    const assertionDetails = new AssertionDetailsGatewaySpy();

    const usecase = new CreateAssertionUseCase({
      presenter,
      getClient,
      encrypter,
      authorizer,
      addAssertion,
      assertionDetails,
    });

    try {
      await usecase.execute({
        name: "x",
        subject: "x",
        expiresAt: new Date(),
        notBefore: new Date(),
        encodedAdminPassword: "encoded_password",
      });
    } catch {}

    expect(authorizer.calledWithPassword).toBe("encoded_password");
  });

  it("calls get client with the right argument", async () => {
    const encrypter = new TokenEncrypterSpy();
    const getClient = new GetClientGatewaySpy();
    const authorizer = new AcceptingAuthorizer();
    const addAssertion = new AddAssertionGatewaySpy();
    const presenter = new CreateAssertionPresenterSpy();
    const assertionDetails = new AssertionDetailsGatewaySpy();

    const usecase = new CreateAssertionUseCase({
      presenter,
      encrypter,
      getClient,
      authorizer,
      addAssertion,
      assertionDetails,
    });

    try {
      await usecase.execute({
        name: "x",
        subject: "client-id",
        expiresAt: new Date(),
        notBefore: new Date(),
        encodedAdminPassword: "encoded_password",
      });
    } catch {}

    expect(getClient.calledWithId).toBe("client-id");
  });

  it("calls assertion details with the right argument", async () => {
    const encrypter = new TokenEncrypterSpy();
    const getClient = new GetClientGatewaySpy();
    const authorizer = new AcceptingAuthorizer();
    const addAssertion = new AddAssertionGatewaySpy();
    const presenter = new CreateAssertionPresenterSpy();
    const assertionDetails = new AssertionDetailsGatewaySpy();

    const usecase = new CreateAssertionUseCase({
      presenter,
      encrypter,
      getClient,
      authorizer,
      addAssertion,
      assertionDetails,
    });

    try {
      await usecase.execute({
        name: "x",
        subject: "x",
        expiresAt: new Date(),
        notBefore: new Date(),
        encodedAdminPassword: "encoded_password",
      });
    } catch {}

    expect(assertionDetails.calledLoadIssuerName).toBe(true);
    expect(assertionDetails.calledLoadAudienceField).toBe(true);
  });

  it("calls add assertion with the right argument", async () => {
    const encrypter = new TokenEncrypterSpy();
    const getClient = new GetClientGatewaySpy();
    const authorizer = new AcceptingAuthorizer();
    const addAssertion = new AddAssertionGatewaySpy();
    const presenter = new CreateAssertionPresenterSpy();
    const assertionDetails = new AssertionDetailsGatewaySpy();

    const usecase = new CreateAssertionUseCase({
      presenter,
      encrypter,
      getClient,
      authorizer,
      addAssertion,
      assertionDetails,
    });

    try {
      await usecase.execute({
        name: "assertion",
        subject: "subject",
        expiresAt: new Date(),
        notBefore: new Date(),
        encodedAdminPassword: "encoded_password",
      });
    } catch {}

    expect(addAssertion.calledWithAssertionParams.issuer).toBe("issuer");
    expect(addAssertion.calledWithAssertionParams.name).toBe("assertion");
    expect(addAssertion.calledWithAssertionParams.subject).toBe("subject");
    expect(addAssertion.calledWithAssertionParams.audience).toBe("audience");

    expect(addAssertion.calledWithAssertionParams.expiresAt).toBeDefined();
    expect(addAssertion.calledWithAssertionParams.notBefore).toBeDefined();
    expect(addAssertion.calledWithAssertionParams.initiatedAt).toBeDefined();
  });

  it("calls encrypter with the right arguments", async () => {
    const encrypter = new TokenEncrypterSpy();
    const getClient = new GetClientGatewaySpy();
    const authorizer = new AcceptingAuthorizer();
    const addAssertion = new AddAssertionGatewaySpy();
    const presenter = new CreateAssertionPresenterSpy();
    const assertionDetails = new AssertionDetailsGatewaySpy();

    const usecase = new CreateAssertionUseCase({
      presenter,
      encrypter,
      getClient,
      authorizer,
      addAssertion,
      assertionDetails,
    });

    try {
      await usecase.execute({
        name: "x",
        subject: "x",
        expiresAt: new Date(),
        notBefore: new Date(),
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
    const addAssertion = new AddAssertionGatewaySpy();
    const presenter = new CreateAssertionPresenterSpy();
    const assertionDetails = new AssertionDetailsGatewaySpy();

    const usecase = new CreateAssertionUseCase({
      presenter,
      encrypter,
      getClient,
      authorizer,
      addAssertion,
      assertionDetails,
    });

    try {
      await usecase.execute({
        name: "x",
        subject: "x",
        expiresAt: new Date(),
        notBefore: new Date(),
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
  });
});
