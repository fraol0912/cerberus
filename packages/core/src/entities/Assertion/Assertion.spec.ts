import {
  NotBeforeDateError,
  ExpirationDateError,
} from "@cerberus/core/protocols/errors";
import { makeAssertion, makeInvalidAssertion } from "./test";

describe("Assertion", () => {
  it("doesn't create an assertion with an expiry date in the past", () => {
    expect(() =>
      makeAssertion({
        expiresAt: new Date(Date.now() - 2000),
      })
    ).toThrowError(ExpirationDateError);
  });

  it("doesn't create an assertion with a not before date in the past", () => {
    expect(() =>
      makeAssertion({
        notBefore: new Date(Date.now() - 1000),
      })
    ).toThrowError(NotBeforeDateError);
  });

  it("doesn't create an assertion with a not before date greater than expiry date", () => {
    expect(() =>
      makeAssertion({
        notBefore: new Date(Date.now() + 2000),
        expiresAt: new Date(Date.now() + 1000),
      })
    ).toThrowError(NotBeforeDateError);
  });

  it("determines if the assertion has expired.", () => {
    const expiredAssertion = makeInvalidAssertion();
    const notExpiredAssertion = makeAssertion();

    expect(expiredAssertion.hasExpired()).toBe(true);
    expect(notExpiredAssertion.hasExpired()).toBe(false);
  });

  it("determines if the assertion is being used after not before date", () => {
    const notBeforeDateAfterNowAssertion = makeInvalidAssertion();

    const notBeforeDateBeforeNowAssertion = makeAssertion();

    expect(notBeforeDateAfterNowAssertion.isAfterNotBeforeDate()).toBe(true);
    expect(notBeforeDateBeforeNowAssertion.isAfterNotBeforeDate()).toBe(false);
  });

  it("determines if an assertion is valid", () => {
    const validAssertion = makeAssertion();
    const invalidAssertion = makeInvalidAssertion();

    expect(validAssertion.isValid()).toBe(true);
    expect(invalidAssertion.isValid()).toBe(false);
  });

  it("has getters", () => {
    const assertion = makeAssertion();
    expect(assertion.getId()).toBe("id");
    expect(assertion.getIssuer()).toBe("issuer");
    expect(assertion.getAudience()).toBe("audience");
    expect(assertion.getName()).toBe("assertion_name");
    expect(assertion.getSubscriber()).toBe("subscriber");
    expect(assertion.getExpiresAt()).toBeInstanceOf(Date);
    expect(assertion.getNotBefore()).toBeInstanceOf(Date);
    expect(assertion.getInitializedAt()).toBeInstanceOf(Date);
  });

  it("sets options", () => {
    const assertion = makeAssertion({
      id: "assertion-id",
      name: "assertion-name",
      issuer: "assertion-issuer",
      audience: "assertion-audience",
      subscriber: "assertion-subscriber",
    });
    expect(assertion.getId()).toBe("assertion-id");
    expect(assertion.getName()).toBe("assertion-name");
    expect(assertion.getIssuer()).toBe("assertion-issuer");
    expect(assertion.getAudience()).toBe("assertion-audience");
    expect(assertion.getSubscriber()).toBe("assertion-subscriber");
  });
});
