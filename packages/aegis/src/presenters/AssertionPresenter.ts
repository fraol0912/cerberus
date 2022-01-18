import {
  AssertionResponse,
  GetAssertionResponse,
  GetAssertionPresenter,
  ListAssertionPresenter,
  CreateAssertionResponse,
  RevokeAssertionPresenter,
  CreateAssertionPresenter,
  IntrospectAssertionResponse,
  IntrospectAssertionPresenter,
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

export class AegisGetAssertionPresenter implements GetAssertionPresenter {
  private data: {
    success: true;
    data: AssertionModel;
  };

  async present(data: GetAssertionResponse) {
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

export class AegisListAssertionPresenter implements ListAssertionPresenter {
  private data: {
    success: true;
    data: {
      assertions: Omit<AssertionModel, "token">[];
    };
  };

  async present(assertions: AssertionResponse[]) {
    this.data = {
      success: true,
      data: {
        assertions: assertions.map((assertion) => {
          return {
            id: assertion.id,
            name: assertion.name,
            issuer: assertion.issuer,
            subject: assertion.subject,
            audience: assertion.audience,
            expiresAt: assertion.expiresAt.getTime(),
            notBefore: assertion.notBefore.getTime(),
            initiatedAt: assertion.initiatedAt.getTime(),
            valid: assertion.valid,
          };
        }),
      },
    };
  }

  getData() {
    return this.data;
  }
}

export class AegisIntrospectAssertionPresenter
  implements IntrospectAssertionPresenter
{
  private data: {
    success: true;
    data: {
      active: boolean;
    };
  };

  async present(data: IntrospectAssertionResponse) {
    this.data = {
      success: true,
      data: {
        active: data.valid,
      },
    };
  }

  getData() {
    return this.data;
  }
}

export class AegisRevokeAssertionPresenter implements RevokeAssertionPresenter {
  private data: {
    success: true;
    data: {
      revoked: boolean;
    };
  };

  async present(revoked: boolean) {
    this.data = {
      success: true,
      data: {
        revoked,
      },
    };
  }

  getData() {
    return this.data;
  }
}
