import { Presenter } from "../Presenter";

export interface UpdateClientPresenter extends Presenter {
  present(data: UpdateClientResponse): Promise<void>;
}

export interface UpdateClientResponse {
  id: string;
  name: string;
}
