import {
  NotBeforeDateError,
  ExpirationDateError,
} from "@cerberus/core/protocols/errors";

export class Assertion {
  private id: string;
  private name: string;
  private issuer: string;
  private subject: string;
  private audience: string;

  private expiresAt: Date;
  private notBefore: Date;
  private initiatedAt: Date;

  constructor(config: AssertionConfig) {
    this.id = config.id;
    this.name = config.name;
    this.issuer = config.issuer;
    this.subject = config.subject;
    this.audience = config.audience;
    this.expiresAt = config.expiresAt;
    this.notBefore = config.notBefore;
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

  getName() {
    return this.name;
  }

  getIssuer() {
    return this.issuer;
  }

  getSubject() {
    return this.subject;
  }

  getAudience() {
    return this.audience;
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
  name: string;
  issuer: string;
  subject: string;
  audience: string;

  expiresAt: Date;
  notBefore: Date;
  initiatedAt: Date;
}
