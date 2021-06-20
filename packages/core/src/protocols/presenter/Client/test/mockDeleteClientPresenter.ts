import { DeleteClientPresenter } from "../DeleteClientPresenter";

export class DeleteClientPresenterSpy implements DeleteClientPresenter {
  calledWithData: boolean;

  async present(deleted: boolean) {
    this.calledWithData = deleted;
  }
}
