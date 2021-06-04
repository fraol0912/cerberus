export interface ListClientPresenter {
  present(clients: Client[]): void;
}

interface Client {
  name: string;
}
