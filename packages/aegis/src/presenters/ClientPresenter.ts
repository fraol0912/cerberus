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

interface ClientModel {
  id: string;
  name: string;
}

export class SocketGetClientPresenter implements GetClientPresenter {
  private data: {
    success: true;
    data: ClientModel;
  };

  present(data: GetClientResponse) {
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

export class SocketListClientPresenter implements ListClientPresenter {
  data: {
    success: true;
    data: {
      clients: {
        id: string;
        name: string;
      }[];
    };
  };

  present(clients: ClientResponse[]) {
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

export class SocketUpdateClientPresenter implements UpdateClientPresenter {
  data: {
    success: true;
    data: ClientModel;
  };

  present(data: UpdateClientResponse) {
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

export class SocketDeleteClientPresenter implements DeleteClientPresenter {
  data: {
    success: true;
    data: {
      deleted: boolean;
    };
  };

  present(deleted: boolean) {
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

export class SocketCreateClientPresenter implements CreateClientPresenter {
  private data: {
    success: true;
    data: ClientModel;
  };

  present(data: CreateClientResponse) {
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
