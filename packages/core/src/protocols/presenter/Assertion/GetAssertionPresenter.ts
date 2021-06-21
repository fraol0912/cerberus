import { Presenter } from "../Presenter";

export interface GetAssertionPresenter extends Presenter {
  present(data: GetAssertionResponse): Promise<void>;
}

export interface GetAssertionResponse {
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

  token: string;

  valid: boolean;
}
