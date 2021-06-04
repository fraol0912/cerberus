export interface GetClientPresenter {
  present(data: GetClientResponse): void;
}

export interface GetClientResponse {
  id: string;
  name: string;
}
