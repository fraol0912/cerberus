import { RevokeAssertionPresenter } from "../RevokeAssertionPresenter";

export class RevokeAssertionPresenterSpy implements RevokeAssertionPresenter {
  calledWithData: boolean;

  async present(revoked: boolean) {
    this.calledWithData = revoked;
  }
}
