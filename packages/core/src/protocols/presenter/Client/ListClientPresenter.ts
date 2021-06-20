import { Presenter } from "../Presenter";

export interface ListClientPresenter extends Presenter {
  present(clients: ClientResponse[]): Promise<void>;
}

export interface ClientResponse {
  id: string;
  name: string;
}
