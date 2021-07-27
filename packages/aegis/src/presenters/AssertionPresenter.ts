import {
  CreateAssertionResponse,
  CreateAssertionPresenter,
} from "@cerberus/core";
import { ClientModel } from "./ClientPresenter";

interface AssertionModel {
  id: string;
  name: string;
  issuer: string;
  audience: string;
  subject: ClientModel;

  expiresAt: number;
  notBefore: number;
  initiatedAt: number;

  token: string;
  valid: boolean;
}

export class AegisCreateAssertionPresenter implements CreateAssertionPresenter {
  private data: {
    success: true;
    data: AssertionModel;
  };

  async present(data: CreateAssertionResponse) {
    this.data = {
      success: true,
      data: {
        id: data.id,
        name: data.name,
        issuer: data.issuer,
        audience: data.audience,
        subject: {
          id: data.subject.id,
          name: data.subject.name,
        },

        // time
        expiresAt: data.expiresAt.getTime(),
        notBefore: data.notBefore.getTime(),
        initiatedAt: data.initiatedAt.getTime(),

        token: data.token,
        valid: data.valid,
      },
    };
  }

  getData() {
    return this.data;
  }
}
