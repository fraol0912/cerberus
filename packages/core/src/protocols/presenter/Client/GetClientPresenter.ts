import { Presenter } from "../Presenter";

export interface GetClientPresenter extends Presenter {
  present(data: GetClientResponse): Promise<void>;
}

export interface GetClientResponse {
  id: string;
  name: string;
}
