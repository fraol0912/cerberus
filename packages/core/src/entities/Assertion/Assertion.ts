import {
  NotBeforeDateError,
  ExpirationDateError,
} from "@cerberus/core/protocols/errors";

export class Assertion {
  private id: string;
  private issuer: string;
  private audience: string;
  private subscriber: string;

  private expiresAt: Date;
  private notBefore: Date;
  private initiatedAt: Date;

  constructor(config: AssertionConfig) {
    this.id = config.id;
    this.issuer = config.issuer;
    this.audience = config.audience;
    this.expiresAt = config.expiresAt;
    this.notBefore = config.notBefore;
    this.subscriber = config.subscriber;
    this.initiatedAt = config.initiatedAt;

    if (this.initiatedAt.getTime() > this.expiresAt.getTime()) {
      throw new ExpirationDateError(
        "Expiration date should be after initiation date."
      );
    }

    if (this.initiatedAt.getTime() > this.notBefore.getTime()) {
      throw new NotBeforeDateError(
        "Not before date should be after initiation date."
      );
    }

    if (this.notBefore.getTime() > this.expiresAt.getTime()) {
      throw new NotBeforeDateError(
        "Not before date should be before expiration date."
      );
    }
  }

  getId() {
    return this.id;
  }

  getIssuer() {
    return this.issuer;
  }

  getAudience() {
    return this.audience;
  }

  getSubscriber() {
    return this.subscriber;
  }

  getInitializedAt() {
    return this.initiatedAt;
  }

  getExpiresAt() {
    return this.expiresAt;
  }

  getNotBefore() {
    return this.notBefore;
  }

  hasExpired() {
    const exp = this.expiresAt.getTime();
    const now = Date.now();

    return now > exp;
  }

  isAfterNotBeforeDate() {
    const nbf = this.notBefore.getTime();
    const now = Date.now();

    return now > nbf;
  }

  isValid() {
    return !(this.hasExpired() && this.isAfterNotBeforeDate());
  }
}

interface AssertionConfig {
  id: string;
  issuer: string;
  subscriber: string;
  audience: string;

  expiresAt: Date;
  notBefore: Date;
  initiatedAt: Date;
}
