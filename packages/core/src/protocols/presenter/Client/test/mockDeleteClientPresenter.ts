import { DeleteClientPresenter } from "../DeleteClientPresenter";

export class DeleteClientPresenterSpy implements DeleteClientPresenter {
  calledWithData: boolean;

  present(deleted: boolean) {
    this.calledWithData = deleted;
  }
}
