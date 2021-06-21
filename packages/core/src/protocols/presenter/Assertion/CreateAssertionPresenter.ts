import { Presenter } from "../Presenter";

export interface CreateAssertionPresenter extends Presenter {
  present(data: CreateAssertionResponse): Promise<void>;
}

export interface CreateAssertionResponse {
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
