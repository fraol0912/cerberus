import { Presenter } from "../Presenter";

export interface ListAssertionPresenter extends Presenter {
  present(assertions: AssertionResponse[]): Promise<void>;
}

export interface AssertionResponse {
  id: string;
  name: string;
  issuer: string;
  audience: string;

  subject: {
    id: string;
    name: string;
  };

  notBefore: Date;
  expiresAt: Date;
  initiatedAt: Date;

  valid: boolean;
}
