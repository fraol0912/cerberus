export interface ListClientPresenter {
  present(clients: ClientResponse[]): void;
}

export interface ClientResponse {
  name: string;
}
