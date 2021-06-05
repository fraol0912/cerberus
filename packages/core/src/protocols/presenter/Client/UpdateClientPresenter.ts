export interface UpdateClientPresenter {
  present(data: UpdateClientResponse): void;
}

export interface UpdateClientResponse {
  id: string;
  name: string;
}
