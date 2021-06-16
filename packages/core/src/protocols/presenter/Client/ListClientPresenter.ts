export interface ListClientPresenter {
  present(clients: ClientResponse[]): void;
}

export interface ClientResponse {
  id: string;
  name: string;
}
