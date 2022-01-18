import {
  ClientResponse,
  GetClientResponse,
  GetClientPresenter,
  ListClientPresenter,
  UpdateClientResponse,
  CreateClientResponse,
  DeleteClientPresenter,
  UpdateClientPresenter,
  CreateClientPresenter,
} from "@cerberus/core";

export interface ClientModel {
  id: string;
  name: string;
}

export class AegisGetClientPresenter implements GetClientPresenter {
  private data: {
    success: true;
    data: ClientModel;
  };

  async present(data: GetClientResponse) {
    this.data = {
      success: true,
      data: {
        id: data.id,
        name: data.name,
      },
    };
  }

  getData() {
    return this.data;
  }
}

export class AegisListClientPresenter implements ListClientPresenter {
  data: {
    success: true;
    data: {
      clients: {
        id: string;
        name: string;
      }[];
    };
  };

  async present(clients: ClientResponse[]) {
    this.data = {
      success: true,
      data: {
        clients,
      },
    };
  }

  getData() {
    return this.data;
  }
}

export class AegisUpdateClientPresenter implements UpdateClientPresenter {
  data: {
    success: true;
    data: ClientModel;
  };

  async present(data: UpdateClientResponse) {
    this.data = {
      success: true,
      data: {
        id: data.id,
        name: data.name,
      },
    };
  }

  getData() {
    return this.data;
  }
}

export class AegisDeleteClientPresenter implements DeleteClientPresenter {
  data: {
    success: true;
    data: {
      deleted: boolean;
    };
  };

  async present(deleted: boolean) {
    this.data = {
      success: true,
      data: {
        deleted,
      },
    };
  }

  getData() {
    return this.data;
  }
}

export class AegisCreateClientPresenter implements CreateClientPresenter {
  private data: {
    success: true;
    data: ClientModel;
  };

  async present(data: CreateClientResponse) {
    this.data = {
      success: true,
      data: {
        id: data.id,
        name: data.name,
      },
    };
  }

  getData() {
    return this.data;
  }
}
