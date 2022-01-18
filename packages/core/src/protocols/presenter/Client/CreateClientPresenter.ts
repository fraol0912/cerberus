import { Presenter } from "../Presenter";
export interface CreateClientPresenter extends Presenter {
  present(data: CreateClientResponse): Promise<void>;
}

export interface CreateClientResponse {
  id: string;
  name: string;
}
