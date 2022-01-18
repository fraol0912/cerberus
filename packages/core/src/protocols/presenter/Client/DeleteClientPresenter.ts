import { Presenter } from "../Presenter";

export interface DeleteClientPresenter extends Presenter {
  present(deleted: boolean): Promise<void>;
}
