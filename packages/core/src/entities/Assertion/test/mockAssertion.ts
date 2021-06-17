import { Assertion } from "../Assertion";

export function makeAssertion(opt?: {
  id?: string;
  issuer?: string;
  audience?: string;
  subscriber?: string;

  expiresAt?: Date;
  notBefore?: Date;
  initiatedAt?: Date;
}) {
  return new Assertion({
    id: opt?.id ? opt.id : "id",
    issuer: opt?.issuer ? opt.issuer : "issuer",
    audience: opt?.audience ? opt.audience : "audience",
    subscriber: opt?.subscriber ? opt.subscriber : "subscriber",

    initiatedAt: opt?.initiatedAt ? opt.initiatedAt : new Date(),
    notBefore: opt?.notBefore ? opt.notBefore : new Date(Date.now() + 1000),
    expiresAt: opt?.expiresAt ? opt.expiresAt : new Date(Date.now() + 2000),
  });
}

export function makeInvalidAssertion() {
  return makeAssertion({
    expiresAt: new Date(Date.now() - 500),
    notBefore: new Date(Date.now() - 1000),
    initiatedAt: new Date(Date.now() - 2000),
  });
}
