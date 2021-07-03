import {
  GetAssertionGatewaySpy,
  AssertionDetailsGatewaySpy,
} from "@cerberus/core/protocols/data-access/Assertion/test";
import { IntrospectAssertionUseCase } from "./IntrospectAssertionUseCase";
import { TokenDecrypterSpy } from "@cerberus/core/protocols/cryptology/test";
import { GetClientGatewaySpy } from "@cerberus/core/protocols/data-access/Client/test";
import { IntrospectAssertionPresenterSpy } from "@cerberus/core/protocols/presenter/Assertion/test";

describe("Introspect Assertion UseCase", () => {
  it("calls decrypter with the right parameters", async () => {
    const decrypter = new TokenDecrypterSpy();
    const getClient = new GetClientGatewaySpy();
    const getAssertion = new GetAssertionGatewaySpy();
    const presenter = new IntrospectAssertionPresenterSpy();
    const assertionDetails = new AssertionDetailsGatewaySpy();

    const usecase = new IntrospectAssertionUseCase({
      decrypter,
      getClient,
      presenter,
      getAssertion,
      assertionDetails,
    });

    await usecase.execute({
      token: "token",
    });

    expect(decrypter.calledWithData).toBe("token");
  });

  it("returns invalid if the decrypter throws", async () => {
    const decrypter = new TokenDecrypterSpy();
    const getClient = new GetClientGatewaySpy();
    const getAssertion = new GetAssertionGatewaySpy();
    const presenter = new IntrospectAssertionPresenterSpy();
    const assertionDetails = new AssertionDetailsGatewaySpy();

    decrypter.throw = true;

    const usecase = new IntrospectAssertionUseCase({
      decrypter,
      getClient,
      presenter,
      getAssertion,
      assertionDetails,
    });

    await usecase.execute({
      token: "token",
    });

    expect(presenter.calledWithData.valid).toBe(false);
  });

  it("calls get client with the right parameters", async () => {
    const decrypter = new TokenDecrypterSpy();
    const getClient = new GetClientGatewaySpy();
    const getAssertion = new GetAssertionGatewaySpy();
    const presenter = new IntrospectAssertionPresenterSpy();
    const assertionDetails = new AssertionDetailsGatewaySpy();

    const usecase = new IntrospectAssertionUseCase({
      decrypter,
      getClient,
      presenter,
      getAssertion,
      assertionDetails,
    });

    await usecase.execute({
      token: "token",
    });

    expect(getClient.calledWithId).toBe("subject");
  });

  it("returns invalid if get client throws", async () => {
    const decrypter = new TokenDecrypterSpy();
    const getClient = new GetClientGatewaySpy();
    const getAssertion = new GetAssertionGatewaySpy();
    const presenter = new IntrospectAssertionPresenterSpy();
    const assertionDetails = new AssertionDetailsGatewaySpy();

    getClient.throw = true;

    const usecase = new IntrospectAssertionUseCase({
      decrypter,
      getClient,
      presenter,
      getAssertion,
      assertionDetails,
    });

    await usecase.execute({
      token: "token",
    });

    expect(presenter.calledWithData.valid).toBe(false);
  });

  it("calls assertion details gateway", async () => {
    const decrypter = new TokenDecrypterSpy();
    const getClient = new GetClientGatewaySpy();
    const getAssertion = new GetAssertionGatewaySpy();
    const presenter = new IntrospectAssertionPresenterSpy();
    const assertionDetails = new AssertionDetailsGatewaySpy();

    const usecase = new IntrospectAssertionUseCase({
      decrypter,
      getClient,
      presenter,
      getAssertion,
      assertionDetails,
    });

    await usecase.execute({
      token: "token",
    });

    expect(assertionDetails.calledLoadIssuerName).toBe(true);
    expect(assertionDetails.calledLoadAudienceField).toBe(true);
  });

  it("returns invalid if the issuers don't match", async () => {
    const decrypter = new TokenDecrypterSpy();
    const getClient = new GetClientGatewaySpy();
    const getAssertion = new GetAssertionGatewaySpy();
    const presenter = new IntrospectAssertionPresenterSpy();
    const assertionDetails = new AssertionDetailsGatewaySpy();

    assertionDetails.issuerName = "invalid issuer";

    const usecase = new IntrospectAssertionUseCase({
      decrypter,
      getClient,
      presenter,
      getAssertion,
      assertionDetails,
    });

    await usecase.execute({
      token: "token",
    });

    expect(presenter.calledWithData.valid).toBe(false);
  });

  it("returns invalid if the audience don't match", async () => {
    const decrypter = new TokenDecrypterSpy();
    const getClient = new GetClientGatewaySpy();
    const getAssertion = new GetAssertionGatewaySpy();
    const presenter = new IntrospectAssertionPresenterSpy();
    const assertionDetails = new AssertionDetailsGatewaySpy();

    assertionDetails.audienceField = "invalid audience";

    const usecase = new IntrospectAssertionUseCase({
      decrypter,
      getClient,
      presenter,
      getAssertion,
      assertionDetails,
    });

    await usecase.execute({
      token: "token",
    });

    expect(presenter.calledWithData.valid).toBe(false);
  });

  it("calls get assertion gateway with the right parameters", async () => {
    const decrypter = new TokenDecrypterSpy();
    const getClient = new GetClientGatewaySpy();
    const getAssertion = new GetAssertionGatewaySpy();
    const presenter = new IntrospectAssertionPresenterSpy();
    const assertionDetails = new AssertionDetailsGatewaySpy();

    const usecase = new IntrospectAssertionUseCase({
      decrypter,
      getClient,
      presenter,
      getAssertion,
      assertionDetails,
    });

    await usecase.execute({
      token: "token",
    });

    expect(getAssertion.calledWithId).toBe("id");
  });

  it("returns invalid if get assertion throws", async () => {
    const decrypter = new TokenDecrypterSpy();
    const getClient = new GetClientGatewaySpy();
    const getAssertion = new GetAssertionGatewaySpy();
    const presenter = new IntrospectAssertionPresenterSpy();
    const assertionDetails = new AssertionDetailsGatewaySpy();

    getAssertion.throw = true;

    const usecase = new IntrospectAssertionUseCase({
      decrypter,
      getClient,
      presenter,
      getAssertion,
      assertionDetails,
    });

    await usecase.execute({
      token: "token",
    });

    expect(presenter.calledWithData.valid).toBe(false);
  });
});
