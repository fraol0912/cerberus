import { Presenter } from "../Presenter";

export interface RevokeAssertionPresenter extends Presenter {
  present(revoked: boolean): Promise<void>;
}
