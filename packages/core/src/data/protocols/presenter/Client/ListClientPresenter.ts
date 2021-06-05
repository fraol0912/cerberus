export interface ListClientPresenter {
  present(clients: Client[]): void;
}

export interface Client {
  name: string;
}
