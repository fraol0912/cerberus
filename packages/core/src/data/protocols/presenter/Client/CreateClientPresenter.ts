export interface CreateClientPresenter {
  present(data: CreateClientResponse): void;
}

export interface CreateClientResponse {
  id: string;
  name: string;
}
