import { Assertion } from "../Assertion";

export function makeAssertion(opt?: {
  id?: string;
  name?: string;
  issuer?: string;
  subject?: string;
  audience?: string;

  expiresAt?: Date;
  notBefore?: Date;
  initiatedAt?: Date;
}) {
  return new Assertion({
    id: opt?.id ? opt.id : "id",
    issuer: opt?.issuer ? opt.issuer : "issuer",
    name: opt?.name ? opt.name : "assertion_name",
    subject: opt?.subject ? opt.subject : "subject",
    audience: opt?.audience ? opt.audience : "audience",

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
